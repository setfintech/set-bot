// muestra.mjs — renderiza la muestra de un día (10 historias + 2 feeds) con las tasas reales del momento → preview/
import fs from "node:fs";
import { getAll, getRate } from "./data.mjs";
import { STORIES, FEEDS } from "./disenos.mjs";
import { renderPage, closeBrowser } from "./render.mjs";

const HORAS = { S01: "09:00", S02: "10:00", S03: "11:00", S04: "12:00", S05: "13:00", S06: "14:00", S07: "15:00", S08: "16:00", S09: "17:00", S10: "18:00" };
const all = await getAll();
all.VECL = await getRate("VECL");
const R = Object.fromEntries(Object.entries(all).map(([k, v]) => [k, v.rate]));
const Rs = Object.fromEntries(Object.entries(all).map(([k, v]) => [k, v.raw])); // tasa tal cual viene de la API
const hoy = new Date(Date.UTC(2026, 9, 26));
fs.mkdirSync("preview", { recursive: true });
const solo = process.argv.slice(2);
for (const [id, fn] of Object.entries(STORIES)) {
  if (solo.length && !solo.includes(id)) continue;
  await renderPage(fn({ d: hoy, hh: HORAS[id], R, Rs }), { width: 1080, height: 1920, out: `preview/${id}.jpg` });
}
for (const [id, fn] of Object.entries(FEEDS)) {
  if (solo.length && !solo.includes(id)) continue;
  const d = id === "F2" ? new Date(Date.UTC(2026, 9, 27)) : hoy;
  await renderPage(fn({ d, hh: "09:00", R, Rs }), { width: 1080, height: 1350, out: `preview/${id}.jpg` });
}
await closeBrowser();
console.log("muestra lista", Object.entries(R).map(([k, v]) => `${k}=${v}`).join(" "));
