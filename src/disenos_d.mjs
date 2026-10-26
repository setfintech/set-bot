// disenos_d.mjs — juego D (sábado, abierto hasta las 15:30): 10 historias nuevas + feed F4 (Venezuela + Colombia + Perú).
// D01 modelo SET blanco "sábado" · D02 notas adhesivas del sábado · D03 cajero automático (Perú) · D04 sábado en familia · D05 camiseta de fútbol (Colombia)
// D06 velocímetro (Perú → Venezuela) · D07 marquesina de cine · D08 avión de papel (Colombia → Venezuela) · D09 tabla de posiciones (todos) · D10 reloj de arena
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

// D01 · modelo SET en blanco, versión sábado
const c01 = `.bg{position:absolute;inset:0;background:#fff}
.ring{position:absolute;left:100px;top:550px;width:880px;height:1080px;border-radius:50px;border:16px solid #2F8F48}
.tt{position:absolute;left:160px;top:600px;color:#187D41;line-height:1.15}.tt b{display:block;font-size:70px}.tt span{display:block;font-size:38px;margin-top:10px;color:#5c7a64}
.sab{position:absolute;right:150px;top:600px;background:#DEA503;color:#0E5A2C;border-radius:20px;padding:14px 22px;font-size:32px;transform:rotate(4deg)}
.box{position:absolute;left:160px;width:760px;background:#2F8F48;border-radius:30px;color:#fff;box-shadow:0 14px 30px rgba(0,40,15,.18)}
.box .pair{position:absolute;left:30px;top:-46px}
.box b{display:block;text-align:center;font-size:104px;padding-top:110px}.box small{display:block;text-align:center;font-size:30px;padding:8px 0 40px;opacity:.9}`;
export const D01 = (x) => page(1080, 1920, c01, `<div class="bg"></div>
${plusses([[830, 150, 140, "plus", 10], [80, 300, 90, "plusL", -8], [940, 1520, 100, "plus"]])}
${phoneSET("left:110px;top:140px;width:200px;height:440px;transform:rotate(-6deg)")}
<div style="position:absolute;left:330px;top:250px;transform:rotate(-2deg)">${pill("Superenvios.app", "font-size:52px")}</div>
<div class="ring"></div><div class="tt"><b>Tasa de cambio</b><span>${fechaCorta(x.d)} · ${horario(x.d)}</span></div><div class="sab">${diaNombre(x.d).toUpperCase()}</div>
<div class="box" style="top:900px">${pair(CORR.CLVE, 120, "#fff")}<b class="num">${rateTxt(x.Rs.CLVE)}</b><small>Bs por cada 1 CLP · tasa de las ${x.hh}</small></div>
<div class="box" style="top:1290px;padding:30px 46px;font-size:32px;line-height:1.55;background:#FFF9EC;color:#187D41">${CORR.CLVE.ej.map((n) => `<div style="display:flex;justify-content:space-between"><span>${amtA(CORR.CLVE, n)}</span><b style="font-size:34px;padding:0;display:inline">${recv(CORR.CLVE, x.R.CLVE, n)}</b></div>`).join("")}</div>
${ico("bills", "left:760px;top:1480px;width:250px;height:210px;transform:rotate(-8deg)")}
${legal(x.hh, "#5c6a60", 130)}`);

