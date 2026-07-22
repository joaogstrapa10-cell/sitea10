# Handoff Lovable — Galeria de fotos por empreendimento

> Cole o bloco abaixo no chat do projeto **Ippouniverse Explorer**
> (https://lovable.dev/projects/8239c145-1e56-4f56-8db3-e2fcc3da863f).
> As imagens já estão hospedadas no GitHub (repo público) — o agente do Lovable
> consegue baixá-las direto pelas URLs `raw.githubusercontent.com` abaixo e subir
> para o `lovable-assets` (CDN). Não precisa fazer upload manual.

---

## Mensagem para colar no Lovable

Quero transformar cada uma das 8 telas de empreendimento do deck de **"1 foto
full-bleed"** para **"foto full-bleed (capa) + aba/galeria de fotos"**.

Para cada empreendimento em `src/lib/empreendimentos.ts`, adicione um campo
`galeria: string[]` com a lista ordenada de imagens abaixo (a **1ª é a capa**
full-bleed atual; as demais formam a galeria). Baixe cada URL e suba para o
`lovable-assets`, depois referencie os assets locais.

Na cena de cada empreendimento (deck vertical, scroll-snap), mantenha a capa
full-bleed com a moldura dourada/número fantasma/specs como está, e **acrescente
uma galeria** com as fotos restantes — pode ser:
- um **carrossel/lightbox** discreto (setas + dots) sobreposto na base da cena, **ou**
- uma **faixa de miniaturas** (thumbs) que abre a foto em tela cheia ao clicar.

Mantenha a identidade A10: creme `#F0EBDD`, navy `#0B1624`, dourado `#C9A86A`,
títulos em Cormorant Garamond, labels em Poppins. As miniaturas com cantos suaves
e leve moldura dourada no hover. Lazy-load nas imagens da galeria (só a capa
carrega adiantado). Navegação por teclado (←/→) dentro da galeria sem quebrar o
scroll-snap vertical do deck.

Se ficar melhor para o layout, um botão discreto **"Ver galeria ( N fotos )"** na
cena que abre um lightbox em tela cheia também funciona — o que for mais elegante
dentro do padrão do deck.

As imagens (ordem = ordem de exibição):

### 1. Pátio Estaleiro — `patio-estaleiro` — Balneário Camboriú — 6 fotos
1. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/patio-estaleiro.jpg  (capa)
2. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/patio-estaleiro-2.jpg
3. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/patio-estaleiro-3.jpg
4. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/patio-estaleiro-4.jpg
5. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/patio-estaleiro-5.jpg
6. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/patio-estaleiro-6.jpg

### 2. Residencial Aurora — `aurora` — Balneário Camboriú/SC — 13 fotos
1. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora.jpg  (capa)
2. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-2.jpg
3. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-3.jpg
4. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-4.jpg
5. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-5.jpg
6. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-6.jpg
7. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-7.jpg
8. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-8.jpg
9. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-9.jpg
10. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-10.jpg
11. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-11.jpg
12. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-12.jpg
13. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/aurora-13.jpg

### 3. Hub 240 — `hub-240` — Porto Belo/SC — 11 fotos
1. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240.jpg  (capa)
2. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240-2.jpg
3. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240-3.jpg
4. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240-4.jpg
5. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240-5.jpg
6. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240-6.jpg
7. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240-7.jpg
8. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240-8.jpg
9. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240-9.jpg
10. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240-10.jpg
11. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/hub-240-11.jpg

### 4. Sunstar Tower — `sunstar-tower` — Itapema/SC — 12 fotos
1. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower.jpg  (capa)
2. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-2.jpg
3. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-3.jpg
4. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-4.jpg
5. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-5.jpg
6. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-6.jpg
7. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-7.jpg
8. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-8.jpg
9. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-9.jpg
10. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-10.jpg
11. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-11.jpg
12. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/sunstar-tower-12.jpg

### 5. Residencial San Andreas — `san-andreas` — Balneário Camboriú/SC — 10 fotos
1. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-andreas.jpg  (capa)
2. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-andreas-2.jpg
3. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-andreas-3.jpg
4. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-andreas-4.jpg
5. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-andreas-5.jpg
6. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-andreas-6.jpg
7. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-andreas-7.jpg
8. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-andreas-8.jpg
9. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-andreas-9.jpg
10. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-andreas-10.jpg

### 6. Residencial San Valentin — `san-valentin` — Balneário Camboriú/SC — 9 fotos
1. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-valentin.jpg  (capa)
2. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-valentin-2.jpg
3. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-valentin-3.jpg
4. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-valentin-4.jpg
5. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-valentin-5.jpg
6. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-valentin-6.jpg
7. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-valentin-7.jpg
8. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-valentin-8.jpg
9. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/san-valentin-9.jpg

### 7. Villa do Mar — `villa-do-mar` — Itapema/SC — 10 fotos
1. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/villa-do-mar.jpg  (capa)
2. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/villa-do-mar-2.jpg
3. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/villa-do-mar-3.jpg
4. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/villa-do-mar-4.jpg
5. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/villa-do-mar-5.jpg
6. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/villa-do-mar-6.jpg
7. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/villa-do-mar-7.jpg
8. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/villa-do-mar-8.jpg
9. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/villa-do-mar-9.jpg
10. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/villa-do-mar-10.jpg

### 8. Casa Colombo — `casa-colombo` — (localização a confirmar) — 8 fotos
1. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/casa-colombo.jpg  (capa)
2. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/casa-colombo-2.jpg
3. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/casa-colombo-3.jpg
4. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/casa-colombo-4.jpg
5. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/casa-colombo-5.jpg
6. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/casa-colombo-6.jpg
7. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/casa-colombo-7.jpg
8. https://raw.githubusercontent.com/joaogstrapa10-cell/ippouniverso/claude/a10-website-projects-9e865u/site_a10/fotos_web/casa-colombo-8.jpg

---

*Alternativa:* se preferir não depender do GitHub, os mesmos arquivos estão em
`site_a10/fotos_web/` do repo `ippouniverso` (branch `claude/a10-website-projects-9e865u`)
e podem ser enviados manualmente no chat do Lovable.
