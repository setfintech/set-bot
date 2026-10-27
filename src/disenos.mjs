// disenos.mjs — diseños de tasa de SET (historias 1080×1920 y feed 1080×1350).
// Kit SET: verde plano / mostaza, Comfortaa, cruces "+" 3D, píldora roja, personas recortadas, billetes 3D.
// S01/S02 = el modelo que SET ya publica (réplica y variación) para que el público lo reconozca; el resto son conceptos nuevos,
// distintos de Karduto, VezMoney y Giros del Sur (boleto, postal, chat, titular, calculadora, comprobante, ruta, tablero, último llamado).
import { ICONS } from "./icons.mjs";

// ---------- formato ----------
export const fmt = (n, d = 0) => n.toLocaleString("de-DE", { minimumFractionDigits: d, maximumFractionDigits: d }); // 92.690,40
export const fmtDot = (n, d = 4) => n.toFixed(d); // 0.9250 (estilo del modelo actual de SET)
const MES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const DIA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
export const fechaCorta = (d) => `${d.getUTCDate()} ${MES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
export const diaNombre = (d) => DIA[d.getUTCDay()];
export const horario = (d) => (d.getUTCDay() === 6 ? "9 am a 3:30 pm" : "9 am a 6:45 pm");
export const cierre = (d) => (d.getUTCDay() === 6 ? "15:30" : "18:45");

// ---------- corredores ----------
export const CORR = {
  CLVE: { a: "CL", b: "VE", an: "Chile", bn: "Venezuela", ua: "CLP", ub: "Bs", per: 1, dec: 4, ej: [10000, 50000, 100000], recDec: 2 },
  CLPE: { a: "CL", b: "PE", an: "Chile", bn: "Perú", ua: "CLP", ub: "PEN", per: 1, dec: 2, ej: [50000, 100000, 300000], recDec: 2, sim: "S/" },
  CLCO: { a: "CL", b: "CO", an: "Chile", bn: "Colombia", ua: "CLP", ub: "COP", per: 1, dec: 2, ej: [50000, 100000, 300000], recDec: 0 },
  PEVE: { a: "PE", b: "VE", an: "Perú", bn: "Venezuela", ua: "PEN", ub: "Bs", per: 1, dec: 2, ej: [50, 100, 500], recDec: 2, simA: "S/" },
  COVE: { a: "CO", b: "VE", an: "Colombia", bn: "Venezuela", ua: "COP", ub: "Bs", per: 1, dec: 2, ej: [50000, 100000, 500000], recDec: 2 },
};
const amtA = (c, n) => (c.simA ? `${c.simA} ${fmt(n)}` : `${fmt(n)} ${c.ua}`);
const amtB = (c, n) => (c.sim ? `${c.sim} ${fmt(n, c.recDec)}` : `${fmt(n, c.recDec)} ${c.ub}`);
// tasa tal cual viene de la API (sin redondear; solo se quitan ceros sobrantes de más de 4 decimales). sep "," (español) o "." (modelo actual de SET)
// Chile → Venezuela ya llega cortada a 4 decimales (tasa_set.mjs) y se muestra así: 0,9250.
export const rateTxt = (r, sep = ",") => { let t = (typeof r === "string" ? r : String(r)); if (/\.\d{5,}$/.test(t)) t = t.replace(/0+$/, "").replace(/\.$/, ""); return sep === "," ? t.replace(".", ",") : t; };
// tramos de Chile → Venezuela (x.T de tasa_set.mjs): bloque chico para no romper el diseño. v = "claro" (fondo verde/oscuro) u "oscuro" (fondo blanco/crema)
// v puede llevar "fila" (los dos tramos en una línea) y titulo (para las piezas con todos los corredores).
export const tramos = (x, v = "claro", style = "", titulo = "", sep = ",") => x.T ? `<div class="tramos ${v}" style="${style}">${titulo ? `<i class="tt">${titulo}</i>` : ""}<span>Desde 250.000 CLP <b>${rateTxt(x.T.t250, sep)}</b></span><span>Desde 500.000 CLP <b>${rateTxt(x.T.t500, sep)}</b></span></div>` : "";
export const unitLine = (c, r) => `1 ${c.ua} = ${rateTxt(r)} ${c.ub}`;
export const recv = (c, r, n) => amtB(c, n * r);

// ---------- piezas del kit ----------
const FLAG_IN = {
  CL: `<rect width="120" height="120" fill="#fff"/><rect y="60" width="120" height="60" fill="#D52B1E"/><rect width="50" height="60" fill="#0039A6"/><path d="M25 16l4.4 13.6h14.3l-11.6 8.4 4.4 13.6L25 43.2l-11.5 8.4 4.4-13.6-11.6-8.4h14.3z" fill="#fff"/>`,
  VE: `<rect width="120" height="40" fill="#FFCC00"/><rect y="40" width="120" height="40" fill="#00247D"/><rect y="80" width="120" height="40" fill="#CF142B"/>${Array.from({ length: 8 }, (_, i) => { const a = Math.PI * (0.15 + 0.7 * i / 7); return `<circle cx="${(60 - 30 * Math.cos(a)).toFixed(1)}" cy="${(70 - 22 * Math.sin(a)).toFixed(1)}" r="3.4" fill="#fff"/>`; }).join("")}`,
  PE: `<rect width="120" height="120" fill="#fff"/><rect width="40" height="120" fill="#D91023"/><rect x="80" width="40" height="120" fill="#D91023"/>`,
  CO: `<rect width="120" height="60" fill="#FCD116"/><rect y="60" width="120" height="30" fill="#003893"/><rect y="90" width="120" height="30" fill="#CE1126"/>`,
  US: `<rect width="120" height="120" fill="#fff"/>${[0, 2, 4, 6, 8, 10, 12].map((i) => `<rect y="${i * 9.2}" width="120" height="9.2" fill="#B22234"/>`).join("")}<rect width="56" height="64" fill="#3C3B6E"/>`,
};
let _q = 0;
// bandera cuadrada redondeada con brillo (como en el modelo actual de SET)
export const sqFlag = (k, s = 120) => { const id = `q${++_q}`; return `<svg class="sqf" width="${s}" height="${s}" viewBox="0 0 120 120"><defs><clipPath id="${id}"><rect x="4" y="4" width="112" height="112" rx="26"/></clipPath><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient></defs><rect x="4" y="10" width="112" height="112" rx="26" fill="#000" opacity=".18"/><g clip-path="url(#${id})">${FLAG_IN[k]}<rect width="120" height="120" fill="url(#${id}g)"/></g></svg>`; };
const cirFlag = (k, s = 90) => { const id = `c${++_q}`; return `<svg width="${s}" height="${s}" viewBox="0 0 120 120"><defs><clipPath id="${id}"><circle cx="60" cy="60" r="54"/></clipPath></defs><g clip-path="url(#${id})">${FLAG_IN[k]}</g><circle cx="60" cy="60" r="54" fill="none" stroke="#fff" stroke-width="7"/></svg>`; };
const ico = (n, st) => `<div class="ico" style="${st}">${ICONS[n]}</div>`;
const plusses = (l) => l.map(([x, y, s, v = "plus", r = 0]) => ico(v, `left:${x}px;top:${y}px;width:${s}px;height:${s}px;transform:rotate(${r}deg)`)).join("");
const pill = (t = "Superenvios.app", st = "") => `<span class="pill" style="${st}">${t}</span>`;
const person = (f, st) => `<img class="person" src="assets/people/${f}.png" style="${st}">`;
const chev = `<svg width="46" height="46" viewBox="0 0 24 24"><path d="M8 4l8 8-8 8" fill="none" stroke="#2E8B3E" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const pair = (c, s = 120) => `<div class="pair">${sqFlag(c.a, s)}${chev}${sqFlag(c.b, s)}</div>`;
const legal = (hh, extra = "") => `<div class="legal">Tasa referencial de las ${hh}; se actualiza cada hora. La tasa final es la que ves en superenvios.app al momento de enviar.${extra}</div>`;
const phoneSET = (st) => `<div class="ph" style="${st}"><div class="ph-scr"><img src="assets/logos/iso_blanco.png"></div></div>`;
const barcode = (n = 46) => `<div class="bars">${Array.from({ length: n }, (_, i) => `<i style="width:${[3, 6, 2, 4, 8][(i * 7) % 5]}px"></i>`).join("")}</div>`;