// D02 · notas adhesivas: pendientes del sábado
const c02 = `.bg{position:absolute;inset:0;background:#DCE8DF}
.h{position:absolute;left:80px;right:80px;top:250px;font-size:76px;line-height:1.08;color:#0E5A2C}.h b{color:#00913E}
.n{position:absolute;width:440px;min-height:360px;padding:40px 36px;color:#3b2f1c;box-shadow:0 18px 30px rgba(0,0,0,.18);font-size:40px;line-height:1.35}
.n small{display:block;font-size:28px;opacity:.75;margin-bottom:12px}.n b{color:#00913E}
.n.big{width:auto;left:80px;right:80px;min-height:0}`;
export const D02 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c02, `<div class="bg"></div>
<div class="h">Pendientes del <b>sábado</b></div>
<div class="n" style="left:80px;top:500px;background:#FFF7A8;transform:rotate(-3deg)"><small>1</small>☕ Desayunar tranquilo<br>🛒 Ir a la feria</div>
<div class="n" style="right:80px;top:540px;background:#FFD6E0;transform:rotate(3deg)"><small>2</small>📞 Llamar a mamá<br>💚 Mandarle su platica</div>
<div class="n big" style="top:1000px;background:#fff;transform:rotate(-1deg)"><small>3 · Tasa de las ${x.hh} · Chile → Venezuela</small><b class="num" style="font-size:72px">${unitLine(c, x.Rs.CLVE)}</b><br>${amtA(c, 50000)} → <b class="num">${recv(c, r, 50000)}</b></div>
${foot(1460, "Hoy hasta las 15:30 en superenvios.app")}${legal(x.hh, "#3b5a44", 150)}`); };

// D03 · cajero automático (Chile → Perú)
const c03 = `.bg{position:absolute;inset:0;background:#3d4a43}
.atm{position:absolute;left:110px;right:110px;top:250px;height:1260px;background:linear-gradient(180deg,#d9dfdb,#b8c2bc);border-radius:40px;box-shadow:0 30px 60px rgba(0,0,0,.45);padding:60px}
.scr{background:#0E5A2C;border-radius:24px;height:700px;padding:40px;color:#e8ffe9;box-shadow:inset 0 0 0 10px #2b3530}
.scr small{display:block;font-size:30px;opacity:.8}.scr .t{font-size:46px;margin:10px 0 30px}
.opt{display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.12);border-radius:16px;padding:22px 24px;margin:16px 0;font-size:36px}.opt b{color:#FCE27A}
.keys{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px}
.keys i{height:90px;border-radius:16px;background:#eef1ef;box-shadow:0 7px 0 #8a948e;display:grid;place-items:center;font-style:normal;font-size:40px;color:#2b3530}`;
export const D03 = (x) => { const c = CORR.CLPE, r = x.R.CLPE; return page(1080, 1920, c03, `<div class="bg"></div>
<div class="atm"><div class="scr"><small>SÚPER ENVÍOS TODAY · ${x.hh}</small><div class="t">Envío a Perú — elige el monto</div>
${[50000, 100000, 300000].map((n) => `<div class="opt"><span>${amtA(c, n)}</span><b class="num">${recv(c, r, n)}</b></div>`).join("")}
<div style="margin-top:26px;font-size:30px" class="num">${unitLine(c, x.Rs.CLPE)}</div></div>
<div class="keys">${["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((k) => `<i>${k}</i>`).join("")}</div></div>
<div style="position:absolute;right:150px;top:300px;display:flex;gap:8px">${sqFlag("CL", 70)}${sqFlag("PE", 70)}</div>
${foot(1570)}${legal(x.hh, "#d9dfdb", 150)}`); };

