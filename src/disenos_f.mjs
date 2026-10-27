// disenos_f.mjs — juego F (martes): gráficos estilo bolsa y análisis técnico tipo TradingView, con el historial REAL de la API (últimas 48 h).
// Velas de 2 h (apertura = cierre anterior), medias móviles, bandas de Bollinger, RSI 14, máximos y mínimos de 24 h.
// Solo se describe lo que pasó (sin pronósticos ni recomendaciones de compra/venta).
// F01 modelo SET con velas · F02 velas TradingView + media móvil · F03 ficha de cotización (Perú) · F04 velas + RSI + soporte/resistencia
// F05 área + cinta de cotizaciones (Colombia) · F06 histograma hora a hora (Perú → Venezuela) · F07 medias móviles 6 y 12 · F08 bandas de Bollinger (Colombia → Venezuela)
// F09 mapa de calor de los 5 corredores · F10 resumen de la jornada · F6 feed (Venezuela + Colombia + Perú)
import { ICONS } from "./icons.mjs";
import { page, sqFlag, CORR, rateTxt, unitLine, recv, fmt, fechaCorta, diaNombre, horario, cierre } from "./disenos.mjs";

const ico = (n, st) => `<div class="ico" style="${st}">${ICONS[n]}</div>`;
const plusses = (l) => l.map(([x, y, s, v = "plus", r = 0]) => ico(v, `left:${x}px;top:${y}px;width:${s}px;height:${s}px;transform:rotate(${r}deg)`)).join("");
const pill = (t = "Superenvios.app", st = "") => `<span class="pill" style="${st}">${t}</span>`;
const chev = (c = "#2E8B3E") => `<svg width="46" height="46" viewBox="0 0 24 24"><path d="M8 4l8 8-8 8" fill="none" stroke="${c}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const pair = (c, s = 110, col) => `<div class="pair">${sqFlag(c.a, s)}${chev(col)}${sqFlag(c.b, s)}</div>`;
const amtA = (c, n) => (c.simA ? `${c.simA} ${fmt(n)}` : `${fmt(n)} ${c.ua}`);
const legal = (hh, col = "#fff", bottom = 150) => `<div class="legal" style="color:${col};bottom:${bottom}px">Tasa referencial de las ${hh}; se actualiza cada hora. Gráfico con datos reales de superenvios.app (últimas horas). La final es la de superenvios.app al enviar.</div>`;
const phoneSET = (st) => `<div class="ph" style="${st}"><div class="ph-scr"><img src="assets/logos/iso_blanco.png"></div></div>`;
const foot = (top, t = "superenvios.app") => `<div style="position:absolute;left:0;right:0;top:${top}px;text-align:center">${pill(t)}</div>`;

// ---------- indicadores ----------
const DEC = { CLVE: 4, CLPE: 6, CLCO: 3, PEVE: 2, COVE: 5 }; // decimales de los ejes
const TV = { bg: "#131722", grid: "#2a2e39", txt: "#b2b5be", up: "#26a69a", dn: "#ef5350", ma: "#2962ff", ma2: "#ff9800", rsi: "#7e57c2" };
const vals = (s) => s.map((p) => p.v);
const last24 = (s) => s.slice(-24);
const cambio24 = (s) => { const a = s[Math.max(0, s.length - 25)].v, b = s[s.length - 1].v; return (b / a - 1) * 100; };
const pct = (p) => `${p >= 0 ? "▲" : "▼"} ${fmt(Math.abs(p), 2)} %`;
const pcol = (p, up = TV.up, dn = TV.dn) => (p >= 0 ? up : dn);
const sma = (a, n) => a.map((_, i) => (i < n - 1 ? null : a.slice(i - n + 1, i + 1).reduce((s, v) => s + v, 0) / n));
function rsi(a, n = 14) {
  const out = a.map(() => null);
  if (a.length <= n) return out;
  let g = 0, l = 0;
  for (let i = 1; i <= n; i++) { const d = a[i] - a[i - 1]; if (d > 0) g += d; else l -= d; }
  g /= n; l /= n; out[n] = l === 0 ? 100 : 100 - 100 / (1 + g / l);
  for (let i = n + 1; i < a.length; i++) { const d = a[i] - a[i - 1]; g = (g * (n - 1) + Math.max(d, 0)) / n; l = (l * (n - 1) + Math.max(-d, 0)) / n; out[i] = l === 0 ? 100 : 100 - 100 / (1 + g / l); }
  return out;
}
const boll = (a, n = 12, k = 2) => a.map((_, i) => { if (i < n - 1) return null; const w = a.slice(i - n + 1, i + 1), m = w.reduce((s, v) => s + v, 0) / n, sd = Math.sqrt(w.reduce((s, v) => s + (v - m) ** 2, 0) / n); return { m, up: m + k * sd, lo: m - k * sd }; });
// velas de 2 h a partir de los registros horarios: apertura = cierre de la vela anterior
function velas(s) {
  // se agrupa desde el final para que la última vela cierre SIEMPRE en la tasa actual
  const ini = (s.length - 1) % 2, out = []; let o = s[ini].v;
  for (let i = ini + 1; i + 1 < s.length; i += 2) { const p = [o, s[i].v, s[i + 1].v]; out.push({ o, c: s[i + 1].v, h: Math.max(...p), l: Math.min(...p), hh: s[i + 1].hh }); o = s[i + 1].v; }
  return out;
}

// ---------- dibujo ----------
function escala(min, max, h, pad = 20) { const r = max - min || max * 0.001 || 1; return (v) => pad + (max - v) / r * (h - 2 * pad); }
const rango = (arr) => { const a = arr.filter((v) => v != null); const mn = Math.min(...a), mx = Math.max(...a), m = (mx - mn) * 0.12 || mx * 0.0005; return [mn - m, mx + m]; };
const linea = (a, X, Y, col, w = 4, dash = "") => { const p = a.map((v, i) => (v == null ? null : `${X(i).toFixed(1)},${Y(v).toFixed(1)}`)).filter(Boolean); return `<polyline points="${p.join(" ")}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`; };
const rejilla = (w, h, n, col) => Array.from({ length: n + 1 }, (_, i) => `<line x1="0" x2="${w}" y1="${(h * i / n).toFixed(1)}" y2="${(h * i / n).toFixed(1)}" stroke="${col}" stroke-width="2"/>`).join("");
function svgVelas(cs, w, h, { k, extra = [], grid = TV.grid, up = TV.up, dn = TV.dn, axis = TV.txt, marcas = false } = {}) {
  const lo = Math.min(...cs.map((c) => c.l)), hi = Math.max(...cs.map((c) => c.h));
  const [mn, mx] = rango([lo, hi, ...extra.flat()]);
  const Y = escala(mn, mx, h), cw = (w - 130) / cs.length, X = (i) => i * cw + cw / 2;
  let g = rejilla(w - 130, h, 4, grid);
  cs.forEach((c, i) => { const col = c.c >= c.o ? up : dn, x = X(i), y1 = Y(Math.max(c.o, c.c)), y2 = Y(Math.min(c.o, c.c));
    g += `<line x1="${x}" x2="${x}" y1="${Y(c.h)}" y2="${Y(c.l)}" stroke="${col}" stroke-width="3"/><rect x="${x - cw * 0.32}" y="${y1}" width="${cw * 0.64}" height="${Math.max(3, y2 - y1)}" fill="${col}" rx="2"/>`; });
  for (let i = 0; i <= 4; i++) { const v = mx - (mx - mn) * i / 4; g += `<text x="${w - 120}" y="${(h * i / 4 + (i === 0 ? 22 : i === 4 ? -6 : 8)).toFixed(1)}" font-size="22" fill="${axis}" font-family="Arial">${fmt(v, DEC[k])}</text>`; }
  const ult = cs[cs.length - 1], yc = Y(ult.c);
  g += `<line x1="0" x2="${w - 130}" y1="${yc}" y2="${yc}" stroke="${ult.c >= ult.o ? up : dn}" stroke-width="2" stroke-dasharray="6 6"/><rect x="${w - 128}" y="${yc - 20}" width="128" height="40" rx="6" fill="${ult.c >= ult.o ? up : dn}"/><text x="${w - 122}" y="${yc + 9}" font-size="23" fill="#fff" font-family="Arial" font-weight="700">${fmt(ult.c, DEC[k])}</text>`;
  if (marcas) { const iH = cs.findIndex((c) => c.h === hi), iL = cs.findIndex((c) => c.l === lo);
    g += `<text x="${Math.min(X(iH), w - 330)}" y="${Y(hi) - 14}" font-size="24" fill="${axis}" font-family="Arial">Máx. ${fmt(hi, DEC[k])}</text><text x="${Math.min(X(iL), w - 330)}" y="${Y(lo) + 34}" font-size="24" fill="${axis}" font-family="Arial">Mín. ${fmt(lo, DEC[k])}</text>`; }
  return { g, X, Y, cw, mn, mx };
}
const horasEje = (s, X, h, col, cada = 6) => s.map((p, i) => (i % cada === 0 ? `<text x="${X(i) - 30}" y="${h + 34}" font-size="22" fill="${col}" font-family="Arial">${p.hh}</text>` : "")).join("");

