#!/usr/bin/env python3
"""Gera dados/empreendimentos.js a partir de empreendimentos.json.

empreendimentos.json e a fonte de verdade do site. As paginas HTML carregam o
.js gerado por este script (um <script src> funciona tanto no Netlify quanto
abrindo o arquivo local, o que um fetch() de JSON nao permite).

Uso:  python3 build/gerar_dados.py
"""
import io
import json
import os

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEM = os.path.join(RAIZ, 'empreendimentos.json')
DESTINO = os.path.join(RAIZ, 'dados', 'empreendimentos.js')


def main():
    with io.open(ORIGEM, encoding='utf-8') as f:
        dados = json.load(f)

    corpo = json.dumps(dados, ensure_ascii=False, separators=(',', ':'))
    js = (
        '/* GERADO POR build/gerar_dados.py A PARTIR DE empreendimentos.json.\n'
        '   Nao edite este arquivo: edite o JSON e rode o script novamente. */\n'
        'window.A10=' + corpo + ';\n'
    )

    os.makedirs(os.path.dirname(DESTINO), exist_ok=True)
    with io.open(DESTINO, 'w', encoding='utf-8') as f:
        f.write(js)

    print('%s: %d empreendimentos, %.0f KB'
          % (os.path.relpath(DESTINO, RAIZ),
             len(dados['empreendimentos']),
             len(js.encode('utf-8')) / 1024))


if __name__ == '__main__':
    main()
