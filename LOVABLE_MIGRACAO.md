# Site A10 Empreendimentos: especificação para o Lovable

Especificação da versão React do site. Este documento é a referência do agente.

Repositório público: `joaogstrapa10-cell/sitea10`, branch `main`.
Base das URLs cruas, sem autenticação:

```
https://raw.githubusercontent.com/joaogstrapa10-cell/sitea10/main/
```

## 0. A referência é o site que já existe

O site já está construído e aprovado em HTML estático. **Baixe e leia o arquivo abaixo
antes de escrever qualquer código.** Ele é a fonte visual e funcional exata, com todo
o CSS, a estrutura das páginas e a lógica de filtros, galeria e mapa:

```
<base>/index.html
<base>/patio-estaleiro.html
```

Reproduza o que está ali em React. Onde este documento e o HTML divergirem, **o HTML
manda**, porque é o que o cliente validou.

O desenho segue o padrão do site da JHSF, que o cliente escolheu como referência:
foto e vídeo em tela cheia, títulos serifados centralizados em dourado, muito ar,
cantos retos e pouco texto.

## 1. Dados

Baixe `<base>/empreendimentos.json` e transforme em `src/data/empreendimentos.ts`
com tipagem. **Não reescreva, resuma ou traduza nenhum texto:** é copy aprovada.

| Bloco | Conteúdo |
|---|---|
| `contato` | WhatsApp, e-mail, endereço, horário e redes |
| `destaques` | Os três do hero, na ordem: `patio-estaleiro`, `solenne`, `holmes` |
| `empreendimentos` | Os 20 |
| `patio_landing` | Todo o texto da landing do Pátio Estaleiro |

Campo com o valor `"A confirmar"` é tratado como ausente e o elemento fica escondido.

## 2. Imagens e vídeo

**Nunca faça upload das fotos.** São 232, já hospedadas. Referencie por URL:

```ts
export const fotoUrl = (slug: string) =>
  `https://raw.githubusercontent.com/joaogstrapa10-cell/sitea10/main/fotos/img/${slug}.jpg`;
```

Logo oficial dourada: `<base>/lib/a10-logo.png`. Header e rodapé de toda página.

O hero da home é um `<video>` em loop, sem som, `playsinline`, com a foto de cartaz
enquanto o arquivo não carrega. O MP4 ainda não existe: aponte para
`<base>/video/a10-hero.mp4` e deixe o cartaz cobrindo até ele ser publicado.

## 3. Identidade visual

Tokens em CSS variables, nunca cores literais nos componentes.

| Token | Valor |
|---|---|
| creme | `#F5EFE3` |
| papel, fundo padrão | `#FBF8F2` |
| navy | `#0B1624` |
| texto | `#1D2C4B` |
| dourado | `#9A8250` |
| dourado claro, sobre escuro | `#E7D9B8` |
| dourado escuro, sobre claro | `#7A6538` |
| muted | `#6E7683` |
| linha | `rgba(29,44,75,.14)` |
| linha dourada | `rgba(154,130,80,.45)` |

Cormorant Garamond nos títulos e números grandes, Poppins no corpo e nos rótulos.
No `body`: `font-variant-numeric: lining-nums` e `font-feature-settings: 'lnum' 1`,
senão o Cormorant escreve "90" como "9o". Nunca branco puro como fundo de página.

**Cantos retos em tudo.** Tiles, blocos, botões, selos e caixas não têm raio. As
únicas exceções são os controles de interface (campo de busca, botões de filtro) e o
botão flutuante do WhatsApp, que é redondo.

Escala: kicker 13px no desktop e 12px no celular com `letter-spacing: .2em`; corpo
17px e 16px com entrelinha 1.8; títulos de seção `clamp(34px, 4.4vw, 62px)` em
serifada dourada e centralizados.

## 4. Rotas

| Rota | Página |
|---|---|
| `/` | Home editorial |
| `/empreendimentos` | Catálogo com busca, filtros e ordenação |
| `/empreendimento/:slug` | Detalhe com três abas |
| `/mapa` | Mapa de todos |
| `/contato` | Contato |
| `/patio-estaleiro` | Landing do Pátio Estaleiro |

A home **não** é o catálogo. A home é vitrine; a máquina de busca vive em
`/empreendimentos`, que é o primeiro item do menu.

## 5. Cabeçalho

Fixo e **transparente**, sem faixa de fundo e sem borda. **Logo no centro**, links
divididos nos dois lados dela, em texto branco, caixa alta, 12,5px, bem espaçados.

Ao rolar para fora do hero, ganha fundo papel e o texto vira navy, senão os links
ficam ilegíveis sobre o conteúdo claro. Nas rotas sem hero, já entra sólido.

No celular, hambúrguer que abre um menu em tela cheia sobre fundo navy.

## 6. Home