// D04 · sábado en familia
const c04 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1000px at 70% 30%,#f2bd1c 0%,#DEA503 60%,#c99402 100%)}
.h{position:absolute;left:80px;top:250px;width:620px;font-size:86px;line-height:1.02;color:#0E5A2C}.h b{color:#fff;text-shadow:0 4px 0 rgba(14,90,44,.35)}
.rt{position:absolute;left:80px;top:700px;width:640px;background:#fff;border-radius:32px;padding:36px 40px;color:#0E5A2C;z-index:2}
.rt small{display:block;font-size:30px;color:#3b6b48}.rt b{display:block;font-size:52px;color:#00913E;margin:8px 0;white-space:nowrap}`;
export const D04 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c04, `<div class="bg"></div>
${plusses([[60, 1500, 100, "plusW", -10]])}
<div class="h">El sábado es para <b>la familia</b></div>
${person("wYvCXc-xUTg", "right:-170px;bottom:0;height:1060px")}
<div class="rt"><small>Tasa de las ${x.hh} · Chile → Venezuela</small><b class="num">${unitLine(c, x.Rs.CLVE)}</b><small>${amtA(c, 100000)} → ${recv(c, r, 100000)}</small><small style="margin-top:14px;color:#0E5A2C">Hoy atendemos hasta las <b style="display:inline;font-size:30px;color:#0E5A2C">${cierre(x.d)}</b></small></div>
<div style="position:absolute;left:80px;top:1110px">${pill("superenvios.app")}</div>
${legal(x.hh, "#0E5A2C", 140).replace('class="legal" style="', 'class="legal" style="right:470px;text-align:left;')}`); };

// D05 · camiseta de fútbol (Chile → Colombia)
const c05 = `.bg{position:absolute;inset:0;background:linear-gradient(180deg,#1b6b2f 0%,#24813a 100%)}
.field{position:absolute;inset:0;background:repeating-linear-gradient(180deg,rgba(255,255,255,.05) 0 120px,transparent 120px 240px)}
.h{position:absolute;left:80px;right:80px;top:240px;font-size:72px;line-height:1.08}.h b{color:#FCD116}
.jersey{position:absolute;left:190px;top:520px;width:700px;height:760px}
.jt{position:absolute;left:190px;top:700px;width:700px;text-align:center;color:#003893}
.jt small{display:block;font-size:44px;letter-spacing:.2em}.jt b{display:block;font-size:112px;line-height:1;margin-top:14px}
.cap{position:absolute;left:80px;right:80px;top:1320px;text-align:center;font-size:40px}.cap b{color:#FCD116}`;
export const D05 = (x) => { const c = CORR.CLCO, r = x.R.CLCO; return page(1080, 1920, c05, `<div class="bg"></div><div class="field"></div>
<div class="h">La camiseta de hoy: <b>Chile → Colombia</b> ⚽</div>
<svg class="jersey" viewBox="0 0 700 760"><path d="M220 20 L140 40 L10 170 L110 290 L170 240 L170 740 L530 740 L530 240 L590 290 L690 170 L560 40 L480 20 C 450 80, 250 80, 220 20 Z" fill="#FCD116" stroke="#e0b800" stroke-width="8"/><path d="M220 20 C 250 80, 450 80, 480 20" fill="none" stroke="#003893" stroke-width="18"/><rect x="170" y="690" width="360" height="22" fill="#CE1126"/></svg>
<div class="jt"><small>TASA</small><b class="num">${rateTxt(x.Rs.CLCO)}</b><small style="font-size:30px;letter-spacing:.06em;margin-top:14px">COP por 1 CLP · ${x.hh}</small></div>
<div class="cap">${amtA(c, 100000)} → <b class="num">${recv(c, r, 100000)}</b></div>
${foot(1450)}${legal(x.hh, "#e3f2e6", 150)}`); };

// D06 · velocímetro (Perú → Venezuela)
const c06 = `.bg{position:absolute;inset:0;background:#111A15}
.h{position:absolute;left:80px;right:80px;top:250px;font-size:72px;line-height:1.08}.h b{color:#22c55e}
.g{position:absolute;left:90px;top:520px;width:900px;height:520px}
.v{position:absolute;left:0;right:0;top:1060px;text-align:center}.v small{display:block;font-size:32px;color:#9fb5a6}.v b{display:block;font-size:84px;color:#fff;margin-top:6px}
.rt{position:absolute;left:100px;right:100px;top:1250px;background:#1d2a22;border-radius:30px;padding:30px 36px;text-align:center;font-size:40px;color:#e8ffe9}.rt b{color:#FCE27A}`;
export const D06 = (x) => { const c = CORR.PEVE, r = x.R.PEVE; return page(1080, 1920, c06, `<div class="bg"></div>
<div class="h">De Perú a Venezuela, <b>a toda velocidad</b></div>
<svg class="g" viewBox="0 0 900 520"><path d="M90 470 A360 360 0 0 1 810 470" fill="none" stroke="#2b3a31" stroke-width="60" stroke-linecap="round"/>
<path d="M90 470 A360 360 0 0 1 700 200" fill="none" stroke="#22c55e" stroke-width="60" stroke-linecap="round"/>
<line x1="450" y1="470" x2="690" y2="230" stroke="#FCE27A" stroke-width="16" stroke-linecap="round"/><circle cx="450" cy="470" r="34" fill="#FCE27A"/>
<text x="90" y="520" font-size="30" fill="#9fb5a6" font-family="Comfortaa">15 min</text><text x="740" y="520" font-size="30" fill="#9fb5a6" font-family="Comfortaa">3 h</text></svg>
<div class="v"><small>Con ${amtA(c, 100)} tu familia recibe</small><b class="num">${recv(c, r, 100)}</b></div>
<div class="rt"><span class="num">${unitLine(c, x.Rs.PEVE)}</span> · ${x.hh}<br><span style="font-size:30px;opacity:.85">Tu envío se procesa de 15 minutos a 3 horas</span></div>
<div style="position:absolute;right:90px;top:430px;display:flex;gap:8px">${sqFlag("PE", 70)}${sqFlag("VE", 70)}</div>
${foot(1500)}${legal(x.hh, "#9fb5a6", 130)}`); };

// D07 · marquesina de cine
const c07 = `.bg{position:absolute;inset:0;background:#2a0f12}
.mq{position:absolute;left:60px;right:60px;top:300px;height:820px;background:#E0302B;border-radius:30px;box-shadow:0 30px 60px rgba(0,0,0,.5);padding:70px 50px}
.bulbs{position:absolute;inset:18px;border-radius:22px;background:radial-gradient(circle,#FFE9A8 0 7px,transparent 8px) 0 0/44px 44px;-webkit-mask:linear-gradient(#000,#000) content-box,linear-gradient(#000,#000);-webkit-mask-composite:xor;padding:24px}
.in{position:relative;background:#fff;border-radius:16px;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#1F2A22;text-align:center;gap:14px}
.in small{font-size:36px;letter-spacing:.14em}.in b{font-size:110px;color:#E0302B;line-height:1}.in span{font-size:40px}`;
export const D07 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c07, `<div class="bg"></div>
<div class="mq"><div class="bulbs"></div><div class="in"><small>HOY EN CARTELERA · ${x.hh}</small><div style="display:flex;gap:10px">${sqFlag("CL", 80)}${sqFlag("VE", 80)}</div><b class="num">${rateTxt(x.Rs.CLVE)}</b><span>Bs por cada 1 CLP</span><span style="font-size:34px;color:#5c6a60">${amtA(c, 100000)} → ${recv(c, r, 100000)}</span></div></div>
<div style="position:absolute;left:0;right:0;top:1180px;text-align:center;color:#FFE9A8;font-size:40px">Función de sábado: hasta las ${cierre(x.d)} 🎬</div>
${foot(1320, "Envía en superenvios.app")}${legal(x.hh, "#e9c9c9", 150)}`); };

