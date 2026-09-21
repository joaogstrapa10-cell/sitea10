# Rotas prontas para o projeto Lovable

Estes arquivos são as quatro rotas que faltavam no projeto React da A10 no Lovable
(`2c6b3961-f224-412e-8ef9-f295d05b1125`). O agente do Lovable parou depois de construir
a home e o catálogo, deixando o build quebrado, porque `SiteHeader`, `Tile` e a home já
apontam para rotas que não existiam.

Eles estão aqui, e não no Lovable, porque os dois workspaces ficaram sem crédito. Assim,
quando o crédito voltar, o agente só precisa **copiar** estes arquivos, em vez de escrever
tudo de novo. Sai muito mais barato e não corre o risco de ele inventar um mapa falso,
como já aconteceu antes.

## Onde cada arquivo vai

| Daqui | Para o projeto Lovable |
|---|---|
| `src/routes/empreendimento.$slug.tsx` | mesmo caminho |
| `src/routes/mapa.tsx` | mesmo caminho |
| `src/routes/contato.tsx` | mesmo caminho |
| `src/routes/patio-estaleiro.tsx` | mesmo caminho |

Nada mais muda. `src/data/empreendimentos.ts`, `src/styles.css`, `SiteHeader`,
`SiteFooter`, `Tile`, `Lightbox`, `LeafletMap`, `MapClient`, a home e o catálogo já
estão prontos e conferidos no projeto. O `routeTree.gen.ts` se regenera sozinho.

## O que foi seguido

- As classes usadas já existem no `styles.css` do projeto, inclusive as `.pl-*` da landing.
  Nenhuma classe nova foi inventada e o CSS não precisa mudar.
- O mapa é Leaflet de verdade nas duas rotas que usam mapa, pelo `MapClient` que o projeto
  já tem, nunca um desenho decorativo.
- Nenhum travessão, nem o longo nem o curto. Só ponto, vírgula, dois-pontos e o `·`.
- A capa do Pátio Estaleiro não está dentro de `grupos`, então no detalhe ela entra no
  lightbox na posição 0 e as miniaturas dos grupos começam em 1. Na landing o lightbox
  tem só as fotos das casas, começando em 0, igual ao site estático.
- O preço sempre aparece, com "Sob consulta" quando `valorNum` é nulo, senão os tiles
  desalinham.

## Duas decisões que fogem da spec, de propósito

1. **A landing não tem rodapé próprio.** No site estático ela termina com um rodapé com
   assinatura, endereço e o botão de agendar visita. No Lovable o `__root.tsx` já coloca
   o `SiteFooter` em toda rota, e ele já traz logo, endereço, e-mail, WhatsApp, horário e
   redes. Dois rodapés escuros empilhados ficariam ruins, então a assinatura do Pátio e o
   botão de agendar visita entraram no fim da seção de contato, e o rodapé do site fecha a
   página. Nada de conteúdo se perdeu.
2. **A capa do detalhe é uma `div` clicável, não um `button`.** Um `button` não pode conter
   um `h1`, e a capa tem o nome do empreendimento em `h1` sobre a foto. O clique na capa
   continua abrindo o lightbox, e o botão "Ampliar", que é um `button` de verdade, faz o
   mesmo pelo teclado.

## Pendência que não é destes arquivos

A landing continua na linguagem visual antiga, com o dourado `#B7965A` e os cantos que
vieram do desenho anterior. Isso é fiel ao `patio-estaleiro.html` de hoje, que é a
referência. Levar a landing para a direção JHSF é um passo à parte, e precisa ser feito
primeiro no HTML estático, que é o que manda.