// ═════════════ HISTORIAS ═════════════
// F01 · modelo SET con mini gráfico de velas (24 h)
const c01 = `.bg{position:absolute;inset:0;background:radial-gradient(900px 1200px at 50% 45%,#47a85a 0%,#3d9a4f 60%,#358a46 100%)}
.panel{position:absolute;left:120px;top:440px;width:840px;height:1150px;border-radius:44px;background:#2f8a40;box-shadow:-18px 22px 0 #2a7c3a}
.tt{position:absolute;left:180px;top:490px;line-height:1.15}.tt b{display:block;font-size:66px}.tt span{display:block;font-size:36px;font-weight:400;margin-top:10px}
.box{position:absolute;left:180px;width:720px;background:#fff;border-radius:30px;color:#2E8B3E;box-shadow:0 14px 30px rgba(0,40,15,.18)}
.box .pair{position:absolute;right:30px;top:-46px}
.box b{display:block;font-size:100px;padding:80px 0 0 44px}.box small{display:block;font-size:28px;color:#5c7a64;padding:6px 44px 30px}`;
export const F01 = (x) => { const s = x.S.CLVE, cs = velas(last24(s.slice(-25))), ch = svgVelas(cs, 660, 300, { k: "CLVE", grid: "#e8efe9", axis: "#5c7a64" }), p = cambio24(s);
  return page(1080, 1920, c01, `<div class="bg"></div>
${plusses([[96, 140, 160, "plusL"], [880, 300, 90, "plusW"]])}
${phoneSET("left:140px;top:150px;width:210px;height:460px;transform:rotate(-3deg)")}
<div style="position:absolute;left:380px;top:250px;transform:rotate(-3deg)">${pill("Superenvios.app", "font-size:50px")}</div>
<div class="panel"></div><div class="tt"><b>Tasa de cambio</b><span>${fechaCorta(x.d)} · ${horario(x.d)}</span></div>
<div class="box" style="top:760px">${pair(CORR.CLVE, 116)}<b class="num">${rateTxt(x.Rs.CLVE)}</b><small>Bs por cada 1 CLP · <span style="color:${pcol(p)}">${pct(p)} en 24 h</span></small></div>
<div class="box" style="top:1150px;padding:26px 30px"><div style="font-size:26px;color:#5c7a64;margin-bottom:10px">Últimas 24 h · velas de 2 horas</div><svg width="660" height="300" viewBox="0 0 660 300">${ch.g}</svg></div>
${legal(x.hh, "#e3f2e6", 140)}`); };

