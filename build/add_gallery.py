#!/usr/bin/env python3
"""
add_gallery.py — adiciona/atualiza a galeria de UM empreendimento nos HTML estáticos
do site A10 (index.html = catálogo e apresentacao.html = deck).

Arquitetura do site (arquivo único, imagens embutidas em base64):
  - const IMG = { "slug-da-foto": "data:image/jpeg;base64,...." , ... }
  - const DATA = [ {slug, nome, ..., fotos:[...], grupos?:[...]} , ... ]   (index.html)
  - const DATA = { "slug": {..., fotos:[...], grupos?:[...]} , ... }        (apresentacao.html)
  O campo `fotos` de cada empreendimento é a lista de slugs de foto que indexam IMG.
  A UI de galeria já existe nos dois HTML e renderiza `fotos` automaticamente
  (index.html: aba "Galeria" no detalhe; apresentacao.html: botão "Galeria de fotos").
  Se o empreendimento tiver o campo `grupos` (ex.: Pátio = Casa Mar / Casa Brisa),
  a galeria é renderizada agrupada e rotulada.

Uso:
  python add_gallery.py <html> <slug> <pasta_stage> <prefixo>
    <html>        caminho do index.html OU apresentacao.html
    <slug>        slug do empreendimento no DATA (ex.: holmes, cape-town)
    <pasta_stage> pasta com as fotos JÁ otimizadas para web, nomeadas <prefixo>-1.jpg, -2.jpg...
    <prefixo>     normalmente igual ao slug (as fotos viram slugs <prefixo>-N)

  Rode uma vez para cada HTML. Requer: Python 3 + Pillow (só p/ otimizar antes) e Node.js.
  Otimize as fotos antes com optimize_photos.py.
"""
import io, os, sys, re, base64, json, subprocess, glob

htmlfile, slug, stage, prefix = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
s = io.open(htmlfile, encoding="utf-8").read()

def num(f):
    m = re.findall(r'-(\d+)\.jpg$', f); return int(m[0]) if m else 0
files = sorted([os.path.basename(p) for p in glob.glob(stage + "/" + prefix + "-*.jpg")], key=num)
newslugs = [f[:-4] for f in files]
if not newslugs:
    print("Nenhuma foto encontrada em", stage, "com prefixo", prefix); sys.exit(1)

def scanLit(str_, open_):
    o = str_[open_]; c = ']' if o == '[' else '}'; d = 0; ins = False; q = ''; i = open_
    while i < len(str_):
        ch = str_[i]
        if ins:
            if ch == '\\': i += 2; continue
            if ch == q: ins = False
        else:
            if ch in '"\'`': ins = True; q = ch
            elif ch == o: d += 1
            elif ch == c:
                d -= 1
                if d == 0: return i + 1
        i += 1
    raise Exception("literal não terminado")

im0 = s.index("const IMG={") + len("const IMG=")
imEnd = scanLit(s, im0)
existing = set(m.group(1) for m in re.finditer(r'"([A-Za-z0-9_-]+)"\s*:\s*"data:image', s[im0:imEnd]))

entries = ""; added = []
for sl in newslugs:
    if sl in existing: continue
    b64 = base64.b64encode(open(stage + "/" + sl + ".jpg", "rb").read()).decode()
    entries += json.dumps(sl) + ':"data:image/jpeg;base64,' + b64 + '",'
    added.append(sl)
marker = "const IMG={"; i = s.index(marker); ins = i + len(marker)
s = s[:ins] + entries + s[ins:]

dm = "const DATA="; di = s.index(dm); dopen = di + len(dm); dend = scanLit(s, dopen)
lit = os.path.join(os.path.dirname(os.path.abspath(htmlfile)), "_lit_" + prefix + ".js")
io.open(lit, "w", encoding="utf-8").write("const D=" + s[dopen:dend] + ";\nprocess.stdout.write(JSON.stringify(D));")
DATA = json.loads(subprocess.check_output(["node", "--max-old-space-size=4096", lit]).decode("utf-8"))
os.remove(lit)

def setf(obj):
    cover = obj.get("fotos", [])[:1] or [slug]
    obj["fotos"] = cover + [x for x in newslugs if x != cover[0]]
    return len(obj["fotos"])

n = 0
if isinstance(DATA, list):
    for d in DATA:
        if d.get("slug") == slug: n = setf(d)
else:
    if slug in DATA: n = setf(DATA[slug])
if n == 0:
    print("AVISO: slug", slug, "não encontrado no DATA de", os.path.basename(htmlfile)); sys.exit(1)
s = s[:dopen] + json.dumps(DATA, ensure_ascii=False) + s[dend:]

io.open(htmlfile, "w", encoding="utf-8").write(s)
print(os.path.basename(htmlfile), "| slug", slug, "| imgs add", len(added), "| fotos", n, "| size", round(os.path.getsize(htmlfile)/1048576, 1), "MB")
