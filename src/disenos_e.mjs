// disenos_e.mjs — juego E (lunes): 10 historias nuevas + feed F5 (Chile → Venezuela).
// E01 modelo SET en diagonal · E02 noticiero de TV · E03 caja de encomienda (Perú) · E04 persona "¡arrancó la semana!" · E05 billete gigante (Colombia)
// E06 videollamada (Perú → Venezuela) · E07 etiqueta colgante · E08 puente (Colombia → Venezuela) · E09 menú de restaurante (todos) · E10 atardecer
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

// E01 · modelo SET con fondo en diagonal (verde/mostaza) y panel blanco
const c01 = `.bg{position:absolute;inset:0;background:linear-gradient(155deg,#2F8F48 0 52%,#DEA503 52% 100%)}
.panel{position:absolute;left:110px;top:520px;width:860px;height:1070px;border-radius:44px;background:#fff;box-shadow:0 30px 60px rgba(0,40,15,.25)}
.tt{position:absolute;left:170px;top:570px;color:#187D41;line-height:1.15}.tt b{display:block;font-size:68px}.tt span{display:block;font-size:36px;margin-top:10px;color:#5c7a64}
.box{position:absolute;left:170px;width:740px;border-radius:30px}
.box .pair{position:absolute;right:30px;top:-40px}
.box b{display:block;font-size:104px;padding:90px 0 0 44px;color:#00913E}.box small{display:block;font-size:30px;color:#5c7a64;padding:8px 44px 36px}`;
export const E01 = (x) => page(1080, 1920, c01, `<div class="bg"></div>
${plusses([[120, 170, 130, "plusW", -8], [880, 300, 100, "plusL", 10]])}
${phoneSET("left:420px;top:120px;width:220px;height:470px;transform:rotate(4deg)")}
<div style="position:absolute;left:80px;top:380px;transform:rotate(-3deg)">${pill("Superenvios.app", "font-size:46px")}</div>
<div class="panel"></div><div class="tt"><b>Tasa de cambio</b><span>${fechaCorta(x.d)} · ${horario(x.d)}</span></div>
<div class="box" style="top:830px;background:#F1F8EE">${pair(CORR.CLVE, 116)}<b class="num">${rateTxt(x.Rs.CLVE)}</b><small>Bs por cada 1 CLP · tasa de las ${x.hh}</small></div>
<div class="box" style="top:1290px;padding:30px 44px;font-size:33px;line-height:1.6;color:#187D41;background:#FFF9EC">${CORR.CLVE.ej.map((n) => `<div style="display:flex;justify-content:space-between"><span>${amtA(CORR.CLVE, n)}</span><b style="font-size:33px;padding:0;display:inline;color:#0E5A2C">${recv(CORR.CLVE, x.R.CLVE, n)}</b></div>`).join("")}</div>
${ico("bills", "left:20px;top:1500px;width:280px;height:230px;transform:rotate(12deg)")}
${legal(x.hh, "#0E5A2C", 150)}`);

// E02 · noticiero de TV con "última hora"
const c02 = `.bg{position:absolute;inset:0;background:#0b1d14}
.tv{position:absolute;left:50px;right:50px;top:300px;height:980px;border-radius:30px;background:#111;padding:26px;box-shadow:0 30px 60px rgba(0,0,0,.5),inset 0 0 0 6px #2a2a2a}
.scr{position:relative;height:100%;border-radius:16px;overflow:hidden;background:radial-gradient(800px 600px at 60% 30%,#2a9a52,#0E5A2C 70%)}
.live{position:absolute;left:30px;top:30px;background:#E0302B;color:#fff;font-size:28px;padding:8px 16px;border-radius:8px;letter-spacing:.08em}
.logo{position:absolute;right:30px;top:24px;height:60px}
.mid{position:absolute;left:50px;right:50px;top:170px;color:#fff}.mid small{display:block;font-size:34px;opacity:.85}.mid b{display:block;font-size:120px;color:#FCE27A;line-height:1;margin:16px 0}
.lt{position:absolute;left:0;right:0;bottom:90px;background:#fff;color:#0E5A2C;padding:22px 30px;font-size:36px}.lt b{color:#E0302B}
.tk{position:absolute;left:0;right:0;bottom:0;height:90px;background:#E0302B;color:#fff;font-size:30px;display:flex;align-items:center;padding:0 30px;white-space:nowrap;overflow:hidden}`;
export const E02 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c02, `<div class="bg"></div>
<div class="tv"><div class="scr"><span class="live">● EN VIVO · ${x.hh}</span><img class="logo" src="assets/logos/tipo_blanco.png">
<div class="mid"><small>NotiSET · Chile → Venezuela</small><b class="num">${rateTxt(x.Rs.CLVE)}</b><small>bolívares por cada 1 CLP</small>
<div style="display:flex;gap:10px;margin-top:30px">${sqFlag("CL", 90)}${sqFlag("VE", 90)}</div></div>
<div class="lt"><b>ÚLTIMA HORA:</b> con ${amtA(c, 100000)} tu familia recibe ${recv(c, r, 100000)}</div>
<div class="tk">Comisión del servicio incluida en la tasa · de 15 min a 2 h</div></div></div>
${foot(1380, "Envía en superenvios.app")}${legal(x.hh, "#9fc9ad", 150)}`); };