// F02 · velas estilo TradingView (oscuro) + media móvil de 6 h
const c02 = `.bg{position:absolute;inset:0;background:${TV.bg};color:#d1d4dc}
.hd{position:absolute;left:50px;right:50px;top:240px;display:flex;align-items:center;gap:20px}
.hd b{font-size:46px;color:#fff}.hd span{font-size:28px;color:${TV.txt}}
.ohlc{position:absolute;left:50px;right:50px;top:330px;font-size:26px;color:${TV.txt};font-family:Arial}.ohlc i{font-style:normal;margin-right:16px}
.wm{position:absolute;left:0;right:0;top:760px;text-align:center;font-size:150px;color:rgba(255,255,255,.04);font-family:Arial;font-weight:700}
.big{position:absolute;left:50px;top:1300px;font-size:84px;font-family:Arial;font-weight:700;color:#fff}.big small{font-size:34px;margin-left:16px}
.lg{position:absolute;left:50px;top:400px;font-size:24px;font-family:Arial}`;
export const F02 = (x) => { const s = x.S.CLVE, cs = velas(s), cl = cs.map((c) => c.c), m = sma(cl, 3), ch = svgVelas(cs, 980, 820, { k: "CLVE", extra: [m.filter(Boolean)] }), u = cs[cs.length - 1], p = cambio24(s);
  const X = ch.X, Y = ch.Y;
  return page(1080, 1920, c02, `<div class="bg"></div><div class="wm">CLP/BS</div>
<div class="hd">${sqFlag("CL", 70)}${sqFlag("VE", 70)}<b>CLP / BS</b><span>· 2H · Súper Envíos Today</span></div>
<div class="ohlc"><i>A <b style="color:#fff">${fmt(u.o, 4)}</b></i><i>Máx <b style="color:#fff">${fmt(u.h, 4)}</b></i><i>Mín <b style="color:#fff">${fmt(u.l, 4)}</b></i><i>C <b style="color:${pcol(u.c - u.o)}">${fmt(u.c, 4)}</b></i></div>
<div class="lg"><span style="color:${TV.ma}">━ Media móvil (3 velas = 6 h)</span></div>
<svg style="position:absolute;left:50px;top:450px" width="980" height="860" viewBox="0 0 980 860">${ch.g}${linea(m, X, Y, TV.ma, 4)}${horasEje(s.filter((_, i) => i % 2 === 0 && i > 0).slice(0, cs.length), X, 820, TV.txt, 4)}</svg>
<div class="big num">${rateTxt(x.Rs.CLVE)}<small style="color:${pcol(p)}">${pct(p)} · 24 h</small></div>
${foot(1460)}${legal(x.hh, TV.txt, 140)}`); };

