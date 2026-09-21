# Migração do site A10 para o Lovable

Especificação da versão React do site que hoje roda como HTML estático neste
repositório. Este documento é a referência do agente do Lovable.

Repositório público: `joaogstrapa10-cell/sitea10`, branch `main`.

Base das URLs cruas (funcionam sem autenticação):

```
https://raw.githubusercontent.com/joaogstrapa10-cell/sitea10/main/
```

## 1. Dados

Baixe **uma vez** o arquivo abaixo e transforme o conteúdo em `src/data/empreendimentos.ts`,
exportando os quatro blocos com tipagem TypeScript. Não reescreva nem resuma nenhum texto:
o conteúdo é copy aprovada pelo cliente.

```
<base>/empreendimentos.json
```

Blocos do arquivo:

| Bloco | Conteúdo |
|---|---|
| `contato` | WhatsApp, e-mail, endereço, horário de atendimento e redes sociais |
| `destaques` | Os slugs da faixa "Em destaque", na ordem: `patio-estaleiro`, `solenne`, `holmes` |
| `empreendimentos` | Os 20 empreendimentos |
| `patio_landing` | Todo o texto da landing do Pátio Estaleiro |

Campos de cada empreendimento: `slug`, `nome`, `reg` e `accent` (o nome quebrado em duas
partes para o título, onde `accent` vai em itálico dourado), `tipologia`, `tipo`, `cidade`,
`endereco`, `tag`, `valor` e `valorNum`, `metragem` e `areaNum`, `quartos`, `quartosNum`,
`quartosLabel`, `vagas`, `vagasNum`, `banheirosNum`, `status`, `parceria`, `destaque`,
`descricao`, `atributos[]`, `comodidades[]`, `fotos[]`, `grupos[]`, `placeholder`,
`imgpos`, `fit`, `categoria` (`a10` ou `diversos`), `lat`, `lng`.

O Pátio Estaleiro tem ainda `arquiteto`, `landing`, `condominio` e `disponibilidade`.

Onde um campo vier como a string `"A confirmar"`, trate como ausente e esconda o elemento.

## 2. Imagens

**Não faça upload das fotos.** São 232 imagens já hospedadas no repositório público.
Referencie por URL:

```ts
export const fotoUrl = (slug: string) =>
  `https://raw.githubusercontent.com/joaogstrapa10-cell/sitea10/main/fotos/img/${slug}.jpg`;
```

O array `fotos[]` de cada empreendimento lista os slugs na ordem de exibição, e o
primeiro é sempre a capa.

A logo oficial dourada é `<base>/lib/a10-logo.png`. Ela precisa aparecer no header e no
rodapé de toda página. Essa é uma regra fixa do cliente.

## 3. Identidade visual

Defina como CSS variables no `index.css` e mapeie no `tailwind.config.ts`. Nunca use
cores literais nos componentes.

| Token | Valor |
|---|---|
| `--cream` | `#F5F2EA` |
| `--paper` (fundo padrão) | `#FBFAF5` |
| `--card` | `#FFFFFF` |
| `--navy` | `#0B1624` |
| `--navy-2` (texto) | `#1D2C4B` |
| `--gold` | `#B7965A` |
| `--gold-l` (dourado claro, sobre fundo escuro) | `#E7D09B` |
| `--gold-d` (dourado escuro, sobre fundo claro) | `#856733` |
| `--muted` | `#6E7683` |
| `--line` | `rgba(29,44,75,.12)` |

Fontes: **Cormorant Garamond** (400, 500, 600, mais itálico 400 e 500) nos títulos,
valores e números grandes; **Poppins** (300 a 600) no corpo, labels e botões.
Nunca use branco puro como fundo de página.

Detalhe importante: o Cormorant sai com numerais em estilo antigo por padrão, e o "90"
vira "9o". Aplique no `body`:

```css
font-variant-numeric: lining-nums;
font-feature-settings: 'lnum' 1;
```