export const BASE_CSS = `
@font-face{font-family:"Comfortaa";src:url("assets/fonts/Comfortaa-Regular.ttf");font-weight:400}
@font-face{font-family:"Comfortaa";src:url("assets/fonts/Comfortaa-SemiBold.ttf");font-weight:600}
@font-face{font-family:"Comfortaa";src:url("assets/fonts/Comfortaa-Bold.ttf");font-weight:700}
*{margin:0;padding:0;box-sizing:border-box}
html,body{overflow:hidden;font-family:"Comfortaa",sans-serif;font-weight:700;color:#fff}
#root{position:relative;overflow:hidden}
.ico{position:absolute;filter:drop-shadow(0 18px 24px rgba(0,40,15,.28))}.ico svg{width:100%;height:100%;display:block}
.pill{display:inline-flex;align-items:center;background:linear-gradient(180deg,#f1443d 0%,#E0302B 55%,#c92520 100%);color:#fff;font-weight:700;font-size:44px;padding:18px 40px 22px;border-radius:26px;box-shadow:0 9px 0 #B81F1B,0 22px 40px rgba(80,0,0,.35)}
.person{position:absolute;display:block;filter:drop-shadow(0 30px 40px rgba(0,40,15,.3))}
.pair{display:flex;align-items:center;gap:6px}
.sqf{display:block;flex:none}
#root .tramos{position:absolute;z-index:20;display:flex;flex-direction:column;gap:8px;font-size:29px;font-weight:600;line-height:1.15}
#root .tramos span{display:flex;margin:0;font-size:inherit;font-weight:600;line-height:1.15;text-align:left;justify-content:space-between;gap:22px;padding:11px 20px 13px;border-radius:16px;white-space:nowrap}
#root .tramos b{font-weight:700}
#root .tramos.fila{flex-direction:row;flex-wrap:wrap}#root .tramos.fila span{flex:1 1 0}#root .tramos .tt{flex:0 0 100%;font-style:normal;font-size:.82em;opacity:.9;padding:0 4px}
#root .tramos.claro span{background:rgba(255,255,255,.16);color:#fff;border:2px solid rgba(255,255,255,.28)}#root .tramos.claro b{color:#FFD45C}
#root .tramos.oscuro span{background:#EAF5E4;color:#1F2A22;border:2px solid #CFE6C4}#root .tramos.oscuro b{color:#00913E}
#root .tramos.oscuro .tt{color:#1F2A22}#root .tramos.claro .tt{color:#fff}
.legal{position:absolute;left:80px;right:80px;bottom:150px;font-size:22px;line-height:1.35;font-weight:400;opacity:.85;text-align:center}
.ph{position:absolute;border-radius:44px;background:linear-gradient(145deg,#3b3f45,#111316);padding:12px;box-shadow:0 30px 50px rgba(0,40,15,.35),inset 0 0 0 3px #555a61}
.ph-scr{width:100%;height:100%;border-radius:34px;background:linear-gradient(170deg,#3fae5b 0%,#1f8a41 100%);display:grid;place-items:center}
.ph-scr img{width:62%}
.bars{display:flex;gap:4px;height:90px;align-items:stretch}.bars i{display:block;background:#1F2A22}
.num{font-family:Arial,"Liberation Sans",sans-serif;font-weight:700}
`;
export const page = (w, h, css, inner) => `<!doctype html><html lang="es"><head><meta charset="UTF-8"><style>${BASE_CSS}#root{width:${w}px;height:${h}px}${css}</style></head><body><div id="root">${inner}</div></body></html>`;