// D08 · avión de papel (Colombia → Venezuela)
const c08 = `.bg{position:absolute;inset:0;background:linear-gradient(180deg,#bfe3f5 0%,#eaf6fc 100%)}
.cl{position:absolute;background:#fff;border-radius:60px;opacity:.9}
.h{position:absolute;left:80px;right:80px;top:250px;font-size:72px;line-height:1.08;color:#0E5A2C}.h b{color:#00913E}
.pl{position:absolute;left:180px;top:560px;width:720px;height:420px}
.res{position:absolute;left:90px;right:90px;top:1060px;background:#fff;border-radius:32px;padding:36px 44px;color:#0E5A2C;box-shadow:0 18px 36px rgba(0,60,90,.18)}
.res small{display:block;font-size:30px;color:#3b6b48}.res b{display:block;font-size:84px;color:#00913E;margin:6px 0}`;
export const D08 = (x) => { const c = CORR.COVE, r = x.R.COVE; return page(1080, 1920, c08, `<div class="bg"></div>
<div class="cl" style="left:60px;top:470px;width:260px;height:90px"></div><div class="cl" style="right:80px;top:880px;width:320px;height:100px"></div>
<div class="h">Un avioncito de papel de <b>Colombia a Venezuela</b></div>
<svg class="pl" viewBox="0 0 720 420"><path d="M40 360 C 200 330, 300 250, 380 200" fill="none" stroke="#0E5A2C" stroke-width="6" stroke-dasharray="4 18" stroke-linecap="round"/>
<g transform="translate(400 70)"><path d="M0 120 L300 0 L120 150 Z" fill="#fff" stroke="#187D41" stroke-width="6" stroke-linejoin="round"/><path d="M120 150 L300 0 L150 200 Z" fill="#e3f2e6" stroke="#187D41" stroke-width="6" stroke-linejoin="round"/><path d="M120 150 L150 200 L135 150 Z" fill="#187D41"/></g></svg>
<div style="position:absolute;left:110px;top:900px">${sqFlag("CO", 110)}</div><div style="position:absolute;right:110px;top:560px">${sqFlag("VE", 110)}</div>
<div class="res"><small>Si envías ${amtA(c, 100000)}, tu familia recibe</small><b class="num">${recv(c, r, 100000)}</b><small class="num">${unitLine(c, x.Rs.COVE)} · ${x.hh}</small></div>
${foot(1500)}${legal(x.hh, "#3b6b48", 150)}`); };