Padrões recorrentes: kicker em caixa alta dourada com `letter-spacing` entre `.22em` e
`.34em` e tamanho entre 10px e 11px; título serif com a segunda palavra em itálico
dourado; losango dourado rotacionado 45 graus como marcador de lista.

## 4. Rotas

| Rota | Página |
|---|---|
| `/` | Catálogo |
| `/empreendimento/:slug` | Detalhe |
| `/mapa` | Mapa de todos os empreendimentos |
| `/contato` | Contato |
| `/patio-estaleiro` | Landing do Pátio Estaleiro |

## 5. Catálogo (`/`)

1. **Header fixo**: logo dourada, links Empreendimentos, Pátio Estaleiro, Mapa e Contato,
   mais um botão verde de WhatsApp com o texto "Fale com a gente".
2. **Hero** centralizado: kicker "O portfólio A10", título "Encontre seu *endereço.*"
   com a segunda palavra em itálico dourado, uma linha de apoio, o seletor de categoria
   (Todos / A10 / Imóveis Diversos, cada um com a contagem) e o botão navy
   "Ver empreendimentos no mapa".
3. **Em destaque**: os três slugs de `destaques` em cards grandes 4/5, foto com gradiente
   escuro na base, selo A10, selo dourado de disponibilidade quando o campo existir, nome,
   tag em itálico e uma linha de meta. **Esta faixa some** assim que houver busca ativa,
   filtro ativo ou categoria diferente de "todos": ela atrapalha a leitura do resultado.
4. **Barra de ferramentas grudada abaixo do header**: contagem de resultados, campo de
   busca, botão de filtros e select de ordenação (Destaque, Maior preço, Menor preço,
   Maior área, Nome A a Z).
   - A busca casa contra `nome`, `cidade`, `endereco`, `destaque`, `tipologia` e `tag`,
     sem acento e sem caixa, exigindo que **todos** os termos digitados apareçam.
   - "Destaque" ordena colocando os slugs de `destaques` na frente, na ordem do array.
5. **Chips** dos filtros ativos, incluindo o termo buscado, cada um removível, mais um
   "Limpar tudo".
6. **Grade** responsiva de cards com proporção 20/17. A foto **sempre** preenche o card
   com `object-fit: cover`, sem exceção. Cada card tem selo A10 quando `categoria` for
   `a10`, pill de status, contador de fotos e, quando não houver foto, um placeholder
   elegante com o texto "Foto em breve".

**Filtros** (em drawer lateral): Categoria, Cidade (Balneário Camboriú, Itapema,
Porto Belo), Tipo (Casa, Apartamento), Quartos, Banheiros e Vagas (botões 1+ a 4+),
Faixa de valor (até R$ 1 mi, R$ 1 a 3 mi, R$ 3 a 5 mi, R$ 5 a 10 mi, R$ 10 mi+),
Status (Pré-lançamento, Lançamento, Em obras, Pronto) e Comodidades (Piscina, Academia,
Vista mar, Rooftop, Churrasqueira, Salão de festas, Spa / Sauna, Segurança 24h).
Comodidades combinam em E, não em OU.

## 6. Detalhe (`/empreendimento/:slug`)

Capa grande 16/9 clicável que abre o lightbox na primeira foto. Abaixo: kicker com
tipologia e cidade, título, tag em itálico, selos (Empreendimento A10, status,
disponibilidade, e o link "Página do empreendimento" quando o campo `landing` existir)
e o valor à direita.

Em seguida, **três abas**:

1. **Galeria de fotos**, com a contagem ao lado do rótulo. Grade de miniaturas 4/3 que
   abrem um lightbox em tela cheia com setas, navegação por teclado e Esc.
   Quando o empreendimento tiver `grupos`, a galeria vem separada por bloco rotulado
   (o Pátio Estaleiro mostra "Casa Mar · 7 fotos" e "Casa Brisa · 12 fotos").
   Atenção ao índice: a capa do Pátio não está dentro de `grupos`, então ela entra no
   lightbox na posição 0 e as miniaturas começam em 1.
   Sem fotos, mostre "Fotos em breve" e abra o detalhe já na aba Informações.