// ═════════════════════════ HISTORIAS ═════════════════════════
// x = { d: Date (día, UTC=hora Chile), hh: "09:00", R: {CLVE: rate, ...}, tiers: [r1, r2, r3] | null }

// S01 · réplica del modelo actual de SET (Chile→Venezuela por tramos + Venezuela→Chile)
const css01 = `.bg{position:absolute;inset:0;background:radial-gradient(900px 1200px at 50% 45%,#47a85a 0%,#3d9a4f 60%,#358a46 100%)}
.panel{position:absolute;left:176px;top:384px;width:736px;height:1224px;border-radius:44px;background:#2f8a40;box-shadow:-18px 22px 0 #2a7c3a,0 30px 60px rgba(0,40,15,.25)}
.tt{position:absolute;left:590px;top:430px;width:340px;text-align:center;font-weight:400;line-height:1.18}
.tt b{display:block;font-weight:400;font-size:64px}.tt span{display:block;font-size:44px;margin-top:14px;font-weight:400}
.box{position:absolute;left:240px;width:712px;background:#fff;border-radius:30px;color:#2E8B3E;box-shadow:0 14px 30px rgba(0,40,15,.18)}
.box .pair{position:absolute;left:-18px;top:-26px}
.rt{padding:170px 0 40px 66px;font-size:46px;line-height:1.5}`;
export const S01 = (x) => {
  // como el modelo de SET: tasa del sistema y los dos tramos por monto, en la misma caja
  const rows = x.T ? `<div class="num" style="font-size:56px">${rateTxt(x.T.base, ".")}</div><div class="num" style="font-size:40px">${rateTxt(x.T.t250, ".")} <span style="font-size:32px">(mayor a 250.000)</span></div><div class="num" style="font-size:40px">${rateTxt(x.T.t500, ".")} <span style="font-size:32px">(mayor a 500.000)</span></div><div style="font-size:24px;color:#5c7a64;font-family:Arial,sans-serif;margin-top:6px">Tasa de las ${x.hh}</div>`
    : `<div class="num" style="font-size:96px;text-align:center;margin-left:-66px">${rateTxt(x.Rs.CLVE, ".")}</div><div style="font-size:30px;text-align:center;margin-left:-66px;color:#5c7a64;font-family:Arial,sans-serif">Tasa de las ${x.hh}</div>`;
  return page(1080, 1920, css01, `<div class="bg"></div><div class="panel"></div>
${plusses([[96, 140, 170, "plusL"], [90, 296, 92, "plusW"], [205, 270, 90, "plus"]])}
${phoneSET("left:150px;top:256px;width:236px;height:520px;transform:rotate(-2deg)")}
<div style="position:absolute;left:62px;top:596px;transform:rotate(-3deg)">${pill("Superenvios.app", "font-size:48px")}</div>
<div class="tt"><b>Tasa de<br>cambio</b><span>${fechaCorta(x.d)}</span><span style="margin-top:6px">${horario(x.d)}</span></div>
<div class="box" style="top:832px;height:392px">${pair(CORR.CLVE, 126)}<div class="rt" style="${x.T ? "padding-top:150px;line-height:1.45" : ""}">${rows}</div></div>
<div class="box" style="top:1272px;height:270px">${pair({ a: "VE", b: "CL" }, 126)}<div class="rt num" style="padding:140px 0 0;font-size:72px;text-align:center">${x.mostrarVECL && x.Rs.VECL ? rateTxt(x.Rs.VECL, ".") : ""}</div></div>
${ico("bills", "left:672px;top:1376px;width:330px;height:270px;transform:rotate(-8deg)")}`);
};