1. **Hero em vídeo**, altura de tela cheia, escurecido por gradiente. Texto
   centralizado: a cidade em 17px, o nome do empreendimento em serifada enorme,
   a tag, e dois botões, um sólido creme e um vazado claro. Alterna entre os três
   de `destaques` com setas e marcadores na base.
2. **Faixa creme de medalhões**: um círculo por empreendimento com foto, com o nome
   embaixo, em rolagem lateral.
3. **"Nossos empreendimentos"** em serifada dourada centralizada, e abaixo os tiles
   de foto em duas colunas, **sangrando de ponta a ponta, sem espaço entre eles**.
   Cada tile tem os selos no topo e, na base, nome, meta e preço, todos em branco
   sobre a foto.
4. **Bloco institucional**: metade creme com texto e uma caixa de borda dourada fina,
   metade foto até a borda.
5. **Faixa de números** e chamada para o mapa.

**Alinhamento dos tiles.** O bloco de texto é ancorado na base, então a altura de
cada linha precisa ser previsível, senão os nomes dançam de um card para o outro:
o nome reserva duas linhas, a meta reserva uma, e **o preço sempre existe**, mostrando
"Sob consulta" quando `valorNum` for nulo. Sem isso, um card sem preço fica uma linha
mais curto e desalinha do vizinho.

## 7. Catálogo

Categorias (Todos, Empreendimentos A10, Imóveis Diversos, com contagem), barra grudada
com contagem, busca, filtros e ordenação, chips removíveis e a grade dos mesmos tiles.

Busca sem acento e sem caixa contra nome, cidade, endereço, destaque, tipologia e tag,
exigindo que todos os termos apareçam. Ordenação: Destaque, Maior preço, Menor preço,
Maior área e Nome A a Z.

Filtros em drawer: Cidade, Tipo, Quartos, Banheiros, Vagas, Faixa de valor, Status e
Comodidades. Comodidades combinam em E, não em OU.

## 8. Detalhe

Capa em tela grande com os selos e o nome sobre a foto, clicável para o lightbox.
Barra com o valor e o botão de WhatsApp. Depois, três abas:

1. **Galeria de fotos** com a contagem. Miniaturas e lightbox em tela cheia com setas,
   teclado e Esc. Com `grupos`, vem separada por bloco: o Pátio Estaleiro mostra
   "Casa Mar · 7 fotos" e "Casa Brisa · 12 fotos". A capa dele não está dentro de
   `grupos`, então entra no lightbox na posição 0 e as miniaturas começam em 1.
   Sem fotos, mostre "Fotos em breve" e abra já em Informações.
2. **Informações**: specs com ícone, descrição, atributos e comodidades.
3. **Localização**: mapa Leaflet de verdade com pino dourado, endereço, link do Google
   Maps e a nota "Localização aproximada. Confirme o endereço exato com o corretor."

## 9. Mapa

Todos os que têm `lat` e `lng`. Pino dourado para `categoria: a10`, navy para os
demais, tooltip permanente com o nome curto e o valor, clique leva ao detalhe. O
enquadramento considera só as latitudes entre -26.5 e -27.6 e longitudes entre -48.4
e -48.9, senão a Casa Colombo, que fica no Paraná, afasta demais o zoom.

## 10. Landing do Pátio Estaleiro

Todo o texto vem de `patio_landing`. Hero cheio, faixa dourada de disponibilidade, e
as seções Filosofia, As Residências, Exclusividade & Natureza, Santuário Arquitetônico,
Galeria por casa, Localização com mapa real e Contato. O rodapé leva a assinatura, o
endereço e o botão de agendar visita, sem o parágrafo de resumo e sem a linha dos
pilares.

## 11. Regras que não podem ser quebradas

1. **Nunca usar travessões**, nem o longo nem o curto. Use ponto, vírgula,
   dois-pontos ou o separador `·`.
2. **Logo dourada oficial no header e no rodapé** de toda página.
3. **A foto sempre preenche o espaço**, com `object-fit: cover`, sem faixa de fundo
   sobrando.
4. **WhatsApp** lido de `contato.whatsapp`, nunca escrito no componente, com mensagem
   pré-preenchida com o nome do empreendimento. Fica num **botão flutuante redondo**
   no canto inferior direito, presente em todas as rotas, respeitando a safe area. Não
   fica no cabeçalho.
5. **Cantos retos**, conforme a seção 3.
6. **Não inventar dado comercial.** `"A confirmar"` é tratado como ausente.

## 12. Acessibilidade e responsivo

Mobile a partir de 360px, sem rolagem horizontal, respiro lateral de 20px. Tiles,
miniaturas e controles navegáveis por teclado. Lightbox com `role="dialog"`,
`aria-modal` e fechamento por Esc. Foco visível em dourado. `loading="lazy"` em tudo
menos a capa da página.