// E03 · caja de encomienda (Chile → Perú)
const c03 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1000px at 30% 20%,#3a9c52 0%,#2F8F48 55%,#27803e 100%)}
.h{position:absolute;left:80px;right:80px;top:250px;font-size:74px;line-height:1.08}.h b{color:#DEA503}
.box3d{position:absolute;left:150px;top:560px;width:780px;height:760px}
.lbl{position:absolute;left:250px;top:780px;width:500px;background:#fff;border-radius:14px;padding:28px 30px;color:#1F2A22;transform:rotate(-3deg);box-shadow:0 10px 20px rgba(0,0,0,.2)}
.lbl small{display:block;font-size:26px;color:#5c6a60}.lbl b{display:block;font-size:44px;margin:4px 0 14px}.lbl .r{font-size:30px;color:#D91023}`;
export const E03 = (x) => { const c = CORR.CLPE, r = x.R.CLPE; return page(1080, 1920, c03, `<div class="bg"></div>
${plusses([[900, 220, 110, "plusW", 10]])}
<div class="h">Tu encomienda de cariño va a <b>Perú</b></div>
<svg class="box3d" viewBox="0 0 780 760"><path d="M90 220 L390 90 L690 220 L390 350 Z" fill="#e0b16a"/><path d="M90 220 L390 350 L390 720 L90 590 Z" fill="#c58f45"/><path d="M690 220 L390 350 L390 720 L690 590 Z" fill="#d9a258"/>
<path d="M240 155 L540 285 L540 360 L240 230 Z" fill="#f3d59a" opacity=".8"/><path d="M390 350 L390 720" stroke="#a87634" stroke-width="6"/></svg>
<div class="lbl"><small>DESTINO</small><b>Lima, Perú ${""}</b><small>ENVÍAS</small><b class="num">${amtA(c, 100000)}</b><small>RECIBEN</small><b class="num" style="color:#D91023">${recv(c, r, 100000)}</b><div class="r num">${unitLine(c, x.Rs.CLPE)} · ${x.hh}</div></div>
<div style="position:absolute;left:780px;top:640px;display:flex;gap:8px">${sqFlag("PE", 90)}</div>
${foot(1430)}${legal(x.hh, "#fff", 150)}`); };

// E04 · persona "¡Arrancó la semana!"
const c04 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1000px at 70% 30%,#f2bd1c 0%,#DEA503 60%,#c99402 100%)}
.burst{position:absolute;left:60px;top:240px;width:640px;height:460px}
.bt{position:absolute;left:60px;top:240px;width:640px;height:460px;box-sizing:border-box;padding:20px 120px 0;display:flex;align-items:center;justify-content:center;text-align:center;font-size:58px;line-height:1.08;color:#fff}
.rt{position:absolute;left:70px;top:760px;width:620px;background:#fff;border-radius:32px;padding:34px 38px;color:#0E5A2C;z-index:2}
.rt small{display:block;font-size:30px;color:#3b6b48}.rt b{display:block;font-size:52px;color:#00913E;margin:8px 0;white-space:nowrap}`;
export const E04 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c04, `<div class="bg"></div>
<svg class="burst" viewBox="0 0 640 460" style="overflow:visible;filter:drop-shadow(0 22px 18px rgba(90,10,10,.38))"><defs><radialGradient id="e04g" cx="38%" cy="28%" r="80%"><stop offset="0" stop-color="#ff6a5c"/><stop offset=".45" stop-color="#E0302B"/><stop offset="1" stop-color="#9c1414"/></radialGradient></defs><path d="M320 10 L370 120 L490 60 L460 180 L600 190 L490 270 L590 370 L450 360 L430 450 L340 370 L240 450 L220 350 L60 380 L150 270 L30 190 L170 170 L130 50 L260 120 Z" fill="#9c1414" stroke="#9c1414" stroke-width="34" stroke-linejoin="round" transform="translate(0 10)"/><path d="M320 10 L370 120 L490 60 L460 180 L600 190 L490 270 L590 370 L450 360 L430 450 L340 370 L240 450 L220 350 L60 380 L150 270 L30 190 L170 170 L130 50 L260 120 Z" fill="url(#e04g)" stroke="url(#e04g)" stroke-width="30" stroke-linejoin="round"/></svg>
<div class="bt">¡Arrancó la semana!</div>
${person("KpoM_OCfuP8", "right:-130px;bottom:0;height:1120px")}
<div class="rt"><small>Tasa de las ${x.hh} · Chile → Venezuela</small><b class="num">${unitLine(c, x.Rs.CLVE)}</b><small>${amtA(c, 100000)} → ${recv(c, r, 100000)}</small></div>
<div style="position:absolute;left:70px;top:1120px">${pill("superenvios.app")}</div>
${legal(x.hh, "#0E5A2C", 140).replace('class="legal" style="', 'class="legal" style="right:470px;text-align:left;')}`); };

// E05 · billete gigante (Chile → Colombia)
const c05 = `.bg{position:absolute;inset:0;background:#FFF9EC}
.h{position:absolute;left:80px;right:80px;top:250px;color:#0E5A2C;font-size:72px;line-height:1.08}.h b{color:#003893}
.bill{position:absolute;left:70px;right:70px;top:560px;height:620px;border-radius:30px;background:linear-gradient(135deg,#8fd18a,#2f9a4d);box-shadow:0 30px 60px rgba(0,60,20,.3);padding:40px;transform:rotate(-3deg)}
.bill .in{position:relative;height:100%;border:6px solid rgba(255,255,255,.7);border-radius:20px;display:grid;grid-template-columns:1fr 280px;align-items:center;padding:30px;color:#fff}
.bill .in small{display:block;font-size:30px;letter-spacing:.1em}.bill .in b{display:block;font-size:92px;line-height:1;margin:14px 0}
.bill .seal{width:240px;height:240px;border-radius:50%;background:rgba(255,255,255,.9);display:grid;place-items:center}
.res{position:absolute;left:80px;right:80px;top:1260px;text-align:center;color:#0E5A2C;font-size:40px}.res b{color:#003893}`;
export const E05 = (x) => { const c = CORR.CLCO, r = x.R.CLCO; return page(1080, 1920, c05, `<div class="bg"></div>
${plusses([[920, 220, 100, "plus", 10]])}
<div class="h">Así rinde tu plata en <b>Colombia</b> hoy</div>
<div class="bill"><div class="in"><div><small>SÚPER ENVÍOS TODAY · ${x.hh}</small><b class="num">${rateTxt(x.Rs.CLCO)}</b><small>COP por cada 1 CLP</small></div>
<div class="seal"><div style="display:flex;gap:6px">${sqFlag("CL", 80)}${sqFlag("CO", 80)}</div></div></div></div>
<div class="res">${amtA(c, 100000)} → <b class="num">${recv(c, r, 100000)}</b></div>
${foot(1420)}${legal(x.hh, "#5c6a60", 150)}`); };

// E06 · videollamada con la familia (Perú → Venezuela)
const c06 = `.bg{position:absolute;inset:0;background:linear-gradient(180deg,#0E5A2C,#187D41)}
.ph2{position:absolute;left:180px;top:230px;width:720px;height:1300px;border-radius:70px;background:#111;padding:22px;box-shadow:0 40px 70px rgba(0,0,0,.45)}
.vs{position:relative;height:100%;border-radius:52px;overflow:hidden;background:linear-gradient(170deg,#3a9c52,#2F8F48)}
.vs .who{position:absolute;left:0;right:0;top:70px;text-align:center;color:#fff}.vs .who b{display:block;font-size:52px}.vs .who span{font-size:30px;opacity:.85}
.av{position:absolute;left:50%;top:230px;width:320px;height:320px;margin-left:-160px;border-radius:50%;background:#DEA503;display:grid;place-items:center;font-size:150px}
.card{position:absolute;left:40px;right:40px;top:640px;background:#fff;border-radius:30px;padding:30px 34px;color:#0E5A2C}
.card small{display:block;font-size:28px;color:#3b6b48}.card b{display:block;font-size:72px;color:#00913E;margin:6px 0}
.btns{position:absolute;left:0;right:0;bottom:60px;display:flex;justify-content:center;gap:50px}
.btns i{width:120px;height:120px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:52px}`;
export const E06 = (x) => { const c = CORR.PEVE, r = x.R.PEVE; return page(1080, 1920, c06, `<div class="bg"></div>
<div class="ph2"><div class="vs"><div class="who"><b>Mamá 💚</b><span>Valencia · videollamada</span></div><div class="av">👵</div>
<div class="card"><small>Desde Perú le mandaste</small><b class="num">${recv(c, r, 100)}</b><small>con ${amtA(c, 100)} · <span class="num">${unitLine(c, x.Rs.PEVE)}</span></small></div>
<div class="btns"><i style="background:#E0302B">📞</i><i style="background:rgba(255,255,255,.25)">🎤</i><i style="background:rgba(255,255,255,.25)">📷</i></div></div></div>
<div style="position:absolute;right:120px;top:270px;display:flex;gap:6px;z-index:3">${sqFlag("PE", 70)}${sqFlag("VE", 70)}</div>
${foot(1590)}${legal(x.hh, "#cfe3d3", 130)}`); };

// E07 · etiqueta colgante de vitrina (Chile → Venezuela)
const c07 = `.bg{position:absolute;inset:0;background:#F4F1E8}
.str{position:absolute;left:540px;top:0;width:6px;height:520px;background:#8a6a35}
.tag{position:absolute;left:190px;top:470px;width:700px;height:900px;background:#2F8F48;border-radius:40px;clip-path:polygon(50% 0,100% 12%,100% 100%,0 100%,0 12%);color:#fff;text-align:center;padding-top:200px;box-shadow:0 30px 60px rgba(0,40,15,.3)}
.tag .hole{position:absolute;left:50%;top:100px;width:60px;height:60px;margin-left:-30px;border-radius:50%;background:#F4F1E8}
.tag small{display:block;font-size:36px;letter-spacing:.1em}.tag b{display:block;font-size:120px;line-height:1;margin:24px 0;color:#FCE27A}
.tag p{font-size:34px;line-height:1.4;opacity:.95}`;
export const E07 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c07, `<div class="bg"></div><div class="str"></div>
<div class="tag"><div class="hole"></div><small>PRECIO DE HOY · ${x.hh}</small><div style="display:flex;justify-content:center;gap:10px;margin-top:20px">${sqFlag("CL", 90)}${sqFlag("VE", 90)}</div>
<b class="num">${rateTxt(x.Rs.CLVE)}</b><p>bolívares por cada 1 CLP<br>${amtA(c, 100000)} → ${recv(c, r, 100000)}<br><br>Comisión del servicio incluida en la tasa</p></div>
${plusses([[80, 300, 110, "plus", -10], [890, 1460, 100, "plusL", 10]])}
${foot(1460)}${legal(x.hh, "#5c6a60", 150)}`); };

// E08 · puente entre Colombia y Venezuela
const c08 = `.bg{position:absolute;inset:0;background:linear-gradient(180deg,#9fd3f0 0%,#e3f3fb 55%,#3b7fb5 55%,#2a6496 100%)}
.h{position:absolute;left:80px;right:80px;top:250px;font-size:72px;line-height:1.08;color:#0E3B5C}.h b{color:#00913E}
.br{position:absolute;left:0;top:700px;width:1080px;height:420px}
.res{position:absolute;left:90px;right:90px;top:1180px;background:#fff;border-radius:32px;padding:34px 42px;color:#0E5A2C;box-shadow:0 18px 36px rgba(0,40,70,.25)}
.res small{display:block;font-size:30px;color:#3b6b48}.res b{display:block;font-size:84px;color:#00913E;margin:6px 0}`;
export const E08 = (x) => { const c = CORR.COVE, r = x.R.COVE; return page(1080, 1920, c08, `<div class="bg"></div>
<div class="h">Un puente directo de <b>Colombia a Venezuela</b></div>
<svg class="br" viewBox="0 0 1080 420"><path d="M60 300 Q540 40 1020 300" fill="none" stroke="#E0302B" stroke-width="22"/>
${Array.from({ length: 11 }, (_, i) => { const t = (i + 1) / 12, X = 60 + 960 * t, Y = (1 - t) * (1 - t) * 300 + 2 * (1 - t) * t * 40 + t * t * 300; return `<line x1="${X}" y1="${Y}" x2="${X}" y2="300" stroke="#E0302B" stroke-width="7"/>`; }).join("")}
<rect x="0" y="296" width="1080" height="34" fill="#555"/><rect x="40" y="300" width="40" height="120" fill="#777"/><rect x="1000" y="300" width="40" height="120" fill="#777"/></svg>
<div style="position:absolute;left:60px;top:850px">${sqFlag("CO", 120)}</div><div style="position:absolute;right:60px;top:850px">${sqFlag("VE", 120)}</div>
<div class="res"><small>Si envías ${amtA(c, 100000)}, tu familia recibe</small><b class="num">${recv(c, r, 100000)}</b><small class="num">${unitLine(c, x.Rs.COVE)} · ${x.hh}</small></div>
${foot(1560)}${legal(x.hh, "#e3f3fb", 120)}`); };

// E09 · menú de restaurante con los 5 corredores
const c09 = `.bg{position:absolute;inset:0;background:#3b2a1d}
.menu{position:absolute;left:80px;right:80px;top:260px;bottom:520px;background:#FFF8EA;border-radius:20px;padding:60px 56px;color:#3b2a1d;box-shadow:0 30px 60px rgba(0,0,0,.45);outline:3px solid #d8c7a5;outline-offset:-24px}
.menu h3{text-align:center;font-size:66px;letter-spacing:.06em}.menu .sub{text-align:center;font-size:28px;color:#8a6a35;margin:8px 0 34px}
.it{display:grid;grid-template-columns:auto 1fr auto;gap:18px;align-items:end;margin:26px 0}
.it .n{font-size:38px;display:flex;align-items:center;gap:12px}.it .d{border-bottom:4px dotted #c9b48a;height:22px}.it .p{font-size:38px;color:#00913E}
.it small{grid-column:1/4;font-size:24px;color:#8a6a35;margin-top:-12px}`;
export const E09 = (x) => page(1080, 1920, c09, `<div class="bg"></div>
<div class="menu"><h3>MENÚ DE HOY</h3><div class="sub">Tasas de las ${x.hh} · ${diaNombre(x.d)} ${fechaCorta(x.d)}</div>
${["CLVE", "CLPE", "CLCO", "PEVE", "COVE"].map((k) => { const c = CORR[k]; return `<div class="it"><span class="n">${sqFlag(c.a, 54)}${sqFlag(c.b, 54)} ${c.an} a ${c.bn}</span><span class="d"></span><span class="p num">${rateTxt(x.Rs[k])} ${c.ub}</span><small>por 1 ${c.ua}</small></div>`; }).join("")}
<div style="text-align:center;font-size:28px;color:#8a6a35;margin-top:30px">Comisión del servicio incluida en la tasa<br>de 15 minutos a 2 horas</div></div>
${foot(1460)}${legal(x.hh, "#d8c7a5", 150)}`);

// E10 · atardecer: el día se acaba
const c10 = `.bg{position:absolute;inset:0;background:linear-gradient(180deg,#f39c4d 0%,#f6c35a 35%,#e86f4a 62%,#7a3b5e 100%)}
.sun{position:absolute;left:340px;top:820px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,#ffe7a3,#ffb84d)}
.sea{position:absolute;left:0;right:0;top:1020px;bottom:0;background:linear-gradient(180deg,#2F8F48,#0E5A2C)}
.h{position:absolute;left:80px;right:80px;top:250px;font-size:80px;line-height:1.05;color:#fff;text-shadow:0 4px 0 rgba(122,59,94,.35)}.h b{color:#0E5A2C;text-shadow:none}
.rt{position:absolute;left:90px;right:90px;top:560px;background:#fff;border-radius:32px;padding:34px 42px;color:#0E5A2C}
.rt small{display:block;font-size:30px;color:#3b6b48}.rt b{display:block;font-size:68px;color:#00913E;margin:6px 0}`;
export const E10 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c10, `<div class="bg"></div><div class="sun"></div><div class="sea"></div>
<div class="h">Antes de que se ponga el sol, <b>envía</b>: hoy hasta las ${cierre(x.d)}</div>
<div class="rt"><small>Tasa de las ${x.hh} · Chile → Venezuela</small><b class="num">${unitLine(c, x.Rs.CLVE)}</b><small>${amtA(c, 100000)} → ${recv(c, r, 100000)}</small></div>
${foot(1300, "Envía en superenvios.app")}${legal(x.hh, "#e3f2e6", 150)}`); };

