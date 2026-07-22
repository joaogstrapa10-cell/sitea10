# Site A10 Empreendimentos

Portfólio da **A10 Empreendimentos**, construído no **Lovable**
(React + TanStack Start + Tailwind + shadcn/ui) seguindo o padrão visual validado da
A10 (creme + navy + dourado · Cormorant Garamond + Poppins).

> **Formato atual: deck cinematográfico (single-page vertical).** O site é uma única
> página em slideshow com scroll-snap (14 cenas, cada uma 100vh): capa creme → 8
> empreendimentos em foto full-bleed com moldura dourada, número fantasma e specs →
> slides de encerramento ("Um portfólio · uma direção", manifesto "Vamos construir
> juntos" com link WhatsApp, assinatura A10 × R21, notas, "Fim"). Tem barra de
> progresso, dots de navegação laterais, navegação por teclado (↑/↓, PgUp/PgDn,
> Home/End), parallax suave e reveal-on-scroll. Réplica refinada do deck de referência
> (netlify) aprovado pelo cliente.
>
> *(Histórico: uma primeira versão era institucional multi-página — home, portfólio,
> sobre, contato e páginas de detalhe. Foi substituída pelo deck a pedido.)*

## Links do projeto (Lovable)

- **Projeto:** Ippouniverse Explorer — `8239c145-1e56-4f56-8db3-e2fcc3da863f`
- **Workspace:** Giulliano's Lovable
- **Editor:** https://lovable.dev/projects/8239c145-1e56-4f56-8db3-e2fcc3da863f
- **Preview:** https://id-preview--8239c145-1e56-4f56-8db3-e2fcc3da863f.lovable.app

> O código-fonte do site vive no repositório interno do Lovable. Esta pasta guarda a
> **documentação** e as **fotos web** que alimentam o site.

## Estrutura do site (deck — rota única `/`, 11 cenas)

| # | Cena | Descrição |
|---|------|-----------|
| 1 | Capa | **Fundo creme sólido** (`#F0EBDD`, sem foto), logo A10, "Nossos *empreendimentos.*", stats 08 · Torres · Casas, "role para caminhar" |
| 2–9 | Empreendimentos | 1 por tela: foto full-bleed (capa) + moldura dourada, número fantasma, título serif/dourado, tag, specs (Tipologia, Destaque/Parceria, Localização, Status) e **aba/galeria de fotos** com as demais imagens do campo `galeria` (6–13 por empreendimento) |
| 10 | Direção | Navy, "10" gigante, "Um portfólio · uma direção" |
| 11 | Manifesto (final) | "Vamos construir *juntos.*" + link discreto WhatsApp "Falar com a A10" — **cena de encerramento** |

> As cenas de Assinatura (A10 × R21), Notas e "Fim" foram removidas a pedido — o deck
> encerra no manifesto. O número de WhatsApp do link "Falar com a A10" é placeholder
> (`5547999999999`) até o número oficial ser definido.

## Os 8 empreendimentos e as galerias de fotos

As fotos web otimizadas estão em [`fotos_web/`](./fotos_web/). Cada arquivo é nomeado
`<slug>.jpg` (capa) + `<slug>-N.jpg` (galeria). O campo `galeria` de cada empreendimento
em [`empreendimentos.json`](./empreendimentos.json) lista **todas** as fotos na ordem de
exibição (a primeira é a capa/full-bleed; as demais compõem a aba **Galeria de fotos**).

| # | Slug | Nome | Nº de fotos | Conteúdo da galeria |
|---|------|------|:-----------:|---------------------|
| 1 | `patio-estaleiro` | Pátio Estaleiro (A10 × R21) | 6 | Casa Mar + Casa Brisa (fachada, pôr do sol, real) |
| 2 | `aurora` | Residencial Aurora | 13 | Torre + lazer + apto decorado (vista mar, living, cozinha, suíte, banheiro, varanda, rooftop, hall) |
| 3 | `hub-240` | Hub 240 | 11 | Fachada + amenities (rooftop, piscina, coworking, game, mercado) + unidades decoradas |
| 4 | `sunstar-tower` | Sunstar Tower | 12 | Fachada + rooftop/infinity pool + academia + penthouse panorâmica + closet + suíte vista mar |
| 5 | `san-andreas` | Residencial San Andreas | 10 | Fachada + apto mobiliado (living, cozinha, suíte, banheiro, varanda vista) |
| 6 | `san-valentin` | Residencial San Valentin | 9 | Apto decorado (living integrado, cozinha, suíte master, banheiro, varanda vista) |
| 7 | `villa-do-mar` | Villa do Mar | 10 | Apto mobiliado (living, cozinha/jantar, suíte, banheiro, terraço gourmet) |
| 8 | `casa-colombo` | Casa Colombo | 8 | Casa pronta (fachada, ambientes com teto/piso em madeira, cozinha) |

- **Hero da home:** `home-hero.jpg` (torre Aurora com piscina refletindo — foto-assinatura do portfólio).

### Origem das fotos

- **Aurora, Hub 240, Sunstar Tower, San Andreas, San Valentin, Villa do Mar, Casa Colombo:**
  baixadas do Google Drive **Grupo Vluw - Mkt e Comercial → 1. EMPREENDIMENTOS →
  `<NOME>` → FOTOS `<NOME>`**. Cada pasta tem 16–36 fotos brutas; foram curadas as
  melhores 7–11 por empreendimento.
- **Pátio Estaleiro:** a pasta do Drive só tem criativos de marketing (com preço/logo);
  a galeria usa as fotos limpas de `../EMPREENDIMENTOS A10/` (Casa Mar / Casa Brisa,
  variantes `_real` e `_foto_pordosol`).

Todas as versões em `fotos_web/` foram redimensionadas (máx. 1920px de largura) e
otimizadas (JPEG progressivo, qualidade ~84) para uso web.

> **Dados dos CHECKLISTs (Drive):** os PDFs `CHECKLIST *.pdf` de cada pasta trazem
> endereço, metragem e configuração. Esses dados foram adicionados ao
> `empreendimentos.json` no objeto **`ficha`** (campos `nome_oficial`, `endereco`,
> `area_privativa`, `area_total`, `configuracao`, `vagas`, `lazer[]`) para
> Aurora, Hub 240, Sunstar Tower, San Andreas, San Valentin, Villa do Mar e
> Casa Colombo. Só Pátio Estaleiro fica sem `ficha` (a pasta do Drive não tem
> CHECKLIST — só criativos de marketing). Obs.: San Valentin tem divergência de
> metragem no PDF original (marcada no campo `area_total`); Casa Colombo é um
> **sobrado em Colombo/PR** (não litoral) — a `localizacao` foi corrigida.

## Identidade visual (tokens A10)

| Token | Valor |
|-------|-------|
| Creme (fundo claro) | `#F0EBDD` (nunca branco puro) |
| Navy (fundo escuro) | `#0B1624` · cards `#101B2C` |
| Dourado | `#C9A86A` · claro `#D9BC7C` · sobre creme `#AC8A38` |
| Fonte títulos/valores | Cormorant Garamond (600; itálico 500 para nomes) |
| Fonte corpo/labels/CTA | Poppins (400/500/600) |

Referência completa em [`../A10_PADRAO/INSTRUCOES.md`](../A10_PADRAO/INSTRUCOES.md).

## Dados comerciais pendentes

Localização e status de vários empreendimentos estão como **"A confirmar"** de propósito.
Assim que os dados oficiais forem definidos, atualizar em `src/lib/empreendimentos.ts` no
projeto Lovable (campos `localizacao` e `status`).

## Como atualizar

1. Abrir o **editor** do projeto no Lovable (link acima).
2. Para trocar/adicionar fotos: enviar as imagens no chat do Lovable com o nome do `slug`
   e pedir para substituir; o agente sobe para a CDN (`lovable-assets`) e atualiza
   `src/lib/empreendimentos.ts` + rotas.
3. Para publicar o site: usar **Publish** no Lovable (gera um domínio `*.lovable.app`;
   domínio próprio pode ser configurado nas settings do projeto).
