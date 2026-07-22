#!/usr/bin/env python3
"""
optimize_photos.py — otimiza fotos brutas para web e nomeia <prefixo>-N.jpg.

Uso:
  python optimize_photos.py <pasta_entrada> <pasta_saida> <prefixo> [ordem]
    <pasta_entrada>  pasta com as fotos brutas (jpg/jpeg/png), incl. subpastas
    <pasta_saida>    onde salvar as otimizadas (stage)
    <prefixo>        prefixo/slug (ex.: holmes) -> gera holmes-1.jpg, holmes-2.jpg...
    [ordem]          opcional: lista 1-indexada separada por vírgula na ordem alfabética
                     dos arquivos, p/ curar/ordenar (ex.: "3,1,5,2"). Sem isso usa ordem
                     alfabética e inclui todas.

Saída: JPEG progressivo, qualidade 84, largura máx 1920px. Requer Pillow.
Depois use add_gallery.py para embutir no index.html e apresentacao.html.
"""
from PIL import Image, ImageOps
import sys, os, glob

inp, out, prefix = sys.argv[1], sys.argv[2], sys.argv[3]
order = [int(x) for x in sys.argv[4].split(",")] if len(sys.argv) > 4 else None
os.makedirs(out, exist_ok=True)
MAXW, Q = 1920, 84

imgs = sorted([f for f in glob.glob(os.path.join(inp, "**", "*"), recursive=True)
               if f.lower().endswith(('.jpg', '.jpeg', '.png')) and 'thumbs' not in os.path.basename(f).lower()])
if order:
    imgs = [imgs[i-1] for i in order]

for n, f in enumerate(imgs, 1):
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
    if im.width > MAXW:
        im = im.resize((MAXW, round(im.height * MAXW / im.width)), Image.LANCZOS)
    name = "%s-%d.jpg" % (prefix, n)
    im.save(os.path.join(out, name), "JPEG", quality=Q, optimize=True, progressive=True)
    print(name, os.path.getsize(os.path.join(out, name))//1024, "KB")
print("total:", len(imgs), "fotos em", out)