// F5 · feed del lunes (Chile → Venezuela): "Lunes" en grande + tabla
const cf5 = `.bg{position:absolute;inset:0;background:#2F8F48}
.wk{position:absolute;left:60px;top:40px;font-size:230px;line-height:1;color:rgba(255,255,255,.12);letter-spacing:-6px}
.top{position:absolute;left:70px;right:70px;top:80px;display:flex;justify-content:space-between;align-items:center}.top img{height:78px}.top span{font-size:28px;text-align:right;line-height:1.3}
.card{position:absolute;left:70px;right:70px;top:290px;background:#fff;border-radius:40px;padding:64px 54px;color:#0E5A2C;display:grid;grid-template-columns:1fr 1.12fr;gap:30px;align-items:center}
.card b{display:block;font-size:100px;color:#00913E;line-height:1}.card small{display:block;font-size:28px;color:#3b6b48;margin-top:10px}
.tb{display:flex;flex-direction:column;gap:16px}.tb div{display:flex;justify-content:space-between;gap:12px;white-space:nowrap;background:#F1F8EE;border-radius:18px;padding:20px 20px;font-size:28px}
.ft{position:absolute;left:70px;right:70px;top:1080px;display:flex;justify-content:space-between;align-items:center}.ft span{font-size:26px;max-width:520px;line-height:1.35}`;
export const F5 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1350, cf5, `<div class="bg"></div><div class="wk">${diaNombre(x.d).toUpperCase()}</div>
${plusses([[960, 250, 80, "plusW", 10], [20, 1240, 70, "plusL"]])}
<div class="top"><img src="assets/logos/tipo_blanco.png"><span>${fechaCorta(x.d)}<br>Tasa de las ${x.hh}</span></div>
<div class="card"><div>${pair(c, 96)}<b class="num" style="margin-top:20px">${rateTxt(x.Rs.CLVE)}</b><small>Bs por cada 1 CLP · Chile → Venezuela</small></div>
<div class="tb">${[...c.ej, 200000].map((n) => `<div><span>${amtA(c, n)}</span><b class="num" style="font-size:28px;display:inline;margin:0;color:#0E5A2C">${recv(c, r, n)}</b></div>`).join("")}</div></div>
<div style="position:absolute;left:70px;right:70px;top:930px;font-size:44px;line-height:1.25">Arranca la semana enviándole a tu familia 💚</div>
<div class="ft"><span>Comisión del servicio incluida en la tasa · de 15 minutos a 2 horas</span>${pill("superenvios.app", "font-size:36px")}</div>`); };

export const STORIES_E = { E01, E02, E03, E04, E05, E06, E07, E08, E09, E10 };
export const FEEDS_E = { F5 };
