# Pátio Estaleiro Digital: conteúdo real no lugar do provisório

Projeto Lovable `49fcb6aa-5fd9-4de3-b5bb-4e96af28d2a4`, no workspace do Giulliano.
É o site cinematográfico de rolagem que o cliente escolheu como base.

Este arquivo substitui `src/components/patio-estaleiro.tsx` por inteiro. Mesmo caminho,
mesmo nome, mesma exportação padrão, então `src/routes/index.tsx` não muda e nenhum
outro arquivo do projeto precisa ser tocado.

```
https://raw.githubusercontent.com/joaogstrapa10-cell/sitea10/main/lovable/patio-digital/src/components/patio-estaleiro.tsx
```

## O que foi preservado

Tudo o que dá a cara do site: o hero com parallax e as letras subindo uma a uma, o
manifesto revelado palavra por palavra, os contadores animados, a Vista como clímax,
os diferenciais alternando lado, a galeria que corre na horizontal conforme a página
desce, o lightbox, o botão flutuante do WhatsApp, o grão e as mulliones. Nenhuma
animação foi trocada e a ordem da rolagem é a mesma, com uma seção nova no meio.

## O que mudou, e por quê

**O conteúdo era de outro prédio.** O texto falava de uma torre de 32 andares, 2
apartamentos por andar, 340 m² e rooftop com piscina de borda infinita, a 50 m da
orla, entre a Barra Sul e a orla central. O Pátio Estaleiro é o oposto disso: são 8
casas na Praia do Estaleiro, a 90 m do mar, projeto de Marcos Jobim, e restam duas, a
Casa Mar de 344 m² e a Casa Brisa de 299 m². Todo o texto foi reescrito com o dado
real de `empreendimentos.json`.

**O WhatsApp não existia.** Estava `https://wa.me/55XXXXXXXXXXX`, um número de
exemplo. Quem clicasse não falava com ninguém. Agora é `5547991916412`, e cada botão
leva uma mensagem já preenchida com o nome do empreendimento.

**Havia travessões.** A regra do cliente é nunca usar, nem o longo nem o curto.
O arquivo agora tem zero.

**As fotos eram renders genéricos empacotados.** Saíram os `import` de `@/assets/` e
entraram as fotos oficiais por URL, do repositório público da A10. São 14 imagens
reais das duas casas, do Solenne e do restante do portfólio. Trocar qualquer uma é
trocar um slug. Nada de upload.

**Seção nova: Empreendimentos.** Substitui "O Empreendimento" no menu. Traz o Pátio
Estaleiro e o Solenne como os dois carros-chefe, cada um com foto, texto, ficha de
specs, valor e botão de WhatsApp próprio, e abaixo deles Holmes, Cape Town e
Florence Garden como o restante do portfólio A10.

**O mapa virou mapa de verdade.** Era um iframe do Google apontando para "Balneário
Camboriú", sem pino nenhum. Agora é Leaflet com base escura, combinando com o site, e
dois pinos: o Pátio Estaleiro na Praia do Estaleiro, em dourado, e o Solenne no
Centro, em claro. O enquadramento se ajusta sozinho aos dois.

O Leaflet entra pelo CDN dentro do `useEffect`, então **não precisa instalar pacote
nenhum** e nada disso roda no servidor. Se o CDN falhar, a seção continua legível pelo
texto, pela lista e pela legenda dos dois pinos.

## Decisões que valem confirmar

- A galeria ficou com 10 fotos curadas, 8 das casas e 2 do Solenne. Ela define a altura
  da rolagem, 90vh por foto, então colocar as 19 do Pátio deixaria essa seção
  longa demais. Dá para subir esse número a qualquer momento.
- O hero está com a foto de capa do Pátio Estaleiro, que foi o teste pedido. Trocar
  para o Solenne é mudar um slug em `HERO.image`.
- A seção Empreendimentos mostra os cinco do portfólio próprio da A10. Se a ideia for
  listar os 20 do catálogo inteiro, é só dizer.
