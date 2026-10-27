# revision_pdf.py — PDF para revisar los 66 diseños de tasas (60 historias + 6 posts), con su código, hora y corredor.
#   python revision_pdf.py   (después de: node src/muestra.mjs) → ../Revision_disenos_tasas.pdf
import pathlib, subprocess
from PIL import Image

B = pathlib.Path(__file__).resolve().parent
P = B / "preview"; W = B / "_revision"; W.mkdir(exist_ok=True)
CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe"
F = (B / "assets" / "fonts").as_uri()
ORDEN = ["CLVE", "CLVE", "CLPE", "CLVE", "CLCO", "PEVE", "CLVE", "COVE", "TODOS", "CLVE"]
NOM = {"CLVE": "Chile → Venezuela", "CLPE": "Chile → Perú", "CLCO": "Chile → Colombia", "PEVE": "Perú → Venezuela", "COVE": "Colombia → Venezuela", "TODOS": "Todos los corredores"}
HORA = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
HORA_SAB = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "14:00"]
DIAS = [("Lunes", "E", "F5"), ("Martes", "F", "F6"), ("Miércoles", "S", "F1"), ("Jueves", "B", "F2"), ("Viernes", "C", "F3"), ("Sábado", "D", "F4")]


def mini(k, w):
    im = Image.open(P / f"{k}.jpg").convert("RGB"); im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    out = W / f"{k}.jpg"; im.save(out, quality=82); return out.as_uri()


fichas = []  # (dia, html de la ficha)
for dia, pre, feed in DIAS:
    horas = HORA_SAB if pre == "D" else HORA
    for i in range(10):
        k = f"{pre}{i + 1:02d}"
        fichas.append((dia, f'<div class="ficha"><img src="{mini(k, 640)}"><div class="et"><b>{k}</b><span>{dia} {horas[i]} · {NOM[ORDEN[i]]}</span></div></div>'))
    fichas.append((dia, f'<div class="ficha post"><img src="{mini(feed, 700)}"><div class="et"><b>{feed}</b><span>Post del {dia.lower()} · 9:00{" · con Colombia y Perú" if dia in ("Martes", "Jueves", "Sábado") else ""}</span></div></div>'))

css = f"""@font-face{{font-family:"Comfortaa";src:url("{F}/Comfortaa-Bold.ttf");font-weight:700}}
@font-face{{font-family:"Comfortaa";src:url("{F}/Comfortaa-Regular.ttf");font-weight:400}}
@page{{size:A4;margin:0}}*{{margin:0;padding:0;box-sizing:border-box}}
body{{font-family:"Comfortaa",sans-serif;color:#1F2A22;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.pg{{width:210mm;height:297mm;padding:12mm 14mm;page-break-after:always;position:relative;overflow:hidden}}
.pg:last-child{{page-break-after:auto}}
h1{{font-size:20pt;color:#0E5A2C;margin-bottom:2mm}} h1 b{{color:#00913E}}
.sub{{font-size:9pt;color:#4a5a50;margin-bottom:5mm}}
.grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm 6mm}}
.ficha img{{width:100%;display:block;border-radius:2.5mm;box-shadow:0 .6mm 2mm rgba(0,0,0,.2)}}
.et{{display:flex;flex-direction:column;margin-top:1.6mm}}
.et b{{font-size:13pt;color:#00913E;line-height:1.1}}
.et span{{font-size:7.6pt;color:#4a5a50;line-height:1.3}}
.pie{{position:absolute;left:14mm;right:14mm;bottom:6mm;font-size:7pt;color:#8a978e;display:flex;justify-content:space-between}}
.portada{{background:#0E5A2C;color:#fff;padding:30mm 22mm}} .portada h1{{color:#fff;font-size:30pt;line-height:1.15}} .portada h1 b{{color:#DEA503}}
.portada p{{font-size:12pt;line-height:1.6;margin-top:8mm;max-width:150mm}} .portada .cod{{margin-top:10mm;font-size:11pt;line-height:1.9}}
.portada .cod b{{color:#DEA503}}"""

pages = [f"""<div class="pg portada"><h1>Revisión de los <b>diseños de tasas</b></h1>
<p>Los 66 diseños que publica el bot: 10 historias por día de lunes a sábado y el post del día. Están renderizados con la tasa real de hoy (Chile → Venezuela 0,9249) y los tramos de 250.000 y 500.000.</p>
<p>Para corregir, escribe el <b>código</b> y el cambio. Ejemplo: <i>“F04: subir los tramos”</i>. También puedes hacerlo desde Telegram con ✏️ Editar.</p>
<div class="cod"><b>E01–E10</b> lunes · <b>F01–F10</b> martes · <b>S01–S10</b> miércoles · <b>B01–B10</b> jueves · <b>C01–C10</b> viernes · <b>D01–D10</b> sábado<br>
Posts del día: <b>F5</b> lunes · <b>F6</b> martes · <b>F1</b> miércoles · <b>F2</b> jueves · <b>F3</b> viernes · <b>F4</b> sábado</div></div>"""]
n = 1
for dia, *_ in DIAS:
    fs = [h for d, h in fichas if d == dia]
    for parte, trozo in enumerate((fs[:6], fs[6:])):
        n += 1
        pages.append(f"""<div class="pg"><h1>{dia} <b>{"· historias 1 a 6" if parte == 0 else "· historias 7 a 10 y post"}</b></h1>
<div class="sub">Tasa de ejemplo de hoy. Al publicar, el bot usa la tasa del momento.</div><div class="grid">{"".join(trozo)}</div>
<div class="pie"><span>Súper Envíos Today · revisión de diseños de tasas</span><span>{n}</span></div></div>""")
html = f'<!doctype html><html lang="es"><head><meta charset="UTF-8"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
src = W / "revision.html"; src.write_text(html, encoding="utf-8")
out = B.parent / "Revision_disenos_tasas.pdf"
subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--allow-file-access-from-files", "--no-pdf-header-footer",
                "--virtual-time-budget=15000", f"--print-to-pdf={out}", src.as_uri()], capture_output=True, timeout=180)
print("PDF:", out, out.stat().st_size // 1024, "KB")
