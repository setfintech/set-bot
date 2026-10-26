// muestra.mjs — renderiza la muestra de un día (10 historias + 2 feeds) con las tasas reales del momento → preview/
import fs from "node:fs";
import { getAll, getRate } from "./data.mjs";
import { STORIES as SA, FEEDS } from "./disenos.mjs";
import { STORIES_B } from "./disenos_b.mjs";
import { STORIES_C, FEEDS_C } from "./disenos_c.mjs";
import { STORIES_D, FEEDS_D } from "./disenos_d.mjs";
import { STORIES_E, FEEDS_E } from "./disenos_e.mjs";
const STORIES = { ...SA, ...STORIES_B, ...STORIES_C, ...STORIES_D, ...STORIES_E };
Object.assign(FEEDS, FEEDS_C, FEEDS_D, FEEDS_E);
import { renderPage, closeBrowser } from "./render.mjs";

const HORAS = new Proxy({}, { get: (_, id) => `${String(8 + Number(String(id).slice(1))).padStart(2, "0")}:00` }); // S01/B01 → 09:00 … S10/B10 → 18:00
const all = await getAll();
all.VECL = await getRate("VECL");
const R = Object.fromEntries(Object.entries(all).map(([k, v]) => [k, v.rate]));
const Rs = Object.fromEntries(Object.entries(all).map(([k, v]) => [k, v.raw])); // tasa tal cual viene de la API
// fecha de hoy en Chile (las piezas muestran el día real)
const [Y, M, D] = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago" }).format(new Date()).split("-").map(Number);
const hoy = new Date(Date.UTC(Y, M - 1, D));
fs.mkdirSync("preview", { recursive: true });
const solo = process.argv.slice(2);
for (const [id, fn] of Object.entries(STORIES)) {
  if (solo.length && !solo.includes(id)) continue;
  const sab = id.startsWith("D"), SH = ["09:00", "09:00", "10:00", "10:00", "11:00", "11:00", "12:00", "12:00", "13:00", "14:00"];
  const prox = (wd) => new Date(hoy.getTime() + ((wd - hoy.getUTCDay() + 7) % 7) * 86400000);
  const dd = sab ? prox(6) : id.startsWith("E") ? prox(1) : hoy;
  await renderPage(fn({ d: dd, hh: sab ? SH[Number(id.slice(1)) - 1] : HORAS[id], R, Rs }), { width: 1080, height: 1920, out: `preview/${id}.jpg` });
}
for (const [id, fn] of Object.entries(FEEDS)) {
  if (solo.length && !solo.includes(id)) continue;
  const prox = (wd) => new Date(hoy.getTime() + ((wd - hoy.getUTCDay() + 7) % 7) * 86400000);
  const d = id === "F4" ? prox(6) : id === "F5" ? prox(1) : hoy;
  await renderPage(fn({ d, hh: "09:00", R, Rs }), { width: 1080, height: 1350, out: `preview/${id}.jpg` });
}
await closeBrowser();
console.log("muestra lista", Object.entries(R).map(([k, v]) => `${k}=${v}`).join(" "));
