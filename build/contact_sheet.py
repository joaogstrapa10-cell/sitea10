#!/usr/bin/env python3
"""
contact_sheet.py — monta um mosaico numerado das fotos de uma pasta, para curar/ordenar.
Uso: python contact_sheet.py <pasta> <saida.jpg>
Cada miniatura recebe #N e o nome do arquivo — use os números na 'ordem' do optimize_photos.py.
Requer Pillow.
"""
from PIL import Image, ImageDraw, ImageFont
import sys, os, glob

inp, out = sys.argv[1], sys.argv[2]
imgs = sorted([f for f in glob.glob(os.path.join(inp, "**", "*"), recursive=True)
               if f.lower().endswith(('.jpg', '.jpeg', '.png')) and 'thumbs' not in os.path.basename(f).lower()])
try: font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 14)
except Exception: font = ImageFont.load_default()
n = len(imgs); COLS = 6; TW = 300; PAD = 6; LH = 20
rows = (n + COLS - 1)//COLS; cw = TW + PAD; chh = int(TW*0.66) + LH + PAD
sheet = Image.new("RGB", (COLS*cw + PAD, rows*chh + PAD), (20, 22, 28)); dr = ImageDraw.Draw(sheet)
for i, f in enumerate(imgs):
    r, c = divmod(i, COLS); x = PAD + c*cw; y = PAD + r*chh
    im = Image.open(f).convert("RGB"); im.thumbnail((TW, int(TW*0.66)))
    sheet.paste(im, (x, y+LH))
    dr.text((x+2, y+2), "#%d %s" % (i+1, os.path.basename(f)[:30]), fill=(255, 214, 120), font=font)
sheet.save(out, "JPEG", quality=80)
print(n, "fotos ->", out)
