// should-run.mjs — decide en 1 segundo si esta ejecución tiene algo que hacer (para no instalar nada en vano).
import fs from "node:fs";
const cfg = JSON.parse(fs.readFileSync("config.json", "utf8"));
const manual = process.env.EVENT === "workflow_dispatch";
const o = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: cfg.timezone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(new Date()).map((p) => [p.type, p.value]));
const h = +o.hour, mi = +o.minute, date = `${o.year}-${o.month}-${o.day}`;
const weekday = new Date(Date.UTC(+o.year, +o.month - 1, +o.day)).getUTCDay();
const slots = cfg.dayOverrides?.[date]?.slots ?? (weekday === 0 ? [] : weekday === 6 ? cfg.slots.saturday : cfg.slots.weekday);
const slot = slots.find((s) => s.hour === h);
const state = fs.existsSync("state/published.json") ? JSON.parse(fs.readFileSync("state/published.json", "utf8")) : {};
let go = true, why = "";
if (!manual) {
  if (cfg.paused) { go = false; why = "bot en pausa"; }
  else if (date < cfg.startDate) { go = false; why = `empieza el ${cfg.startDate}`; }
  else if ((cfg.closedDates ?? []).includes(date)) { go = false; why = "día cerrado"; }
  else if (!slot) { go = false; why = `no hay publicación a las ${h}:00`; }
  else if (mi > cfg.maxLateMinutes) { go = false; why = `tarde (minuto ${mi})`; }
  else if (state[`${date}_${String(h).padStart(2, "0")}`]) { go = false; why = "ya publicado"; }
  else if (!process.env.METRICOOL_TOKEN) { go = false; why = "falta METRICOOL_TOKEN"; }
}
const msg = go ? `▶️ Hay trabajo: ${date} ${h}:${String(mi).padStart(2, "0")}` : `⏭️ Nada que hacer (${why}). ${date} ${h}:${String(mi).padStart(2, "0")}`;
console.log(msg);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, msg + "\n\n");
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `go=${go}\n`);