// D09 · tabla de posiciones con los 5 corredores
const c09 = `.bg{position:absolute;inset:0;background:#0E3B2A}
.h{position:absolute;left:70px;right:70px;top:240px;display:flex;justify-content:space-between;align-items:flex-end}
.h b{font-size:68px;line-height:1.05}.h span{font-size:28px;color:#8CC573;text-align:right;line-height:1.35}
.tb{position:absolute;left:60px;right:60px;top:430px;background:#fff;border-radius:28px;overflow:hidden;color:#1F2A22;box-shadow:0 20px 40px rgba(0,0,0,.35)}
.tr{display:grid;grid-template-columns:70px 150px 1fr auto;align-items:center;gap:16px;padding:24px 26px;border-bottom:3px solid #eef2ef}
.tr.hd{background:#187D41;color:#fff;font-size:26px;letter-spacing:.08em;padding:18px 26px}
.tr .p{font-size:46px;color:#00913E;text-align:center}.tr .f{display:flex;gap:6px}.tr .n{font-size:30px;line-height:1.2}.tr .v{font-size:40px;text-align:right}.tr .v small{display:block;font-size:22px;color:#5c6a60}`;
export const D09 = (x) => page(1080, 1920, c09, `<div class="bg"></div>
<div class="h"><b>Tabla de<br>posiciones</b><span>Tasas de las ${x.hh}<br>${diaNombre(x.d)} ${fechaCorta(x.d)}</span></div>
<div class="tb"><div class="tr hd"><span>#</span><span>RUTA</span><span></span><span style="text-align:right">TASA</span></div>
${["CLVE", "CLPE", "CLCO", "PEVE", "COVE"].map((k, i) => { const c = CORR[k]; return `<div class="tr"><span class="p">${i + 1}</span><span class="f">${sqFlag(c.a, 60)}${sqFlag(c.b, 60)}</span><span class="n">${c.an}<br>a ${c.bn}</span><span class="v num">${rateTxt(x.Rs[k])} ${c.ub}<small>por 1 ${c.ua}</small></span></div>`; }).join("")}</div>
<div style="position:absolute;left:0;right:0;top:1360px;text-align:center;font-size:34px;color:#cfe3d3">Comisión del servicio incluida en la tasa</div>
${foot(1460)}${legal(x.hh, "#9fc9ad", 150)}`);

