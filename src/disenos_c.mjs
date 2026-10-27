// disenos_c.mjs — juego C (viernes): 10 historias nuevas + feed F3 (Chile → Venezuela).
// C01 modelo SET nocturno · C02 hoja de calendario · C03 línea de metro (Chile → Perú) · C04 portada de revista · C05 cafecito (Chile → Colombia)
// C06 letrero de carretera (Perú → Venezuela) · C07 checklist · C08 polaroids (Colombia → Venezuela) · C09 fichas de colores (todos) · C10 semáforo
import { ICONS } from "./icons.mjs";
import { page, sqFlag, CORR, rateTxt, unitLine, recv, fmt, fechaCorta, diaNombre, horario, cierre } from "./disenos.mjs";

const ico = (n, st) => `<div class="ico" style="${st}">${ICONS[n]}</div>`;
const plusses = (l) => l.map(([x, y, s, v = "plus", r = 0]) => ico(v, `left:${x}px;top:${y}px;width:${s}px;height:${s}px;transform:rotate(${r}deg)`)).join("");
const pill = (t = "Superenvios.app", st = "") => `<span class="pill" style="${st}">${t}</span>`;
const person = (f, st) => `<img class="person" src="assets/people/${f}.png" style="${st}">`;
const chev = (c = "#2E8B3E") => `<svg width="46" height="46" viewBox="0 0 24 24"><path d="M8 4l8 8-8 8" fill="none" stroke="${c}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const pair = (c, s = 110, col) => `<div class="pair">${sqFlag(c.a, s)}${chev(col)}${sqFlag(c.b, s)}</div>`;
const amtA = (c, n) => (c.simA ? `${c.simA} ${fmt(n)}` : `${fmt(n)} ${c.ua}`);
const legal = (hh, col = "#fff", bottom = 150) => `<div class="legal" style="color:${col};bottom:${bottom}px">Tasa referencial de las ${hh}; se actualiza cada hora. La final es la de superenvios.app al enviar.</div>`;
const phoneSET = (st) => `<div class="ph" style="${st}"><div class="ph-scr"><img src="assets/logos/iso_blanco.png"></div></div>`;
const foot = (top, t = "superenvios.app") => `<div style="position:absolute;left:0;right:0;top:${top}px;text-align:center">${pill(t)}</div>`;
const MESL = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

// C01 · modelo SET en versión nocturna (verde profundo + panel mostaza)
const c01 = `.bg{position:absolute;inset:0;background:radial-gradient(900px 1100px at 60% 40%,#187D41 0%,#0E5A2C 60%,#0a4321 100%)}
.panel{position:absolute;left:120px;top:440px;width:840px;height:1130px;border-radius:44px;background:#DEA503;box-shadow:18px 22px 0 #9c7400,0 30px 60px rgba(0,0,0,.3)}
.tt{position:absolute;left:180px;top:490px;color:#0E5A2C;line-height:1.15}.tt b{display:block;font-size:68px}.tt span{display:block;font-size:38px;font-weight:600;margin-top:12px}
.box{position:absolute;left:180px;width:720px;background:#fff;border-radius:30px;color:#0E5A2C;box-shadow:0 14px 30px rgba(80,50,0,.2)}
.box .pair{position:absolute;right:30px;top:-46px}
.box b{display:block;font-size:100px;padding:80px 0 0 46px;color:#00913E}.box small{display:block;font-size:30px;color:#5c7a64;padding:8px 46px 40px}`;
export const C01 = (x) => page(1080, 1920, c01, `<div class="bg"></div>
${plusses([[860, 160, 140, "plusW", 10], [70, 300, 100, "plusL", -8]])}
${phoneSET("left:640px;top:150px;width:210px;height:460px;transform:rotate(7deg)")}
<div style="position:absolute;left:90px;top:300px;transform:rotate(-3deg)">${pill("Superenvios.app", "font-size:52px")}</div>
<div class="panel"></div><div class="tt"><b>Tasa de cambio</b><span>${fechaCorta(x.d)} · ${horario(x.d)}</span></div>
<div class="box" style="top:760px">${pair(CORR.CLVE, 120)}<b class="num">${rateTxt(x.Rs.CLVE)}</b><small>Bs por cada 1 CLP · tasa de las ${x.hh}</small></div>
<div class="box" style="top:1150px;padding:34px 46px;font-size:34px;line-height:1.6">${CORR.CLVE.ej.map((n) => `<div style="display:flex;justify-content:space-between"><span>${amtA(CORR.CLVE, n)}</span><b style="font-size:34px;padding:0;display:inline">${recv(CORR.CLVE, x.R.CLVE, n)}</b></div>`).join("")}</div>
${ico("bills", "left:30px;top:1420px;width:300px;height:250px;transform:rotate(10deg)")}
${legal(x.hh, "#cfe3d3", 160)}`);

// C02 · hoja de calendario de pared
const c02 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1000px at 30% 20%,#3a9c52 0%,#2F8F48 55%,#27803e 100%)}
.cal{position:absolute;left:130px;right:130px;top:260px;background:#fff;border-radius:30px;overflow:hidden;box-shadow:0 30px 60px rgba(0,30,10,.35);color:#1F2A22;text-align:center}
.cal .top{background:#E0302B;color:#fff;font-size:46px;padding:30px 0 34px;letter-spacing:.12em;position:relative}
.cal .rings{position:absolute;left:0;right:0;top:-18px;display:flex;justify-content:space-around}.cal .rings i{width:26px;height:56px;border-radius:13px;background:#ccc;box-shadow:inset 0 0 0 6px #999}
.cal .day{font-size:300px;line-height:1;margin:30px 0 0;color:#0E5A2C}.cal .wd{font-size:52px;color:#5c6a60;margin-bottom:30px}
.cal .note{background:#FFF7D6;margin:0 50px 50px;border-radius:20px;padding:30px;transform:rotate(-1.5deg);box-shadow:0 8px 20px rgba(0,0,0,.12)}
.cal .note small{display:block;font-size:30px;color:#8a6a35}.cal .note b{display:block;font-size:64px;color:#00913E;margin-top:8px}`;
export const C02 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c02, `<div class="bg"></div>
${plusses([[900, 180, 110, "plusW", 10], [60, 1560, 90, "plusL"]])}
<div class="cal"><div class="top"><div class="rings"><i></i><i></i><i></i><i></i></div>${MESL[x.d.getUTCMonth()].toUpperCase()} ${x.d.getUTCFullYear()}</div>
<div class="day">${x.d.getUTCDate()}</div><div class="wd">${diaNombre(x.d)}</div>
<div class="note"><small>Anotado para hoy (${x.hh}) · Chile → Venezuela</small><b class="num">${unitLine(c, x.Rs.CLVE)}</b><small>${amtA(c, 100000)} → ${recv(c, r, 100000)}</small></div></div>
${foot(1560, "Envía en superenvios.app")}${legal(x.hh, "#fff", 150)}`); };

// C03 · línea de metro (Chile → Perú)
const c03 = `.bg{position:absolute;inset:0;background:#F4F6F5}
.h{position:absolute;left:80px;right:80px;top:250px;color:#0E5A2C;font-size:72px;line-height:1.1}.h b{color:#D91023}
.line{position:absolute;left:170px;top:560px;width:22px;height:860px;background:#D91023;border-radius:11px}
.st{position:absolute;left:140px;display:flex;align-items:center;gap:40px;color:#1F2A22}
.st i{width:82px;height:82px;border-radius:50%;background:#fff;border:14px solid #D91023;box-sizing:border-box;flex:none}
.st b{display:block;font-size:46px}.st small{display:block;font-size:30px;color:#5c6a60;margin-top:4px}
.res{position:absolute;left:340px;right:80px;top:1000px;background:#0E5A2C;color:#fff;border-radius:30px;padding:30px 36px}
.res small{display:block;font-size:28px;opacity:.85}.res b{display:block;font-size:68px;color:#FCE27A;margin:6px 0}`;
export const C03 = (x) => { const c = CORR.CLPE, r = x.R.CLPE; return page(1080, 1920, c03, `<div class="bg"></div>
${plusses([[900, 1420, 100, "plus", 10]])}
<div class="h">Línea directa a <b>Perú</b>, sin transbordos o escalas</div><div class="line"></div>
<div class="st" style="top:540px"><i></i><div><b>Santiago</b><small>Envías ${amtA(c, 100000)} · ${x.hh}</small></div></div>
<div class="st" style="top:760px"><i></i><div><b>Tasa del día</b><small class="num">${unitLine(c, x.Rs.CLPE)}</small></div></div>
<div class="st" style="top:1340px"><i></i><div><b>Lima</b><small>De 15 minutos a 2 horas</small></div></div>
<div class="res"><small>Tu familia recibe</small><b class="num">${recv(c, r, 100000)}</b><small>Comisión del servicio incluida en la tasa</small></div>
<div style="position:absolute;right:80px;top:540px;display:flex;gap:10px">${sqFlag("CL", 84)}${sqFlag("PE", 84)}</div>
${foot(1560)}${legal(x.hh, "#5c6a60", 150)}`); };

// C04 · portada de revista con persona
const c04 = `.bg{position:absolute;inset:0;background:linear-gradient(180deg,#DEA503 0%,#f2bd1c 100%)}
.mast{position:absolute;left:60px;right:60px;top:220px;font-size:200px;line-height:.9;color:#0E5A2C;letter-spacing:-6px}
.ed{position:absolute;right:60px;top:240px;text-align:right;font-size:26px;color:#0E5A2C;line-height:1.4}
.hl{position:absolute;left:60px;top:470px;width:520px;color:#fff;text-shadow:0 4px 0 rgba(14,90,44,.45)}
.hl small{display:block;font-size:34px;color:#0E5A2C;text-shadow:none}.hl b{display:inline-block;white-space:nowrap;font-size:80px;line-height:1;margin:12px 0 4px;background:#EAF5E4;color:#00913E;text-shadow:none;border:3px solid #CFE6C4;border-radius:22px;padding:10px 24px 16px}
.hl p{font-size:36px;line-height:1.3;color:#0E5A2C;text-shadow:none;margin-top:16px}
.tag{position:absolute;left:60px;top:1060px;width:440px;background:#E0302B;color:#fff;border-radius:26px;padding:24px 30px;font-size:34px;line-height:1.3;transform:rotate(-3deg)}`;
export const C04 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c04, `<div class="bg"></div>
<div class="mast">TASA</div><div class="ed">TASA DEL ${fechaCorta(x.d).toUpperCase()}<br>${x.hh} · CHILE → VENEZUELA</div>
${person("2JfOT9e3uZg", "right:-80px;bottom:0;height:1250px")}
<div class="hl"><small>LA TASA DE HOY</small><b class="num">${rateTxt(x.Rs.CLVE)} Bs</b><p>por cada 1 CLP.<br>Con ${amtA(c, 50000)} tu familia recibe ${recv(c, r, 50000)}.</p></div>
<div class="tag">Comisión del servicio incluida en la tasa · de 15 min a 2 h</div>
${foot(1320, "superenvios.app").replace("text-align:center", "text-align:left;padding-left:60px")}${legal(x.hh, "#0E5A2C", 140).replace('class="legal" style="', 'class="legal" style="right:470px;text-align:left;')}`); };

// C05 · cafecito (Chile → Colombia)
const c05 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1000px at 50% 30%,#6b4226 0%,#4a2c18 70%,#3a2213 100%)}
.h{position:absolute;left:80px;right:80px;top:250px;font-size:74px;line-height:1.1;color:#FFF4E0}.h b{color:#FCD116}
.cup{position:absolute;left:250px;top:760px;width:520px;height:420px;background:#fff;border-radius:0 0 200px 200px;box-shadow:0 30px 50px rgba(0,0,0,.4)}
.cup:after{content:"";position:absolute;right:-120px;top:70px;width:150px;height:170px;border:34px solid #fff;border-left:0;border-radius:0 90px 90px 0}
.cup .in{position:absolute;left:30px;right:30px;top:0;height:70px;background:#6b3a1c;border-radius:0 0 50% 50%}
.cup .t{position:absolute;left:0;right:0;top:120px;text-align:center;color:#0E5A2C}.cup .t small{display:block;font-size:28px;color:#6b4226}.cup .t b{display:block;font-size:44px;margin-top:6px;white-space:nowrap}
.plate{position:absolute;left:180px;top:1170px;width:720px;height:60px;border-radius:50%;background:#f1e8dc;box-shadow:0 20px 30px rgba(0,0,0,.35)}
.steam{position:absolute;left:330px;top:560px;width:360px;height:200px}
.ex{position:absolute;left:80px;right:80px;top:1290px;text-align:center;color:#FFF4E0;font-size:40px}.ex b{color:#FCD116}`;
export const C05 = (x) => { const c = CORR.CLCO, r = x.R.CLCO; return page(1080, 1920, c05, `<div class="bg"></div>
<div class="h">Un cafecito y la tasa a <b>Colombia</b> ☕</div>
<svg class="steam" viewBox="0 0 360 200"><path d="M80 190 C 40 140, 120 110, 80 50 M180 190 C 140 140, 220 110, 180 40 M280 190 C 240 140, 320 110, 280 50" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="12" stroke-linecap="round"/></svg>
<div class="plate"></div><div class="cup"><div class="in"></div><div class="t"><small>Tasa de las ${x.hh}</small><b class="num">${unitLine(c, x.Rs.CLCO)}</b><div style="display:flex;justify-content:center;gap:8px;margin-top:16px">${sqFlag("CL", 70)}${sqFlag("CO", 70)}</div></div></div>
<div class="ex">${amtA(c, 100000)} → <b class="num">${recv(c, r, 100000)}</b></div>
${foot(1440)}${legal(x.hh, "#e9dccb", 150)}`); };

// C06 · letrero de carretera (Perú → Venezuela)
const c06 = `.bg{position:absolute;inset:0;background:linear-gradient(180deg,#8ecae6 0%,#cfe9f5 55%,#6fae57 55%,#4f8f3c 100%)}
.road{position:absolute;left:340px;right:340px;top:1056px;bottom:0;background:#555;clip-path:polygon(45% 0,55% 0,100% 100%,0 100%)}
.post{position:absolute;top:900px;width:24px;height:400px;background:#777}
.sign{position:absolute;left:70px;right:70px;top:300px;background:#00733A;border:10px solid #fff;outline:6px solid #00733A;border-radius:26px;color:#fff;padding:40px 50px;box-shadow:0 20px 40px rgba(0,0,0,.25)}
.row{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0;border-bottom:4px solid rgba(255,255,255,.5)}.row:last-child{border:0}
.row .n{font-size:56px}.row .v{font-size:56px;color:#FCE27A}.row small{font-size:28px;display:block;opacity:.85}`;
export const C06 = (x) => { const c = CORR.PEVE, r = x.R.PEVE; return page(1080, 1920, c06, `<div class="bg"></div><div class="road"></div>
<div class="post" style="left:200px"></div><div class="post" style="right:200px"></div>
<div class="sign"><div class="row"><div style="display:flex;gap:12px;align-items:center">${sqFlag("PE", 90)}<span style="font-size:60px">→</span>${sqFlag("VE", 90)}</div><span class="n">Ruta del día</span></div>
<div class="row"><span class="n">VENEZUELA<small>desde Perú · ${x.hh}</small></span><span class="v num">${rateTxt(x.Rs.PEVE)} Bs</span></div>
<div class="row"><span class="n">${amtA(c, 100)}<small>tu familia recibe</small></span><span class="v num">${recv(c, r, 100)}</span></div>
<div class="row"><span class="n" style="font-size:34px">Llegada: de 15 min a 2 h</span><span style="font-size:60px">⬆</span></div></div>
${foot(1580)}${legal(x.hh, "#fff", 150)}`); };

// C07 · checklist antes de enviar (Chile → Venezuela)
const c07 = `.bg{position:absolute;inset:0;background:#FFF9EC}
.h{position:absolute;left:80px;right:80px;top:250px;color:#0E5A2C;font-size:76px;line-height:1.08}.h b{color:#00913E}
.list{position:absolute;left:80px;right:80px;top:560px;display:flex;flex-direction:column;gap:26px}
.it{display:flex;align-items:center;gap:30px;background:#fff;border-radius:30px;padding:28px 32px;box-shadow:0 12px 26px rgba(60,50,0,.1);color:#1F2A22}
.it i{width:84px;height:84px;border-radius:24px;background:#00913E;display:grid;place-items:center;flex:none;font-style:normal;font-size:52px;color:#fff}
.it b{display:block;font-size:42px}.it small{display:block;font-size:32px;color:#5c6a60;margin-top:4px}
.disc{position:absolute;left:120px;right:120px;top:1340px;background:#FCEFC2;border:3px dashed #DEA503;border-radius:22px;padding:20px 28px;text-align:center;font-size:28px;color:#7a5a00}`;
export const C07 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c07, `<div class="bg"></div>
${plusses([[930, 460, 90, "plus", 10]])}
<div class="h">Checklist para enviar <b>hoy</b></div>
<div class="list">
<div class="it"><i>✓</i><div><b>Revisa la tasa</b><small class="num" style="display:inline-block;margin-top:8px;font-size:40px;font-weight:700;color:#0E5A2C;background:#FCEFC2;border-radius:12px;padding:4px 16px 8px">${unitLine(c, x.Rs.CLVE)}</small></div></div>
<div class="it"><i>✓</i><div><b>Elige el monto</b><small>${amtA(c, 100000)} → ${recv(c, r, 100000)}</small></div></div>
<div class="it"><i>✓</i><div><b>Agrega a tu destinatario</b><small>queda guardado para la próxima</small></div></div>
<div class="it"><i>✓</i><div><b>Transfiere y adjunta el comprobante</b><small>de 15 minutos a 2 horas</small></div></div>
</div>
<div class="disc">Comisión del servicio incluida en la tasa</div>
${foot(1560, "Envía en superenvios.app")}${legal(x.hh, "#5c6a60", 150)}`); };

// C08 · polaroids (Colombia → Venezuela)
const c08 = `.bg{position:absolute;inset:0;background:#E9E2D3}
.cork{position:absolute;inset:0;background:radial-gradient(#d6c9ad 2px,transparent 3px) 0 0/34px 34px}
.h{position:absolute;left:80px;right:80px;top:240px;color:#3b2f1c;font-size:70px;line-height:1.1}.h b{color:#00913E}
.pol{position:absolute;width:420px;background:#fff;padding:26px 26px 90px;box-shadow:0 20px 40px rgba(0,0,0,.25)}
.pol .img{height:360px;display:grid;place-items:center;border-radius:4px}
.pol span{position:absolute;left:0;right:0;bottom:24px;text-align:center;font-size:38px;color:#3b2f1c}
.pin{position:absolute;left:50%;top:-14px;width:34px;height:34px;margin-left:-17px;border-radius:50%;background:#E0302B;box-shadow:0 4px 6px rgba(0,0,0,.3)}
.note{position:absolute;left:110px;right:110px;top:1180px;background:#FFF7A8;padding:34px 40px;transform:rotate(1.5deg);box-shadow:0 12px 24px rgba(0,0,0,.18);color:#3b2f1c}
.note small{display:block;font-size:30px}.note b{display:block;font-size:72px;color:#00913E;margin:8px 0}`;
export const C08 = (x) => { const c = CORR.COVE, r = x.R.COVE; return page(1080, 1920, c08, `<div class="bg"></div><div class="cork"></div>
<div class="h">De Colombia a Venezuela, <b>con cariño</b></div>
<div class="pol" style="left:90px;top:520px;transform:rotate(-6deg)"><i class="pin"></i><div class="img" style="background:#FCD116">${sqFlag("CO", 200)}</div><span>Medellín</span></div>
<div class="pol" style="right:90px;top:560px;transform:rotate(5deg)"><i class="pin"></i><div class="img" style="background:#00247D">${sqFlag("VE", 200)}</div><span>Maracaibo</span></div>
<div class="note"><small>Con ${amtA(c, 100000)} tu familia recibe</small><b class="num">${recv(c, r, 100000)}</b><small class="num">${unitLine(c, x.Rs.COVE)} · ${x.hh}</small></div>
${foot(1570)}${legal(x.hh, "#5a4a30", 150)}`); };

// C09 · fichas de colores con los 5 corredores
const c09 = `.bg{position:absolute;inset:0;background:#0E5A2C}
.h{position:absolute;left:70px;right:70px;top:240px;font-size:70px;line-height:1.1}.h small{display:block;font-size:30px;color:#8CC573;margin-top:10px}
.grid{position:absolute;left:60px;right:60px;top:480px;display:grid;grid-template-columns:1fr 1fr;gap:26px}
.t{border-radius:30px;padding:28px 30px;color:#0E5A2C;min-height:300px;position:relative}
.t .f{display:flex;gap:8px}.t small{display:block;font-size:28px;margin-top:16px}.t b{display:block;font-size:52px;margin-top:6px;word-break:break-all}.t i{font-style:normal;font-size:24px;opacity:.8}
.t.w{grid-column:span 2}`;
export const C09 = (x) => { const col = ["#FCE27A", "#F8B4AE", "#B5E3C1", "#BFD7F5", "#F4F1E6"]; return page(1080, 1920, c09, `<div class="bg"></div>
<div class="h">Elige tu ruta de hoy<small>Tasas de las ${x.hh} · ${diaNombre(x.d)} ${fechaCorta(x.d)}</small></div>
<div class="grid">${["CLVE", "CLPE", "CLCO", "PEVE", "COVE"].map((k, i) => { const c = CORR[k]; return `<div class="t${i === 0 ? " w" : ""}" style="background:${col[i]}"><div class="f">${sqFlag(c.a, 70)}${sqFlag(c.b, 70)}</div><small>${c.an} a ${c.bn}</small><b class="num">${rateTxt(x.Rs[k])} ${c.ub}</b><i>por 1 ${c.ua}</i></div>`; }).join("")}</div>
${foot(1600)}${legal(x.hh, "#cfe3d3", 140)}`); };

// C10 · semáforo en verde hasta el cierre
const c10 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1100px at 70% 25%,#3a9c52 0%,#2F8F48 55%,#27803e 100%)}
.tl{position:absolute;left:90px;top:300px;width:260px;height:720px;background:#1F2A22;border-radius:60px;display:flex;flex-direction:column;align-items:center;justify-content:space-around;padding:40px 0;box-shadow:0 30px 50px rgba(0,30,10,.4)}
.tl i{width:170px;height:170px;border-radius:50%;background:#3a3a3a}.tl i.on{background:radial-gradient(circle at 40% 35%,#b8ffb0,#22c55e 60%,#15803d);box-shadow:0 0 60px rgba(34,197,94,.8)}
.h{position:absolute;left:420px;right:70px;top:320px;font-size:78px;line-height:1.05}.h b{color:#DEA503}
.p{position:absolute;left:420px;right:70px;top:660px;font-size:36px;line-height:1.35}
.rt{position:absolute;left:90px;right:90px;top:1110px;background:#fff;color:#0E5A2C;border-radius:32px;padding:36px 44px}
.rt small{display:block;font-size:30px;color:#3b6b48}.rt b{display:block;font-size:70px;color:#00913E;margin:6px 0}`;
export const C10 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c10, `<div class="bg"></div>
<div class="tl"><i></i><i></i><i class="on"></i></div>
<div class="h">Todavía en <b>verde</b></div><div class="p">Hoy recibimos envíos hasta las <b>${cierre(x.d)}</b>. ¡Aprovecha!</div>
<div class="rt"><small>Tasa de las ${x.hh} · Chile → Venezuela</small><b class="num">${unitLine(c, x.Rs.CLVE)}</b><small>${amtA(c, 100000)} → ${recv(c, r, 100000)}</small></div>
${foot(1545, "Envía en superenvios.app")}${legal(x.hh, "#fff", 150)}`); };

// F3 · feed (Chile → Venezuela): afiche tipográfico con persona en círculo
const cf3 = `.bg{position:absolute;inset:0;background:#0E5A2C}
.top{position:absolute;left:70px;top:66px;right:70px;display:flex;justify-content:space-between;align-items:center}.top img{height:78px}.top span{font-size:28px;text-align:right;line-height:1.3}
.k{position:absolute;left:70px;top:230px;font-size:40px;color:#8CC573}
.big{position:absolute;left:62px;top:280px;font-size:200px;line-height:1;color:#DEA503;letter-spacing:-6px}
.u{position:absolute;left:70px;top:500px;font-size:44px}
.ci{position:absolute;right:60px;top:600px;width:440px;height:440px;border-radius:50%;background:#DEA503;overflow:hidden}
.ci img{position:absolute;left:50%;bottom:-20px;height:520px;transform:translateX(-50%)}
.ej{position:absolute;left:70px;top:640px;width:500px;display:flex;flex-direction:column;gap:16px}
.ej div{background:rgba(255,255,255,.1);border-radius:20px;padding:18px 24px;display:flex;justify-content:space-between;font-size:30px}.ej b{color:#FCE27A}
.ft{position:absolute;left:70px;right:70px;top:1150px;display:flex;justify-content:space-between;align-items:center}.ft span{font-size:26px;max-width:520px;line-height:1.35}`;
export const F3 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1350, cf3, `<div class="bg"></div>
${plusses([[930, 200, 90, "plusW", 10]])}
<div class="top"><img src="assets/logos/tipo_blanco.png"><span>${diaNombre(x.d)} ${fechaCorta(x.d)}<br>Tasa de las ${x.hh}</span></div>
<div class="k">Chile → Venezuela · 1 CLP =</div><div class="big num">${rateTxt(x.Rs.CLVE)}</div><div class="u">bolívares</div>
<div class="ci"><img src="assets/people/YiMUmTMcN_c.png"></div>
<div class="ej">${[...c.ej, 200000].map((n) => `<div><span>${amtA(c, n)}</span><b class="num">${recv(c, r, n)}</b></div>`).join("")}</div>
<div class="ft"><span>Comisión del servicio incluida en la tasa · de 15 minutos a 2 horas</span>${pill("superenvios.app", "font-size:36px")}</div>`); };

export const STORIES_C = { C01, C02, C03, C04, C05, C06, C07, C08, C09, C10 };
export const FEEDS_C = { F3 };
