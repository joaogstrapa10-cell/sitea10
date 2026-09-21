# Site A10 Empreendimentos

Site estático do portfólio da **A10 Empreendimentos**, servido direto da raiz deste
repositório (Netlify, ver `netlify.toml`). Sem build: é HTML, CSS e JS puro.

Identidade: creme `#F5F2EA` / navy `#0B1624` / dourado `#B7965A`, Cormorant Garamond
nos títulos e Poppins no corpo. Logo oficial dourada em `lib/a10-logo.png`, presente
no header e no rodapé de todas as páginas.

## Páginas

| Arquivo | O que é |
|---|---|
| `index.html` | **Catálogo.** Rotas por hash: `#/` (grade), `#/mapa`, `#/contato`, `#/emp/<slug>` (detalhe) |
| `patio-estaleiro.html` | **Landing do Pátio Estaleiro.** Página de comunicação do empreendimento (filosofia, residências, santuário arquitetônico, galeria, localização, contato) |
| `apresentacao.html` | **Deck** cinematográfico em scroll vertical. Ainda com as fotos embutidas em base64 (58 MB) |

### Estrutura do catálogo

1. **Hero** com as categorias Todos / A10 / Imóveis Diversos e o atalho para o mapa
2. **Em destaque**: Pátio Estaleiro, Solenne e Holmes em cards grandes. A faixa some
   assim que o visitante busca, filtra ou troca de categoria
3. **Barra de ferramentas**: busca por texto (nome, cidade, rua, destaque, tipologia),
   filtros em drawer e ordenação (destaque, preço, área, nome)
4. **Grade** de cards. A foto sempre preenche o card (`object-fit: cover`); quem não
   tem foto mostra "Foto em breve"
5. **Detalhe** (`#/emp/<slug>`): capa clicável, selo de disponibilidade e três abas
   - **Galeria de fotos**, com miniaturas e lightbox em tela cheia (setas, teclado,
     Esc). Empreendimentos com o campo `grupos` vêm separados por casa (o Pátio
     Estaleiro mostra Casa Mar e Casa Brisa)
   - **Informações**: specs, descrição, atributos e comodidades
   - **Localização**: mapa Leaflet, endereço e link do Google Maps
6. **Contato** (`#/contato`) e rodapé com endereço, WhatsApp, e-mail, horário e redes

## Dados

`empreendimentos.json` na raiz é a **fonte de verdade**. Ele tem quatro blocos:

- `contato`: WhatsApp, e-mail, endereço, horário de atendimento e redes sociais
- `destaques`: os slugs da faixa "Em destaque", na ordem
- `empreendimentos`: os 20 empreendimentos
- `patio_landing`: todo o texto da landing do Pátio Estaleiro

As páginas não leem esse JSON direto: elas carregam `dados/empreendimentos.js`, que é
**gerado** a partir dele. Depois de editar o JSON, rode:

```bash
python3 build/gerar_dados.py
```

(Um `<script src>` funciona tanto no Netlify quanto abrindo o arquivo local, o que um
`fetch()` de JSON não permite.)

### Campos de cada empreendimento

`slug`, `nome`, `reg` + `accent` (o nome quebrado para o título), `tipologia`, `tipo`,
`cidade`, `endereco`, `tag`, `valor` + `valorNum`, `metragem` + `areaNum`,
`quartos` + `quartosNum` + `quartosLabel`, `vagas` + `vagasNum`, `banheirosNum`,
`status`, `parceria`, `destaque`, `descricao`, `atributos[]`, `comodidades[]`,
`fotos[]`, `grupos[]`, `placeholder`, `imgpos`, `fit`, `categoria` (`a10` ou
`diversos`), `lat`, `lng`.

O Pátio Estaleiro tem ainda `arquiteto`, `landing` (link para a página dedicada) e
`condominio`.

## Fotos

As fotos ficam em `fotos/img/` como arquivos soltos (238 arquivos, 46 MB). O código
resolve o caminho por convenção:

```js
const IMG = new Proxy({}, { get: (_, k) => 'fotos/img/' + k + '.jpg' });
```

Convenção de nomes: capa = `<slug>.jpg`, galeria = `<slug>-1.jpg`, `<slug>-2.jpg` etc.
O campo `fotos[]` lista os slugs na ordem de exibição, e o primeiro é a capa.

### Origem no Google Drive

`Grupo Vluw - Mkt e Comercial` → `1. EMPREENDIMENTOS` → `<NOME>` → `FOTOS <sigla>`,
com um `CHECKLIST <NOME>.pdf` ao lado trazendo endereço, metragem e configuração.
O Pátio Estaleiro fica fora dessa pasta, em
`A10 Empreendimentos - Material Vluw` → `Pátio Estaleiro`.

Três empreendimentos não têm pasta no Drive nem foto no site e aparecem como
"Foto em breve": `acqua-laura`, `privilege` e `haleiwa`.

A pasta `ILHA DE BELIZE` existe no Drive e ainda não está no site.

## Como rodar local

```bash
npx http-server -p 8791 .
# http://127.0.0.1:8791/index.html
```

## Convenções de conteúdo

- **Nunca usar travessões**, nem o longo nem o curto. Use ponto, vírgula, dois-pontos ou o separador `·`
- Logo dourada oficial no header e no rodapé de toda página
- A foto sempre preenche o card, sem faixas de fundo sobrando
- WhatsApp oficial: `5547991916412`. Ele vem do JSON, não está escrito no HTML

## Pendências

- `apresentacao.html` ainda carrega as fotos em base64 (58 MB). Externalizar para
  `fotos/img/` derruba para algo perto de 300 KB
- `netlify/` (113 MB) e `fotos_web/` (40 MB) são resíduo das versões anteriores e
  podem sair do repositório
- O e-mail `a10negociosimb@gmail.com.br` veio do documento de comunicação e foi
  mantido como está, a pedido. O domínio `gmail.com.br` não existe, então vale
  revisar antes de divulgar
