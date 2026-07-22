# HANDOFF — Site A10 (galerias de fotos)

Documento para **continuar o trabalho em outra sessão/conta**. Explica o estado atual,
a arquitetura do site e o passo a passo para adicionar a galeria de cada empreendimento.

## Onde está tudo

- **Repo:** `github.com/joaogstrapa10-cell/ippouniverso` · branch **`claude/a10-website-projects-9e865u`**
- **Site pronto (estático, para publicar):** [`site_a10/netlify/`](../netlify/)
  - `index.html` — **catálogo** (grade de cards + detalhe/galeria de cada empreendimento)
  - `apresentacao.html` — **deck** cinematográfico (Apresentação)
  - `README.txt` — instruções de deploy (arraste em https://app.netlify.com/drop)
- **Fotos otimizadas (web):** [`site_a10/fotos_web/`](../fotos_web/) — todas as fotos já processadas
- **Ferramentas:** esta pasta [`site_a10/build/`](.)
- **Dados/doc dos 8 A10:** [`site_a10/empreendimentos.json`](../empreendimentos.json), [`site_a10/README.md`](../README.md)

> Os HTML são **auto-contidos** (fontes e fotos embutidas em base64), então cada arquivo
> hoje tem ~56 MB. **Veja a seção "Externalizar imagens" no fim — é a próxima tarefa recomendada.**

## Estado atual das galerias (21 empreendimentos no catálogo)

| Empreendimento | Fotos | Obs. |
|---|---|---|
| patio-estaleiro | 20 | **Grupos: Casa Mar (7) + Casa Brisa (12)** |
| holmes | 27 | ✔ galeria completa |
| cape-town | 25 | ✔ galeria completa |
| aurora | 13 | ✔ |
| sunstar-tower | 12 | ✔ |
| hub-240 | 11 | ✔ |
| san-andreas | 10 | ✔ |
| villa-do-mar | 10 | ✔ |
| san-valentin | 9 | ✔ |
| casa-colombo | 8 | ✔ |
| solenne | 6 | ✔ (já vinha do site original) |
| **florence-garden** | 1 | ⬜ falta galeria |
| **notting-hill** | 1 | ⬜ falta galeria |
| **green-valley** | 1 | ⬜ falta galeria |
| **villa-del-acqua** | 1 | ⬜ falta galeria |
| **diamond-hill** | 1 | ⬜ falta galeria |
| **moradas-da-praia** | 0 | ⬜ "Foto em breve" |
| **acqua-laura** | 0 | ⬜ "Foto em breve" |
| **privilege** | 0 | ⬜ "Foto em breve" |
| **village-dos-ipes** | 0 | ⬜ "Foto em breve" |
| **haleiwa** | 0 | ⬜ "Foto em breve" |

## Arquitetura (como a galeria funciona)

Dentro de cada HTML há dois blocos JS:

- `const IMG = { "slug-da-foto": "data:image/jpeg;base64,...", ... }` — mapa de imagens.
- `const DATA = [ {slug, nome, ..., fotos:[...], grupos?:[...]}, ... ]` no **index.html** (array)
  e `const DATA = { "slug": {..., fotos:[...], grupos?:[...]}, ... }` no **apresentacao.html** (objeto).

O campo **`fotos`** de cada empreendimento é a lista de slugs de foto (que indexam `IMG`).
A UI já renderiza isso sozinha:
- **index.html:** ao abrir o detalhe, mostra aba **"Galeria"** (padrão) + aba "Informações".
  Se o empreendimento tiver o campo **`grupos`** (ex.: Pátio), a galeria vem rotulada por casa.
- **apresentacao.html:** botão **"Galeria de fotos"** abre imagem principal + miniaturas;
  também respeita `grupos`.

Convenção de nomes: capa = `<slug>.jpg` (ex.: `holmes`), galeria = `<slug>-1`, `<slug>-2`, …

## Como adicionar a galeria de um novo empreendimento

Pré-requisitos: **Python 3 + Pillow**, **Node.js**. (Nesta máquina: Python em
`C:\Users\joaog\AppData\Local\Programs\Python\Python312\python`, `pdftotext` no Git-Bash.)

1. **Baixar as fotos** do Google Drive (ver "Fotos no Drive" abaixo) para uma pasta, ex.:
   `~/Downloads/<slug>/`  (ou extrair o zip que o Drive gera).

2. **(Opcional) Contact sheet para curar/ordenar** e escolher/ordenar as melhores:
   ```
   python site_a10/build/contact_sheet.py "~/Downloads/<slug>" "~/Downloads/<slug>/_sheet.jpg"
   ```
   Abra o `_sheet.jpg`, veja os números `#N` e monte a ordem desejada (ex.: `2,1,5,3,...`).

3. **Otimizar para web** (JPEG progressivo, q84, máx 1920px) nomeando `<slug>-N.jpg`:
   ```
   python site_a10/build/optimize_photos.py "~/Downloads/<slug>" "~/Downloads/<slug>/stage" <slug> "2,1,5,3,..."
   ```
   (sem a lista de ordem no fim, usa ordem alfabética e inclui todas.)

4. **Copiar as fotos otimizadas** para o repo:
   ```
   cp ~/Downloads/<slug>/stage/*.jpg site_a10/fotos_web/
   ```

5. **Embutir nos dois HTML** (adiciona ao IMG e estende o `fotos` do empreendimento):
   ```
   python site_a10/build/add_gallery.py site_a10/netlify/index.html        <slug> "~/Downloads/<slug>/stage" <slug>
   python site_a10/build/add_gallery.py site_a10/netlify/apresentacao.html <slug> "~/Downloads/<slug>/stage" <slug>
   ```
   (o `<slug>` precisa existir no `DATA`. A capa `<slug>.jpg` já costuma existir no IMG e
   permanece como `fotos[0]`/hero; as novas viram a galeria.)

6. **Verificar** (servidor local + navegador):
   ```
   cd site_a10/netlify && python -m http.server 8791
   # abrir http://localhost:8791/index.html, clicar no card -> aba Galeria deve mostrar as fotos
   ```

7. **Commit + push:**
   ```
   git add site_a10/netlify/*.html site_a10/fotos_web/<slug>-*.jpg
   git commit -m "site_a10: galeria do <slug>"
   git push origin claude/a10-website-projects-9e865u
   ```

### Caso especial: empreendimento com sub-casas (grupos)
O Pátio Estaleiro usa `grupos` (Casa Mar / Casa Brisa). Para replicar em outro:
adicione as fotos com prefixos distintos (ex.: `<slug>-mar-N` e `<slug>-brisa-N`) via
`add_gallery` (uma vez por prefixo) **e** edite o `DATA` do empreendimento para incluir:
```js
grupos:[{nome:"Casa Mar",fotos:["<slug>-mar-1",...]},{nome:"Casa Brisa",fotos:["<slug>-brisa-1",...]}]
```
A UI (abas no index e openGal no deck) já sabe renderizar `grupos`. Veja o commit do Pátio
(`patio_build.py` / `deck_patio.py` no histórico) como referência.

## Fotos no Drive (Google Drive — usar o Chrome logado)

O conector MCP do Drive **não alcança os Shared Drives** — use o navegador logado.
As fotos estão em **"Compartilhados comigo"**:
- **Grupo Vluw - Mkt e Comercial → 1. EMPREENDIMENTOS → `<NOME>` → FOTOS `<NOME>`**
  (Aurora, Hub 240, Sunstar, San Andreas, San Valentin, Villa do Mar, Casa Colombo).
  Cada pasta tem também um `CHECKLIST <NOME>.pdf` com endereço/área/config.
- **A10 PATIO ESTALEIRO → CASA MAR / CASA BRISA / CASA ATLANTICA / PLANTAS** (fotos reais HDR do Pátio).
- Holmes e Cape Town vieram de pastas próprias no Drive (zips já baixados).

Baixar: abrir a pasta no Drive, selecionar tudo (Ctrl+A) → menu → **Baixar** (gera um zip
em `~/Downloads/drive-download-*.zip`). Depois seguir o passo a passo acima.

## ⚠️ Próxima tarefa recomendada: EXTERNALIZAR as imagens

Hoje cada HTML tem ~56 MB (imagens embutidas em base64) — pesado para celular.
**Recomendado antes de adicionar mais empreendimentos:** trocar os `data:image/...;base64`
por caminhos relativos a uma pasta `fotos/` ao lado dos HTML.
- Cada HTML cai para ~250 KB (abre instantâneo) e as fotos carregam sob demanda.
- Deploy: arrasta a pasta inteira no Netlify (index.html + apresentacao.html + fotos/) — igual.
- As fotos já estão em `site_a10/fotos_web/` (é só referenciar e adicionar `loading="lazy"`).
- Implementação: no gerador do site, em vez de `IMG[slug]=base64`, usar `IMG[slug]="fotos/"+slug+".jpg"`.

## Créditos / identidade visual

Padrão A10: creme `#F0EBDD`, navy `#0B1624`, dourado `#C9A86A`/`#AC8A38`,
Cormorant Garamond (títulos), Poppins (labels). WhatsApp ainda é placeholder
`5547999999999` nos dois HTML (trocar pelo número oficial).