// S02 · variación del modelo: mostaza, teléfono a la derecha, una sola caja grande con montos de ejemplo
const css02 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1100px at 30% 30%,#f2bd1c 0%,#DEA503 60%,#c99402 100%)}
.panel{position:absolute;left:120px;top:520px;width:840px;height:1060px;border-radius:44px;background:#187D41;box-shadow:18px 22px 0 #0E5A2C}
.tt{position:absolute;left:170px;top:580px;line-height:1.15}.tt b{display:block;font-size:66px}.tt span{display:block;font-size:38px;font-weight:400;margin-top:12px}
.box{position:absolute;left:170px;top:870px;width:740px;background:#fff;border-radius:30px;color:#187D41;padding:60px 54px 40px}
.box .pair{position:absolute;right:40px;top:-60px}
.big{font-size:118px;line-height:1;letter-spacing:-2px;color:#00913E}.big small{font-size:52px}
.lbl{font-size:30px;color:#5c7a64;margin-top:12px;font-weight:600}
.ej{margin-top:34px;border-top:3px dashed #cfe3d3;padding-top:24px;display:flex;flex-direction:column;gap:14px;font-size:36px}
.ej div{display:flex;justify-content:space-between}.ej b{color:#0E5A2C}`;
export const S02 = (x) => {
  const c = CORR.CLVE, r = x.R.CLVE;
  return page(1080, 1920, css02, `<div class="bg"></div>
${plusses([[850, 150, 150, "plusW", 12], [60, 330, 100, "plus", -10], [930, 420, 80, "plusL"]])}
${phoneSET("left:640px;top:170px;width:220px;height:480px;transform:rotate(6deg)")}
<div style="position:absolute;left:120px;top:300px;transform:rotate(-3deg)">${pill("Superenvios.app", "font-size:50px")}</div>
<div class="panel"></div><div class="tt"><b>Tasa de cambio</b><span>${fechaCorta(x.d)} · ${horario(x.d)}</span></div>
<div class="box">${pair(c, 120)}<div class="big num">${rateTxt(x.Rs.CLVE)} <small>Bs</small></div><div class="lbl">por cada 1 CLP · Chile → Venezuela</div>
<div class="ej">${c.ej.map((n) => `<div><span>${amtA(c, n)}</span><b>${recv(c, r, n)}</b></div>`).join("")}</div></div>
${ico("bills", "left:-30px;top:1430px;width:330px;height:270px;transform:rotate(10deg)")}
<div class="legal" style="color:#0E5A2C;bottom:170px">Tasa referencial de las ${x.hh}; se actualiza cada hora. La final es la de superenvios.app al enviar.</div>`);
};

// S03 · postal (Chile → Perú)
const css03 = `.bg{position:absolute;inset:0;background:#FFF9EC}
.dots{position:absolute;inset:0;background:radial-gradient(#e9dcb9 2.5px,transparent 3px) 0 0/44px 44px;opacity:.7}
.h{position:absolute;left:90px;right:90px;top:250px;color:#187D41;font-size:76px;line-height:1.1}.h b{color:#E0302B}
.card{position:absolute;left:80px;top:560px;width:920px;height:640px;background:#fff;border-radius:18px;box-shadow:0 30px 60px rgba(60,40,0,.22);transform:rotate(-2.5deg);color:#1F2A22;padding:60px}
.card:before{content:"";position:absolute;left:50%;top:60px;bottom:60px;border-left:3px solid #eadfc4}
.msg{width:400px;font-size:40px;line-height:1.4;font-weight:600;color:#187D41}.msg b{font-size:58px;color:#D91023;display:block;margin:14px 0}
.stamp{position:absolute;right:70px;top:56px;width:190px;height:230px;border:6px dashed #D91023;border-radius:10px;display:grid;place-items:center;background:#fff4f4}
.pm{position:absolute;right:220px;top:120px;width:220px;height:220px;border:5px solid rgba(24,125,65,.55);border-radius:50%;display:grid;place-items:center;text-align:center;font-size:24px;color:rgba(24,125,65,.75);transform:rotate(-14deg);line-height:1.3}
.lines{position:absolute;right:70px;bottom:90px;width:380px}.lines div{border-bottom:3px solid #eadfc4;height:64px;font-size:30px;color:#5c6a60;padding-top:20px}
.foot{position:absolute;left:0;right:0;top:1300px;text-align:center}`;
export const S03 = (x) => {
  const c = CORR.CLPE, r = x.R.CLPE;
  return page(1080, 1920, css03, `<div class="bg"></div><div class="dots"></div>
${plusses([[880, 420, 110, "plus", 10], [70, 1380, 100, "plusL", -8]])}
<div class="h">Saludos desde Chile a <b>Perú</b></div>
<div class="card"><div class="msg">Querida familia: hoy sus<br>${amtA(c, 100000)}<b>${recv(c, r, 100000)}</b>les llegan así. Con cariño 💚</div>
<div class="stamp">${sqFlag("PE", 140)}</div><div class="pm">SANTIAGO<br>· ${x.hh} ·<br>LIMA</div>
<div class="lines"><div>${unitLine(c, x.Rs.CLPE)}</div><div>Comisión incluida en la tasa</div><div>De 15 min a 2 horas</div></div></div>
<div class="foot">${pill("Envía en superenvios.app")}</div>
<div class="legal" style="color:#5c6a60">Tasa referencial de las ${x.hh}; se actualiza cada hora. La final es la de superenvios.app al enviar.</div>`);
};

// S04 · chat (persona + burbujas genéricas, sin marca de mensajería)
const css04 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1200px at 70% 30%,#3a9c52 0%,#2F8F48 55%,#27803e 100%)}
.bb{position:absolute;max-width:640px;font-size:42px;line-height:1.3;padding:26px 36px 32px;border-radius:36px;box-shadow:0 16px 34px rgba(0,40,15,.25)}
.me{right:70px;background:#DCF5D2;color:#0E5A2C;border-bottom-right-radius:10px}
.set{left:70px;background:#fff;color:#187D41;border-bottom-left-radius:10px}
.set b{display:block;font-size:62px;color:#00913E;margin:6px 0;white-space:nowrap}
.who{position:absolute;left:70px;top:240px;display:flex;align-items:center;gap:20px;font-size:36px}
.who img{width:84px;height:84px;border-radius:50%;background:#fff;padding:10px}`;
export const S04 = (x) => {
  const c = CORR.CLVE, r = x.R.CLVE;
  return page(1080, 1920, css04, `<div class="bg"></div>
${plusses([[900, 380, 110, "plusW", 10], [40, 1500, 90, "plusL"]])}
<div class="who"><img src="assets/logos/iso_verde.png"><span>Súper Envíos Today<br><span style="font-size:26px;font-weight:400;opacity:.85">en línea · ${x.hh}</span></span></div>
<div class="bb me" style="top:420px">¿En cuánto está la tasa hoy hacia Venezuela? 🙏</div>
<div class="bb set" style="top:600px">Hoy a las ${x.hh}:<b class="num">${unitLine(c, x.Rs.CLVE)}</b>Si envías ${amtA(c, 50000)}, reciben <span style="color:#0E5A2C">${recv(c, r, 50000)}</span></div>
<div class="bb me" style="top:1010px">¡Ya mismo le mando a mi mamá! 💚</div>
${person("DDSTN7TZjic", "right:-60px;bottom:-10px;height:840px")}
<div style="position:absolute;left:70px;top:1260px">${pill("superenvios.app")}</div>
<div class="legal" style="text-align:left;right:420px">Tasa referencial de las ${x.hh}; se actualiza cada hora. La final es la de superenvios.app.</div>`);
};

// S05 · titular de diario "NotiSET" (Chile → Colombia)
const css05 = `.bg{position:absolute;inset:0;background:#F4F1E8}
.paper{position:absolute;left:60px;right:60px;top:230px;bottom:250px;background:#fffdf7;box-shadow:0 30px 60px rgba(0,0,0,.18);padding:56px 60px;color:#1F2A22}
.mast{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:8px double #1F2A22;padding-bottom:16px}
.mast b{font-size:96px;letter-spacing:-2px}.mast b span{color:#00913E}.mast i{font-style:normal;font-size:24px;font-weight:600;text-align:right;line-height:1.4}
.kick{margin-top:36px;display:inline-block;background:#E0302B;color:#fff;font-size:28px;padding:8px 18px 10px;letter-spacing:.06em}
.hl{font-size:84px;line-height:1.05;margin-top:22px;letter-spacing:-1px}
.big{margin-top:30px;display:flex;align-items:center;gap:26px;background:#FCD116;padding:26px 30px;border-radius:12px}
.big b{font-size:96px;color:#003893;line-height:1}.big span{font-size:30px;color:#003893;font-weight:600}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:34px;margin-top:36px}
.cols p{font-size:28px;line-height:1.45;font-weight:600;color:#3b463f}.cols p b{color:#00913E}
.ln{height:14px;background:#e3e0d6;border-radius:7px;margin:14px 0}`;
export const S05 = (x) => {
  const c = CORR.CLCO, r = x.R.CLCO;
  return page(1080, 1920, css05, `<div class="bg"></div><div class="paper">
<div class="mast"><b>Noti<span>SET</span></b><i>Edición de las ${x.hh}<br>${diaNombre(x.d)} ${fechaCorta(x.d)}</i></div>
<span class="kick">CHILE → COLOMBIA</span>
<div class="hl">Así rinde hoy tu envío a Colombia</div>
<div class="big">${sqFlag("CO", 120)}<div><b class="num">${fmt(r * 100000)} COP</b><br><span>por cada ${fmt(100000)} CLP que envías</span></div></div>
<div class="cols"><div><p>La tasa de las ${x.hh} quedó en <b>${unitLine(c, x.Rs.CLCO)}</b>. Comisión del servicio incluida en la tasa.</p><div class="ln"></div><div class="ln" style="width:80%"></div><div class="ln"></div></div>
<div><p>Tu envío se procesa de <b>15 minutos a 2 horas</b>, todo desde tu celular.</p><div class="ln" style="width:70%"></div><div class="ln"></div><div class="ln" style="width:85%"></div></div></div>
<div style="margin-top:40px">${pill("Envía en superenvios.app", "font-size:40px")}</div></div>
<div class="legal" style="color:#5c6a60;bottom:170px">Tasa referencial de las ${x.hh}; se actualiza cada hora. La final es la de superenvios.app al enviar.</div>`);
};

// S06 · calculadora (Perú → Venezuela)
const css06 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1200px at 30% 20%,#3a9c52 0%,#2F8F48 55%,#27803e 100%)}
.h{position:absolute;left:80px;right:80px;top:240px;font-size:70px;line-height:1.1}.h b{color:#DEA503}
.calc{position:absolute;left:150px;top:600px;width:780px;background:#1F2A22;border-radius:56px;padding:46px;box-shadow:0 40px 70px rgba(0,30,10,.45),inset 0 0 0 4px #39443c}
.disp{background:#DCF5D2;border-radius:28px;padding:30px 36px;color:#0E5A2C;text-align:right}
.disp small{display:block;font-size:30px;font-weight:600;color:#3b6b48}.disp b{display:block;font-size:92px;line-height:1.05;letter-spacing:-1px}
.keys{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:36px}
.keys i{font-style:normal;height:118px;border-radius:30px;background:#333e36;display:grid;place-items:center;font-size:50px;color:#fff;box-shadow:0 8px 0 #121814}
.keys i.o{background:#DEA503;color:#0E5A2C;box-shadow:0 8px 0 #9c7400}.keys i.e{background:#E0302B;box-shadow:0 8px 0 #9a1d19}
.flags{position:absolute;left:0;right:0;top:450px;display:flex;justify-content:center;z-index:5}`;
export const S06 = (x) => {
  const c = CORR.PEVE, r = x.R.PEVE;
  const k = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ",", "=", "+"];
  return page(1080, 1920, css06, `<div class="bg"></div>
${plusses([[60, 1640, 110, "plusW", -12], [900, 1580, 90, "plusL"]])}
<div class="h">Desde <b>Perú</b> a Venezuela, haz la cuenta:</div>
<div class="flags">${pair(c, 110)}</div>
<div class="calc"><div class="disp"><small>${amtA(c, 100)} =</small><b class="num">${recv(c, r, 100)}</b><small>${unitLine(c, x.Rs.PEVE)} · ${x.hh}</small></div>
<div class="keys">${k.map((t) => `<i class="${"÷×−+".includes(t) ? "o" : t === "=" ? "e" : ""}">${t}</i>`).join("")}</div></div>
<div style="position:absolute;left:0;right:0;top:1690px;text-align:center">${pill("superenvios.app")}</div>
<div class="legal" style="bottom:70px">Tasa referencial de las ${x.hh}; se actualiza cada hora.</div>`);
};

// S07 · comprobante (Chile → Venezuela)
const css07 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1100px at 70% 30%,#f2bd1c 0%,#DEA503 60%,#c99402 100%)}
.rc{position:absolute;left:150px;top:250px;width:780px;background:#fff;color:#1F2A22;padding:60px 60px 70px;box-shadow:0 30px 60px rgba(80,50,0,.3);transform:rotate(1.5deg)}
.rc:after{content:"";position:absolute;left:0;right:0;bottom:-30px;height:30px;background:linear-gradient(-45deg,transparent 15px,#fff 0) 0 0/30px 30px,linear-gradient(45deg,transparent 15px,#fff 0) 0 0/30px 30px}
.rc h3{text-align:center;font-size:40px;letter-spacing:.08em}.rc .sub{text-align:center;font-size:26px;font-weight:600;color:#5c6a60;margin-top:8px}
.sep{border-top:4px dashed #d6d6d6;margin:30px 0}
.row{display:flex;justify-content:space-between;font-size:36px;margin:16px 0;font-weight:600}.row b{color:#00913E}
.tot{display:flex;justify-content:space-between;align-items:center;background:#F1F8EE;border-radius:16px;padding:22px 26px;margin-top:10px}
.tot span{font-size:34px}.tot b{font-size:64px;color:#00913E}
.ok{display:flex;align-items:center;gap:16px;font-size:32px;color:#187D41;margin:12px 0}`;
export const S07 = (x) => {
  const c = CORR.CLVE, r = x.R.CLVE;
  return page(1080, 1920, css07, `<div class="bg"></div>
${plusses([[60, 260, 110, "plusW", -10], [930, 1380, 100, "plus", 12]])}
<div class="rc"><img src="assets/logos/tipo_verde.png" style="display:block;height:80px;margin:0 auto 24px"><h3>COMPROBANTE DE TASA</h3><div class="sub">${diaNombre(x.d)} ${fechaCorta(x.d)} · ${x.hh} · Chile → Venezuela</div>
<div class="sep"></div>
${c.ej.map((n) => `<div class="row"><span>Envías ${amtA(c, n)}</span><b>${recv(c, r, n)}</b></div>`).join("")}
<div class="sep"></div>
<div class="tot"><span>Tasa: 1 CLP =</span><b class="num">${rateTxt(x.Rs.CLVE)} Bs</b></div>
<div class="ok">✔ Comisión del servicio incluida en la tasa</div><div class="ok">✔ Se procesa de 15 minutos a 2 horas</div>
<div style="margin-top:26px">${barcode()}</div></div>
<div style="position:absolute;left:0;right:0;top:1560px;text-align:center">${pill("Envía en superenvios.app")}</div>
<div class="legal" style="color:#0E5A2C;bottom:120px">Tasa referencial de las ${x.hh}; se actualiza cada hora. La final es la de superenvios.app al enviar.</div>`);
};

// S08 · ruta con avión (Colombia → Venezuela)
const css08 = `.bg{position:absolute;inset:0;background:linear-gradient(180deg,#0E5A2C 0%,#187D41 55%,#2F8F48 100%)}
.h{position:absolute;left:80px;right:80px;top:250px;font-size:72px;line-height:1.1}.h b{color:#DEA503}
.route{position:absolute;left:0;top:560px;width:1080px;height:560px}
.cty{position:absolute;text-align:center;font-size:34px}.cty svg{display:block;margin:0 auto 12px}
.res{position:absolute;left:80px;right:80px;top:1110px;background:#fff;color:#0E5A2C;border-radius:36px;padding:44px 50px}
.res small{display:block;font-size:32px;font-weight:600;color:#3b6b48}.res b{display:block;font-size:100px;line-height:1.05;color:#00913E;margin:8px 0}`;
export const S08 = (x) => {
  const c = CORR.COVE, r = x.R.COVE;
  return page(1080, 1920, css08, `<div class="bg"></div>
${plusses([[890, 170, 110, "plusW", 10], [60, 1600, 90, "plusL"]])}
<div class="h">De <b>Colombia</b> a Venezuela, en minutos ✈️</div>
<svg class="route" viewBox="0 0 1080 560"><path d="M200 420 Q540 40 880 380" fill="none" stroke="#fff" stroke-width="9" stroke-dasharray="6 26" stroke-linecap="round"/>
<g transform="translate(540 150) scale(-1.4 1.4)"><path d="M-44 6 L-10 2 L6 -24 L16 -24 L8 2 L40 0 L48 -12 L54 -12 L50 4 L54 20 L48 20 L40 8 L8 6 L16 32 L6 32 L-10 10 L-44 8 Z" fill="#DEA503"/></g></svg>
<div class="cty" style="left:125px;top:870px">${sqFlag("CO", 150)}Bogotá</div><div class="cty" style="right:125px;top:830px">${sqFlag("VE", 150)}Caracas</div>
<div class="res"><small>Si envías ${amtA(c, 100000)}, tu familia recibe</small><b class="num">${recv(c, r, 100000)}</b><small>${unitLine(c, x.Rs.COVE)} · tasa de las ${x.hh}</small></div>
<div style="position:absolute;left:0;right:0;top:1590px;text-align:center">${pill("superenvios.app")}</div>
<div class="legal" style="bottom:110px">Tasa referencial; se actualiza cada hora. La final es la de superenvios.app al enviar.</div>`);
};

// S09 · tablero de salidas con todos los corredores
const css09 = `.bg{position:absolute;inset:0;background:#0B2617}
.h{position:absolute;left:70px;right:70px;top:240px;display:flex;justify-content:space-between;align-items:flex-end}
.h b{font-size:96px;color:#DEA503;letter-spacing:.04em}.h span{font-size:30px;font-weight:600;text-align:right;line-height:1.35;color:#8CC573}
.board{position:absolute;left:50px;right:50px;top:420px;background:#111;border-radius:24px;padding:26px;box-shadow:inset 0 0 0 4px #2a2a2a}
.hd{display:grid;grid-template-columns:1.6fr 1fr .9fr;padding:0 20px 16px;font-size:24px;color:#8CC573;letter-spacing:.1em}
.r{display:grid;grid-template-columns:1.6fr 1fr .9fr;align-items:center;background:#1c1c1c;border-radius:14px;padding:22px 20px;margin-top:14px}
.r .c{display:flex;align-items:center;gap:12px;font-size:32px}.r .v{font-size:33px;color:#FCD116;white-space:nowrap}.r .v small{display:block;font-size:20px;color:#bbb;font-weight:600}
.r .s{font-size:26px;color:#4ade80;text-align:right;letter-spacing:.08em}
.foot{position:absolute;left:0;right:0;top:1440px;text-align:center}`;
export const S09 = (x) => {
  const rows = ["CLVE", "CLPE", "CLCO", "PEVE", "COVE"].map((k) => {
    const c = CORR[k], r = x.R[k];
    return `<div class="r"><div class="c">${sqFlag(c.a, 64)}<span style="opacity:.6">→</span>${sqFlag(c.b, 64)}<span style="font-size:28px;line-height:1.15">${c.an}<br>a ${c.bn}</span></div>
<div class="v num">${rateTxt(x.Rs[k])} ${c.ub}<small>por 1 ${c.ua}</small></div><div class="s">A TIEMPO</div></div>`;
  }).join("");
  return page(1080, 1920, css09, `<div class="bg"></div>
<div class="h"><b>SALIDAS</b><span>Tasas de las ${x.hh}<br>${diaNombre(x.d)} ${fechaCorta(x.d)}</span></div>
<div class="board"><div class="hd"><span>DESTINO</span><span>TASA</span><span style="text-align:right">ESTADO</span></div>${rows}</div>
<div class="foot"><div style="font-size:36px;margin-bottom:30px">Desde Chile, Perú y Colombia ✈️</div>${pill("superenvios.app")}</div>
<div class="legal" style="bottom:130px">Tasas referenciales de las ${x.hh}; se actualizan cada hora. Las finales son las de superenvios.app al enviar.</div>`);
};

// S10 · último llamado (Chile → Venezuela, cierre del día)
const css10 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1200px at 30% 25%,#3a9c52 0%,#2F8F48 55%,#27803e 100%)}
.tag{position:absolute;left:70px;top:250px;background:#E0302B;color:#fff;font-size:34px;padding:12px 24px 16px;border-radius:16px;letter-spacing:.06em}
.h{position:absolute;left:70px;top:350px;width:640px;font-size:92px;line-height:1.02}.h b{color:#DEA503}
.cl{position:absolute;left:70px;top:720px;width:680px;background:#fff;color:#0E5A2C;border-radius:36px;padding:40px 44px}
.cl small{display:block;font-size:30px;font-weight:600;color:#3b6b48}.cl b{display:block;font-size:62px;white-space:nowrap;color:#00913E;line-height:1.05;margin:8px 0}`;
export const S10 = (x) => {
  const c = CORR.CLVE, r = x.R.CLVE;
  return page(1080, 1920, css10, `<div class="bg"></div>
${plusses([[860, 230, 120, "plusW", 10]])}
${ico("clock", "left:700px;top:330px;width:250px;height:274px;transform:rotate(8deg)")}
<span class="tag">ÚLTIMO LLAMADO</span>
<div class="h">Hoy envías hasta las <b>${cierre(x.d)}</b></div>
<div class="cl"><small>Tasa de las ${x.hh}</small><b class="num">${unitLine(c, x.Rs.CLVE)}</b><small>${amtA(c, 100000)} → <span style="color:#0E5A2C">${recv(c, r, 100000)}</span></small></div>
${person("YiMUmTMcN_c", "right:-60px;bottom:-10px;height:880px")}
<div style="position:absolute;left:70px;top:1180px">${pill("superenvios.app")}</div>
<div class="legal" style="text-align:left;right:430px">Tasa referencial; se actualiza cada hora. La final es la de superenvios.app al enviar.</div>`);
};

// ═════════════════════════ FEED (1080×1350) ═════════════════════════
const cssF1 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 900px at 30% 30%,#f2bd1c 0%,#DEA503 60%,#c99402 100%)}
.top{position:absolute;left:70px;top:70px;right:70px;display:flex;justify-content:space-between;align-items:center;color:#0E5A2C}
.top img{height:84px}.top span{font-size:30px;text-align:right;line-height:1.3}
.h{position:absolute;left:70px;top:230px;width:600px;color:#0E5A2C;font-size:58px;line-height:1.12}
.rt{position:absolute;left:70px;top:420px;width:560px;background:#fff;border-radius:36px;padding:40px 44px;color:#0E5A2C;box-shadow:0 20px 40px rgba(80,50,0,.25)}
.rt .pair{margin-bottom:20px}.rt b{display:block;white-space:nowrap;font-size:84px;line-height:1;color:#00913E;letter-spacing:-2px}.rt b small{font-size:48px}
.rt span{display:block;font-size:28px;font-weight:600;color:#3b6b48;margin-top:10px}
.ej{margin-top:24px;border-top:3px dashed #cfe3d3;padding-top:18px;display:flex;flex-direction:column;gap:10px;font-size:32px}.ej div{display:flex;justify-content:space-between}`;
export const F1 = (x) => {
  const c = CORR.CLVE, r = x.R.CLVE;
  return page(1080, 1350, cssF1, `<div class="bg"></div>
${plusses([[900, 260, 110, "plusW", 12], [600, 1180, 90, "plus", -8]])}
<div class="top"><img src="assets/logos/tipo_verde.png"><span>${diaNombre(x.d)} ${fechaCorta(x.d)}<br>Tasa de las ${x.hh}</span></div>
<div class="h">La tasa de hoy a Venezuela</div>
<div class="rt">${pair(c, 96)}<b class="num">${rateTxt(x.Rs.CLVE)} <small>Bs</small></b><span>por cada 1 CLP</span>
<div class="ej">${c.ej.map((n) => `<div><span>${amtA(c, n)}</span><b style="font-size:32px;display:inline;color:#0E5A2C">${recv(c, r, n)}</b></div>`).join("")}</div></div>
${person("K8_rRfORBl8", "right:-170px;bottom:0;height:900px")}
<div style="position:absolute;left:70px;top:1150px">${pill("superenvios.app", "font-size:40px")}</div>`);
};

const cssF2 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 900px at 70% 20%,#3a9c52 0%,#2F8F48 55%,#27803e 100%)}
.top{position:absolute;left:70px;top:66px;right:70px;display:flex;justify-content:space-between;align-items:center}
.top img{height:80px}.top span{font-size:28px;text-align:right;line-height:1.3}
.main{position:absolute;left:70px;right:70px;top:210px;background:#fff;color:#0E5A2C;border-radius:40px;padding:44px 50px;display:flex;align-items:center;gap:36px;box-shadow:0 20px 40px rgba(0,40,15,.25)}
.main b{display:block;white-space:nowrap;font-size:100px;line-height:1;color:#00913E;letter-spacing:-2px}.main small{display:block;font-size:30px;font-weight:600;color:#3b6b48;margin-top:8px}
.sec{position:absolute;left:70px;right:70px;top:640px;display:grid;grid-template-columns:1fr 1fr;gap:30px}
.sec div{background:#0E5A2C;border-radius:32px;padding:34px 36px}.sec .pair{margin-bottom:18px}
.sec b{display:block;font-size:56px;color:#DEA503}.sec small{display:block;font-size:26px;font-weight:600;opacity:.85;margin-top:8px}
.foot{position:absolute;left:70px;right:70px;top:1080px;display:flex;justify-content:space-between;align-items:center}
.foot span{font-size:28px;line-height:1.35;max-width:520px}`;
export const F2 = (x) => {
  const v = CORR.CLVE, co = CORR.CLCO, pe = CORR.CLPE;
  return page(1080, 1350, cssF2, `<div class="bg"></div>
${plusses([[960, 560, 90, "plusW", 10], [20, 990, 80, "plusL"]])}
<div class="top"><img src="assets/logos/tipo_blanco.png"><span>${diaNombre(x.d)} ${fechaCorta(x.d)}<br>Tasas de las ${x.hh}</span></div>
<div class="main">${pair(v, 120)}<div><b class="num">${rateTxt(x.Rs.CLVE)} Bs</b><small>por cada 1 CLP · Chile → Venezuela</small></div></div>
<div class="sec"><div>${pair(co, 84)}<b class="num">${rateTxt(x.Rs.CLCO)} COP</b><small>por cada 1 CLP · a Colombia</small></div>
<div>${pair(pe, 84)}<b class="num">${rateTxt(x.Rs.CLPE)} PEN</b><small>por cada 1 CLP · a Perú</small></div></div>
<div class="foot"><span>Comisión del servicio incluida en la tasa · de 15 minutos a 2 horas</span>${pill("superenvios.app", "font-size:38px")}</div>`);
};

export const STORIES = { S01, S02, S03, S04, S05, S06, S07, S08, S09, S10 };
export const FEEDS = { F1, F2 };