2. **Informações**: specs com ícone (quartos, banheiros, vagas, metragem), descrição,
   atributos e lazer, comodidades.
3. **Localização**: mapa com pino dourado, endereço, link para o Google Maps e a nota
   "Localização aproximada. Confirme o endereço exato com o corretor."

No fim, botão verde de WhatsApp "Falar sobre este empreendimento".

## 7. Mapa (`/mapa`)

Mapa com todos os empreendimentos que tiverem `lat` e `lng`. Pino dourado para
`categoria: a10` e navy para os demais, com tooltip permanente mostrando o nome curto
(`accent`) e o valor. Clicar no pino leva ao detalhe. O enquadramento inicial deve
considerar só os pontos entre as latitudes -26.5 e -27.6 e longitudes -48.4 e -48.9,
senão a Casa Colombo (que fica em Colombo, no Paraná) afasta demais o zoom.

## 8. Landing do Pátio Estaleiro (`/patio-estaleiro`)

Todo o texto vem de `patio_landing`. Header próprio com âncoras para as seções.

1. **Hero** de altura quase cheia, foto `patio-estaleiro` de fundo com opacidade 0.66
   sobre fundo navy, gradiente escurecendo topo e base. Kicker, título em duas linhas
   (a segunda em dourado claro), subtítulo, botão dourado "Agendar visita" que abre o
   WhatsApp e botão vazado "Ver as fotos".
2. **Faixa dourada** logo abaixo do hero com o campo `disponibilidade`.
3. **Filosofia** (fundo creme): kicker, título, texto e os quatro valores numerados
   01 a 04, cada um com uma linha dourada no topo.
4. **As Residências**: texto ao lado de uma foto vertical 4/5 com moldura dourada
   interna, e três números grandes em serif dourado.
5. **Exclusividade & Natureza** (fundo navy): foto à esquerda, texto e bullets à direita.
6. **Santuário Arquitetônico** (fundo creme): texto, três selos em caixa com borda
   dourada e a citação centralizada em serif itálico, entre aspas douradas.
7. **Galeria**, separada por Casa Mar e Casa Brisa, com o mesmo lightbox do detalhe.
8. **Localização**: texto, dois números grandes e o mapa com o pino.
9. **Contato** (fundo navy): os quatro cartões (Endereço, Fale com a gente, Horário de
   atendimento, Redes sociais) e o botão dourado de agendamento.
10. **Rodapé** escuro com a logo, a assinatura, o resumo, os links das seções e a linha
    dos quatro pilares.

## 9. Regras que não podem ser quebradas

1. **Nunca usar travessões**, nem o longo nem o curto, em nenhum texto da interface.
   Use ponto, vírgula, dois-pontos ou o separador `·`.
2. **Logo oficial dourada** no header e no rodapé de toda página.
3. **A foto sempre preenche o card**, com `object-fit: cover`. Nunca deixe faixa de
   fundo sobrando em volta da imagem.
4. **WhatsApp oficial `5547991916412`**, lido de `contato.whatsapp`, nunca escrito no
   componente. Os links levam mensagem pré-preenchida com o nome do empreendimento.
5. Destaque inicial fixo em Pátio Estaleiro, Solenne e Holmes, na ordem do array
   `destaques`.
6. Não invente dado comercial. O que estiver como "A confirmar" fica escondido.

## 10. Acessibilidade e responsivo

Mobile a partir de 360px de largura, sem rolagem horizontal, com respiro lateral de
16px. Cards e miniaturas navegáveis por teclado. Lightbox com `role="dialog"`,
`aria-modal` e fechamento por Esc. Foco visível em dourado.
`loading="lazy"` em tudo menos a capa da página.