// D10 · reloj de arena: último llamado del sábado
const c10 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1100px at 30% 25%,#3a9c52 0%,#2F8F48 55%,#27803e 100%)}
.h{position:absolute;left:80px;top:250px;width:560px;font-size:84px;line-height:1.04}.h b{color:#DEA503}
.hg{position:absolute;right:90px;top:240px;width:300px;height:500px}
.rt{position:absolute;left:80px;right:80px;top:820px;background:#fff;color:#0E5A2C;border-radius:32px;padding:36px 44px}
.rt small{display:block;font-size:30px;color:#3b6b48}.rt b{display:block;font-size:70px;color:#00913E;margin:6px 0}`;
export const D10 = (x) => { const c = CORR.CLVE, r = x.R.CLVE; return page(1080, 1920, c10, `<div class="bg"></div>
<div class="h">Último llamado: hoy cerramos a las <b>${cierre(x.d)}</b></div>
<svg class="hg" viewBox="0 0 300 500"><rect x="20" y="10" width="260" height="30" rx="12" fill="#0E5A2C"/><rect x="20" y="460" width="260" height="30" rx="12" fill="#0E5A2C"/>
<path d="M50 40 C 50 170, 140 200, 140 250 C 140 300, 50 330, 50 460 L250 460 C 250 330, 160 300, 160 250 C 160 200, 250 170, 250 40 Z" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="8"/>
<path d="M80 80 C 90 150, 140 190, 147 240 L153 240 C 160 190, 210 150, 220 80 Z" fill="#DEA503" opacity=".35"/><path d="M60 455 C 80 380, 130 360, 150 330 C 170 360, 220 380, 240 455 Z" fill="#DEA503"/><rect x="146" y="250" width="8" height="90" fill="#DEA503"/></svg>
<div class="rt"><small>Tasa de las ${x.hh} · Chile → Venezuela</small><b class="num">${unitLine(c, x.Rs.CLVE)}</b><small>${amtA(c, 100000)} → ${recv(c, r, 100000)}</small></div>
${foot(1200, "Envía en superenvios.app")}${legal(x.hh, "#fff", 150)}`); };

// F4 · feed del sábado (Venezuela principal + Colombia + Perú): tres tarjetas apiladas
const cf4 = `.bg{position:absolute;inset:0;background:#FFF9EC}
.top{position:absolute;left:70px;top:66px;right:70px;display:flex;justify-content:space-between;align-items:center;color:#187D41}.top img{height:78px}.top span{font-size:28px;text-align:right;line-height:1.3}
.c{position:absolute;left:70px;right:70px;border-radius:34px;padding:34px 40px;display:flex;align-items:center;gap:30px;box-shadow:0 16px 30px rgba(60,50,0,.12)}
.c b{display:block;font-size:72px;line-height:1}.c small{display:block;font-size:28px;margin-top:8px;opacity:.85}
.c1{top:210px;background:#2F8F48;color:#fff;padding:46px 44px}.c1 b{font-size:92px;color:#FCE27A;white-space:nowrap}
.c2{top:500px;background:#FCD116;color:#003893}.c3{top:760px;background:#fff;color:#D91023;border:4px solid #f3d3d6}
.ft{position:absolute;left:70px;right:70px;top:1080px;display:flex;justify-content:space-between;align-items:center;color:#187D41}.ft span{font-size:26px;max-width:520px;line-height:1.35}`;
export const F4 = (x) => page(1080, 1350, cf4, `<div class="bg"></div>
<div class="top"><img src="assets/logos/tipo_verde.png"><span>${diaNombre(x.d)} ${fechaCorta(x.d)}<br>Tasas de las ${x.hh}</span></div>
<div class="c c1">${pair(CORR.CLVE, 110, "#fff")}<div><b class="num">${rateTxt(x.Rs.CLVE)} Bs</b><small>por cada 1 CLP · Chile → Venezuela</small></div></div>
<div class="c c2">${pair(CORR.CLCO, 90, "#003893")}<div><b class="num">${rateTxt(x.Rs.CLCO)} COP</b><small>por cada 1 CLP · Chile → Colombia</small></div></div>
<div class="c c3">${pair(CORR.CLPE, 90, "#D91023")}<div><b class="num">${rateTxt(x.Rs.CLPE)} PEN</b><small>por cada 1 CLP · Chile → Perú</small></div></div>
<div class="ft"><span>Comisión del servicio incluida en la tasa · hoy atendemos hasta las ${cierre(x.d)}</span>${pill("superenvios.app", "font-size:36px")}</div>`);

export const STORIES_D = { D01, D02, D03, D04, D05, D06, D07, D08, D09, D10 };
export const FEEDS_D = { F4 };