// F03 · ficha de cotización (Chile → Perú)
const c03 = `.bg{position:absolute;inset:0;background:#0b0f14;color:#e6e9ee}
.tk{position:absolute;left:60px;right:60px;top:240px;display:flex;justify-content:space-between;align-items:center}.tk b{font-size:52px}.tk span{font-size:28px;color:#8b95a1}
.px{position:absolute;left:60px;top:360px;font-size:150px;font-family:Arial;font-weight:700;letter-spacing:-4px}
.ch{position:absolute;left:60px;top:540px;font-size:44px;font-family:Arial;font-weight:700}
.sp{position:absolute;left:40px;top:640px;width:1000px;height:520px}
.st{position:absolute;left:60px;right:60px;top:1200px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.st div{background:#151b23;border-radius:20px;padding:22px 24px}.st small{display:block;font-size:24px;color:#8b95a1}.st b{display:block;font-size:34px;font-family:Arial;margin-top:6px}`;
export const F03 = (x) => { const s = last24(x.S.CLPE), a = vals(s), p = cambio24(x.S.CLPE), col = pcol(p, "#22c55e", "#ef4444"), [mn, mx] = rango(a), Y = escala(mn, mx, 480), X = (i) => i * 1000 / (a.length - 1);
  const area = `M0,${Y(a[0])} ` + a.map((v, i) => `L${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ") + ` L1000,480 L0,480 Z`;
  const avg = a.reduce((q, v) => q + v, 0) / a.length;
  return page(1080, 1920, c03, `<div class="bg"></div>
<div class="tk"><div style="display:flex;gap:16px;align-items:center">${sqFlag("CL", 70)}${sqFlag("PE", 70)}<b>CLP / PEN</b></div><span>Cotización · ${x.hh}</span></div>
<div class="px num">${rateTxt(x.Rs.CLPE)}</div><div class="ch" style="color:${col}">${pct(p)} en las últimas 24 h</div>
<svg class="sp" viewBox="0 0 1000 520"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".35"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient></defs>
<path d="${area}" fill="url(#ga)"/>${linea(a, X, Y, col, 5)}<line x1="0" x2="1000" y1="${Y(avg)}" y2="${Y(avg)}" stroke="#8b95a1" stroke-width="2" stroke-dasharray="8 8"/>${horasEje(s, X, 480, "#8b95a1", 6)}</svg>
<div class="st"><div><small>Máx. 24 h</small><b class="num">${fmt(Math.max(...a), 6)}</b></div><div><small>Mín. 24 h</small><b class="num">${fmt(Math.min(...a), 6)}</b></div><div><small>Promedio</small><b class="num">${fmt(avg, 6)}</b></div></div>
<div style="position:absolute;left:60px;right:60px;top:1370px;font-size:34px;color:#e6e9ee">${amtA(CORR.CLPE, 100000)} → <b style="color:#22c55e">${recv(CORR.CLPE, x.R.CLPE, 100000)}</b></div>
${foot(1470)}${legal(x.hh, "#8b95a1", 140)}`); };

// F04 · velas + RSI 14 + soporte/resistencia (24 h)
const c04 = `.bg{position:absolute;inset:0;background:${TV.bg};color:#d1d4dc}
.hd{position:absolute;left:50px;right:50px;top:230px;display:flex;justify-content:space-between;align-items:center}.hd b{font-size:44px;color:#fff}.hd span{font-size:26px;color:${TV.txt}}
.rate{position:absolute;left:50px;right:50px;top:320px;background:#0E5A2C;border-radius:40px;padding:34px 40px 36px;box-shadow:0 0 0 4px #DEA503}
.rate .pair{display:flex;align-items:center;gap:6px}.rate .lb{font-size:34px;color:#FFF9EC;margin-top:18px}
.rate b.num{display:block;font-size:190px;line-height:1;color:#FCE27A;font-family:Arial;font-weight:700;letter-spacing:-4px;margin-top:10px}
.rate .ch{font-size:34px;font-family:Arial;font-weight:700;margin-top:12px}
.rs{position:absolute;left:50px;top:1250px;font-size:24px;color:${TV.txt};font-family:Arial}`;
export const F04 = (x) => { const s = x.S.CLVE, cs = velas(s), a24 = vals(last24(s)), hi = Math.max(...a24), lo = Math.min(...a24), p = cambio24(s);
  const ch = svgVelas(cs, 980, 400, { k: "CLVE", extra: [[hi, lo]] }), r = rsi(vals(s)), rr = r[r.length - 1];
  const RX = (i) => i * 850 / (r.length - 1), RY = (v) => 8 + (100 - v) / 100 * 114;
  const nivel = (v, col, t) => `<line x1="0" x2="850" y1="${ch.Y(v)}" y2="${ch.Y(v)}" stroke="${col}" stroke-width="3" stroke-dasharray="14 8"/><text x="10" y="${ch.Y(v) - 10}" font-size="24" fill="${col}" font-family="Arial">${t} ${fmt(v, 4)}</text>`;
  return page(1080, 1920, c04, `<div class="bg"></div>
<div class="hd"><b>CLP / BS · análisis</b><span>${diaNombre(x.d)} ${fechaCorta(x.d)} · ${x.hh}</span></div>
<div class="rate">${pair(CORR.CLVE, 100, "#DEA503")}<div class="lb">Tasa de las ${x.hh} · Bs por cada 1 CLP</div><b class="num">${rateTxt(x.Rs.CLVE)}</b><div class="ch" style="color:${pcol(p)}">${pct(p)} en 24 h</div></div>
<svg style="position:absolute;left:50px;top:830px" width="980" height="420" viewBox="0 0 980 420">${ch.g}${nivel(hi, TV.up, "Máx. 24 h")}${nivel(lo, TV.dn, "Mín. 24 h")}</svg>
<div class="rs">RSI 14 (horario): <b style="color:${TV.rsi}">${fmt(rr ?? 50, 1)}</b></div>
<svg style="position:absolute;left:50px;top:1290px" width="980" height="130" viewBox="0 0 980 130"><rect x="0" y="${RY(70)}" width="850" height="${RY(30) - RY(70)}" fill="rgba(126,87,194,.12)"/>
<line x1="0" x2="850" y1="${RY(70)}" y2="${RY(70)}" stroke="${TV.grid}" stroke-width="2" stroke-dasharray="6 6"/><line x1="0" x2="850" y1="${RY(30)}" y2="${RY(30)}" stroke="${TV.grid}" stroke-width="2" stroke-dasharray="6 6"/>
${linea(r, RX, RY, TV.rsi, 4)}<text x="870" y="${RY(70) + 8}" font-size="22" fill="${TV.txt}" font-family="Arial">70</text><text x="870" y="${RY(30) + 8}" font-size="22" fill="${TV.txt}" font-family="Arial">30</text></svg>
${foot(1500)}${legal(x.hh, TV.txt, 130)}`); };

// F05 · cinta de cotizaciones + área (Chile → Colombia)
const c05 = `.bg{position:absolute;inset:0;background:#F4F7F5}
.tape{position:absolute;left:0;right:0;top:220px;height:86px;background:#0E5A2C;display:flex;align-items:center;gap:40px;padding:0 30px;white-space:nowrap;overflow:hidden;color:#fff;font-size:28px;font-family:Arial}
.tape b{margin-left:8px}
.h{position:absolute;left:70px;right:70px;top:360px;color:#0E5A2C;font-size:64px;line-height:1.1}.h b{color:#003893}
.px{position:absolute;left:70px;top:540px;color:#003893;font-size:120px;font-family:Arial;font-weight:700}
.ch{position:absolute;left:70px;top:680px;font-size:38px;font-family:Arial;font-weight:700}
.ar{position:absolute;left:40px;top:760px;width:1000px;height:520px}`;
export const F05 = (x) => { const s = last24(x.S.CLCO), a = vals(s), p = cambio24(x.S.CLCO), [mn, mx] = rango(a), Y = escala(mn, mx, 480), X = (i) => i * 1000 / (a.length - 1);
  const tape = ["CLVE", "CLPE", "CLCO", "PEVE", "COVE"].map((k) => { const q = cambio24(x.S[k]); return `<span>${CORR[k].ua}/${CORR[k].ub} <b>${rateTxt(x.Rs[k])}</b> <b style="color:${pcol(q, "#8be28b", "#ff8a80")}">${pct(q)}</b></span>`; }).join("");
  const area = `M0,${Y(a[0])} ` + a.map((v, i) => `L${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ") + ` L1000,480 L0,480 Z`;
  return page(1080, 1920, c05, `<div class="bg"></div><div class="tape">${tape}</div>
<div class="h">Así se movió hoy la tasa a <b>Colombia</b></div>
<div class="px num">${rateTxt(x.Rs.CLCO)} <span style="font-size:44px">COP</span></div><div class="ch" style="color:${pcol(p, "#00913E", "#E0302B")}">${pct(p)} en 24 h · por cada 1 CLP</div>
<svg class="ar" viewBox="0 0 1000 520"><defs><linearGradient id="gc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#003893" stop-opacity=".3"/><stop offset="1" stop-color="#003893" stop-opacity="0"/></linearGradient></defs>
${rejilla(1000, 480, 4, "#dfe7e2")}<path d="${area}" fill="url(#gc)"/>${linea(a, X, Y, "#003893", 5)}<circle cx="${X(a.length - 1)}" cy="${Y(a[a.length - 1])}" r="12" fill="#FCD116" stroke="#003893" stroke-width="5"/>${horasEje(s, X, 480, "#5c6a60", 6)}</svg>
<div style="position:absolute;left:70px;right:70px;top:1330px;font-size:36px;color:#0E5A2C">${amtA(CORR.CLCO, 100000)} → <b style="color:#003893">${recv(CORR.CLCO, x.R.CLCO, 100000)}</b></div>
${foot(1440)}${legal(x.hh, "#5c6a60", 140)}`); };

// F06 · histograma de variación hora a hora (Perú → Venezuela)
const c06 = `.bg{position:absolute;inset:0;background:${TV.bg};color:#d1d4dc}
.h{position:absolute;left:60px;right:60px;top:240px;font-size:58px;line-height:1.12;color:#fff}.h b{color:${TV.up}}
.px{position:absolute;left:60px;top:420px;font-size:96px;font-family:Arial;font-weight:700;color:#fff}.px small{font-size:36px;color:${TV.txt};margin-left:10px}`;
export const F06 = (x) => { const s = last24(x.S.PEVE), a = vals(s), d = a.slice(1).map((v, i) => v - a[i]), m = Math.max(...d.map(Math.abs)) || 1;
  const W = 960, H = 640, bw = W / d.length, Y0 = 340, Y = escala(...rango(a), 300, 10);
  const bars = d.map((v, i) => `<rect x="${(i * bw + bw * 0.15).toFixed(1)}" y="${v >= 0 ? Y0 - v / m * 260 : Y0}" width="${(bw * 0.7).toFixed(1)}" height="${Math.max(2, Math.abs(v) / m * 260)}" fill="${pcol(v)}" rx="3"/>`).join("");
  return page(1080, 1920, c06, `<div class="bg"></div>
<div class="h">Perú → Venezuela: <b>hora a hora</b></div>
<div class="px num">${rateTxt(x.Rs.PEVE)}<small>Bs por 1 PEN · ${x.hh}</small></div>
<svg style="position:absolute;left:60px;top:580px" width="${W}" height="${H + 60}" viewBox="0 0 ${W} ${H + 60}">
<line x1="0" x2="${W}" y1="${Y0}" y2="${Y0}" stroke="${TV.grid}" stroke-width="3"/>${bars}
<text x="0" y="${Y0 - 280}" font-size="24" fill="${TV.txt}" font-family="Arial">Variación de cada hora vs. la anterior (Bs)</text>
${s.slice(1).map((p, i) => (i % 6 === 0 ? `<text x="${i * bw}" y="${H}" font-size="22" fill="${TV.txt}" font-family="Arial">${p.hh}</text>` : "")).join("")}</svg>
<div style="position:absolute;left:60px;right:60px;top:1300px;font-size:36px;color:#fff">${amtA(CORR.PEVE, 100)} → <b style="color:#FCE27A">${recv(CORR.PEVE, x.R.PEVE, 100)}</b></div>
${foot(1420)}${legal(x.hh, TV.txt, 140)}`); };

// F07 · medias móviles de 6 y 12 horas (Chile → Venezuela)
const c07 = `.bg{position:absolute;inset:0;background:#fff;color:#1F2A22}
.h{position:absolute;left:60px;right:60px;top:240px;font-size:60px;line-height:1.1;color:#0E5A2C}.h b{color:#00913E}
.lg{position:absolute;left:60px;top:420px;display:flex;gap:30px;font-size:26px;font-family:Arial}
.ob{position:absolute;left:60px;right:60px;top:1230px;background:#F1F8EE;border-radius:24px;padding:26px 30px;font-size:34px;line-height:1.35;color:#0E5A2C}`;
export const F07 = (x) => { const s = last24(x.S.CLVE.slice(-36)), all = vals(x.S.CLVE.slice(-36)), m6 = sma(all, 6).slice(-24), m12 = sma(all, 12).slice(-24), a = vals(s);
  const [mn, mx] = rango([...a, ...m6, ...m12]), Y = escala(mn, mx, 700), X = (i) => i * 960 / (a.length - 1), cur = a[a.length - 1], v12 = m12[m12.length - 1];
  const frase = cur >= v12 ? `La tasa está <b>por encima</b> de su promedio de las últimas 12 horas (${fmt(v12, 4)}).` : `La tasa está <b>por debajo</b> de su promedio de las últimas 12 horas (${fmt(v12, 4)}).`;
  return page(1080, 1920, c07, `<div class="bg"></div>
<div class="h">Chile → Venezuela con <b>medias móviles</b></div>
<div class="lg"><span style="color:#0E5A2C">━ Tasa</span><span style="color:${TV.ma}">━ Media 6 h</span><span style="color:${TV.ma2}">━ Media 12 h</span></div>
<svg style="position:absolute;left:60px;top:470px" width="960" height="740" viewBox="0 0 960 740">${rejilla(960, 700, 4, "#eef2ef")}${linea(m12, X, Y, TV.ma2, 5)}${linea(m6, X, Y, TV.ma, 5)}${linea(a, X, Y, "#0E5A2C", 6)}<circle cx="${X(a.length - 1)}" cy="${Y(cur)}" r="12" fill="#DEA503"/>${horasEje(s, X, 700, "#5c6a60", 6)}</svg>
<div class="ob">Tasa de las ${x.hh}: <b class="num">${unitLine(CORR.CLVE, x.Rs.CLVE)}</b><br>${frase}</div>
${foot(1480)}${legal(x.hh, "#5c6a60", 140)}`); };

// F08 · bandas de Bollinger (Colombia → Venezuela)
const c08 = `.bg{position:absolute;inset:0;background:${TV.bg};color:#d1d4dc}
.h{position:absolute;left:60px;right:60px;top:240px;font-size:56px;line-height:1.12;color:#fff}.h b{color:#FCD116}
.lg{position:absolute;left:60px;top:400px;font-size:26px;font-family:Arial;color:${TV.txt}}`;
export const F08 = (x) => { const all = vals(x.S.COVE.slice(-36)), b = boll(all, 12, 2).slice(-24), a = all.slice(-24), s = x.S.COVE.slice(-24);
  const [mn, mx] = rango([...a, ...b.flatMap((q) => [q.up, q.lo])]), Y = escala(mn, mx, 720), X = (i) => i * 960 / (a.length - 1);
  const band = `M${b.map((q, i) => `${X(i).toFixed(1)},${Y(q.up).toFixed(1)}`).join(" L")} L${b.map((q, i) => [X(i).toFixed(1), Y(q.lo).toFixed(1)]).reverse().map((p) => p.join(",")).join(" L")} Z`;
  return page(1080, 1920, c08, `<div class="bg"></div>
<div class="h">Colombia → Venezuela con <b>bandas de Bollinger</b></div>
<div class="lg">Promedio 12 h ± 2 desviaciones · datos horarios reales</div>
<svg style="position:absolute;left:60px;top:450px" width="960" height="760" viewBox="0 0 960 760">${rejilla(960, 720, 4, TV.grid)}<path d="${band}" fill="rgba(41,98,255,.12)"/>
${linea(b.map((q) => q.up), X, Y, TV.ma, 3)}${linea(b.map((q) => q.lo), X, Y, TV.ma, 3)}${linea(b.map((q) => q.m), X, Y, TV.ma2, 3, "8 8")}${linea(a, X, Y, "#fff", 5)}
<circle cx="${X(a.length - 1)}" cy="${Y(a[a.length - 1])}" r="12" fill="#FCD116"/>${horasEje(s, X, 720, TV.txt, 6)}</svg>
<div style="position:absolute;left:60px;right:60px;top:1250px;font-size:36px;color:#fff">Tasa de las ${x.hh}: <b class="num" style="color:#FCD116">${unitLine(CORR.COVE, x.Rs.COVE)}</b><br>${amtA(CORR.COVE, 100000)} → <b>${recv(CORR.COVE, x.R.COVE, 100000)}</b></div>
${foot(1440)}${legal(x.hh, TV.txt, 140)}`); };

// F09 · mapa de calor de los 5 corredores (variación 24 h)
const c09 = `.bg{position:absolute;inset:0;background:#0b0f14;color:#e6e9ee}
.h{position:absolute;left:60px;right:60px;top:240px;display:flex;justify-content:space-between;align-items:flex-end}.h b{font-size:62px;line-height:1.05}.h span{font-size:26px;color:#8b95a1;text-align:right;line-height:1.35}
.hm{position:absolute;left:50px;right:50px;top:440px;display:grid;grid-template-columns:1fr 1fr;gap:16px}
.c{border-radius:22px;padding:28px 28px;min-height:250px;color:#fff}.c.w{grid-column:span 2;min-height:300px}
.c .f{display:flex;gap:8px}.c small{display:block;font-size:26px;margin-top:14px;opacity:.9}.c b{display:block;font-size:46px;font-family:Arial;margin-top:4px}.c i{display:block;font-style:normal;font-size:36px;font-family:Arial;font-weight:700;margin-top:6px}`;
export const F09 = (x) => { const tile = (p) => { const t = Math.min(1, Math.abs(p) / 1.5); return p >= 0 ? `rgba(38,166,154,${0.35 + 0.55 * t})` : `rgba(239,83,80,${0.35 + 0.55 * t})`; };
  return page(1080, 1920, c09, `<div class="bg"></div>
<div class="h"><b>Mapa de calor<br>de la tasa</b><span>Variación de 24 h<br>${x.hh} · ${fechaCorta(x.d)}</span></div>
<div class="hm">${["CLVE", "CLPE", "CLCO", "PEVE", "COVE"].map((k, i) => { const c = CORR[k], p = cambio24(x.S[k]); return `<div class="c${i === 0 ? " w" : ""}" style="background:${tile(p)}"><div class="f">${sqFlag(c.a, 64)}${sqFlag(c.b, 64)}</div><small>${c.an} a ${c.bn}</small><b class="num">${rateTxt(x.Rs[k])} ${c.ub}</b><i>${pct(p)}</i></div>`; }).join("")}</div>
<div style="position:absolute;left:0;right:0;top:1400px;text-align:center;font-size:30px;color:#8b95a1">Verde: subió en 24 h · Rojo: bajó en 24 h</div>
${foot(1480)}${legal(x.hh, "#8b95a1", 140)}`); };

// F10 · resumen de la jornada (vela del día) + cierre
const c10 = `.bg{position:absolute;inset:0;background:radial-gradient(1000px 1100px at 30% 25%,#3a9c52 0%,#2F8F48 55%,#27803e 100%)}
.h{position:absolute;left:80px;right:80px;top:240px;font-size:72px;line-height:1.06}.h b{color:#DEA503}
.cd{position:absolute;left:100px;top:520px;width:240px;height:760px}
.tb{position:absolute;left:400px;right:80px;top:560px;display:flex;flex-direction:column;gap:18px}
.tb div{background:#fff;color:#0E5A2C;border-radius:22px;padding:20px 26px}.tb small{display:block;font-size:26px;color:#3b6b48}.tb b{display:block;font-size:46px;font-family:Arial}`;
export const F10 = (x) => { const s = x.S.CLVE, hoy = s.filter((p) => p.dd === s[s.length - 1].dd && p.hh >= "09:00"), dia = hoy.length >= 2 ? hoy : s.slice(-10);
  const o = dia[0].v, c = dia[dia.length - 1].v, h = Math.max(...dia.map((p) => p.v)), l = Math.min(...dia.map((p) => p.v)), Y = escala(l - (h - l) * 0.15, h + (h - l) * 0.15, 760, 10), up = c >= o;
  return page(1080, 1920, c10, `<div class="bg"></div>
<div class="h">Resumen de la jornada: hoy cerramos a las <b>${cierre(x.d)}</b></div>
<svg class="cd" viewBox="0 0 240 760"><line x1="120" x2="120" y1="${Y(h)}" y2="${Y(l)}" stroke="#fff" stroke-width="8"/><rect x="40" y="${Y(Math.max(o, c))}" width="160" height="${Math.max(8, Y(Math.min(o, c)) - Y(Math.max(o, c)))}" rx="10" fill="${up ? "#26a69a" : "#ef5350"}" stroke="#fff" stroke-width="6"/></svg>
<div class="tb"><div><small>Apertura (${dia[0].hh})</small><b class="num">${fmt(o, 6)}</b></div><div><small>Máximo de hoy</small><b class="num">${fmt(h, 6)}</b></div>
<div><small>Mínimo de hoy</small><b class="num">${fmt(l, 6)}</b></div><div style="background:#DEA503"><small style="color:#0E5A2C">Ahora (${x.hh})</small><b class="num">${rateTxt(x.Rs.CLVE)} Bs</b></div></div>
<div style="position:absolute;left:80px;right:80px;top:1330px;font-size:36px">${amtA(CORR.CLVE, 100000)} → <b style="color:#FCE27A">${recv(CORR.CLVE, x.R.CLVE, 100000)}</b></div>
${foot(1440, "Envía en superenvios.app")}${legal(x.hh, "#e3f2e6", 140)}`); };

// F6 · feed del martes: panel de mercado (Venezuela + Colombia + Perú)
const cf6 = `.bg{position:absolute;inset:0;background:${TV.bg};color:#d1d4dc}
.top{position:absolute;left:60px;right:60px;top:60px;display:flex;justify-content:space-between;align-items:center}.top img{height:74px}.top span{font-size:26px;text-align:right;line-height:1.3;color:${TV.txt}}
.r{position:absolute;left:50px;right:50px;height:300px;background:#1b2030;border-radius:28px;display:grid;grid-template-columns:330px 1fr;align-items:center;padding:0 30px;gap:20px}
.r .t small{display:block;font-size:24px;color:${TV.txt};margin-top:10px}.r .t b{display:block;font-size:56px;color:#fff;font-family:Arial;margin-top:8px}.r .t i{font-style:normal;font-size:28px;font-family:Arial;font-weight:700}
.ft{position:absolute;left:60px;right:60px;top:1200px;display:flex;justify-content:space-between;align-items:center}.ft span{font-size:24px;max-width:540px;line-height:1.35;color:${TV.txt}}`;
export const F6 = (x) => page(1080, 1350, cf6, `<div class="bg"></div>
<div class="top"><img src="assets/logos/tipo_blanco.png"><span>Mercado de hoy · ${diaNombre(x.d)} ${fechaCorta(x.d)}<br>Tasas de las ${x.hh} · variación 24 h</span></div>
${["CLVE", "CLCO", "CLPE"].map((k, i) => { const c = CORR[k], s = last24(x.S[k]), a = vals(s), p = cambio24(x.S[k]), col = pcol(p), [mn, mx] = rango(a), Y = escala(mn, mx, 220, 10), X = (j) => j * 560 / (a.length - 1);
  return `<div class="r" style="top:${190 + i * 330}px"><div class="t"><div style="display:flex;gap:8px">${sqFlag(c.a, 56)}${sqFlag(c.b, 56)}</div><small>${c.an} → ${c.bn} · por 1 ${c.ua}</small><b class="num">${rateTxt(x.Rs[k])}</b><i style="color:${col}">${pct(p)}</i></div>
<svg width="560" height="220" viewBox="0 0 560 220">${linea(a, X, Y, col, 5)}<circle cx="${X(a.length - 1)}" cy="${Y(a[a.length - 1])}" r="9" fill="${col}"/></svg></div>`; }).join("")}
<div class="ft"><span>Comisión del servicio incluida en la tasa · datos reales de superenvios.app</span>${pill("superenvios.app", "font-size:34px")}</div>`);

export const STORIES_F = { F01, F02, F03, F04, F05, F06, F07, F08, F09, F10 };
export const FEEDS_F = { F6 };
