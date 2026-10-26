// run.mjs — orquestador de las tasas de SET (basado en vezmoney-bot). Lo ejecuta GitHub Actions varias veces por hora.
// Flags: --dry (solo genera las imágenes en out/)  --draft (genera, sube y crea BORRADORES en Metricool que luego borra)
//        --hour=9 --date=2026-10-28 (forzar hora/fecha de Chile)
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { getAll } from "./data.mjs";
import { SETS, CORRIDOR_ORDER, listo } from "./sets.mjs";
import { rateTxt, fechaCorta } from "./disenos.mjs";
import { renderPage, closeBrowser } from "./render.mjs";
import { createPost, deletePost } from "./metricool.mjs";

const cfg = JSON.parse(fs.readFileSync("config.json", "utf8"));
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? true]; }));
const DRY = !!args.dry, DRAFT = !!args.draft;
const FORCE_HOUR = args.hour ?? (process.env.FORCE_HOUR || undefined);
const FORCE_DATE = args.date ?? (process.env.FORCE_DATE || undefined);
const forced = FORCE_HOUR !== undefined || FORCE_DATE !== undefined;
const TZ = cfg.timezone;
const pad = (n) => String(n).padStart(2, "0");
const summary = (m) => { console.log(m); if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, m + "\n\n"); };

function nowLocal(ms = Date.now()) {
  const o = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: TZ, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(new Date(ms)).map((p) => [p.type, p.value]));
  return { y: +o.year, mo: +o.month, d: +o.day, h: +o.hour, mi: +o.minute, s: +o.second, date: `${o.year}-${o.month}-${o.day}`, ms: Date.UTC(+o.year, +o.month - 1, +o.day, +o.hour, +o.minute, +o.second) };
}
let now = nowLocal();
if (FORCE_DATE) { const [y, m, d] = FORCE_DATE.split("-").map(Number); now = { ...now, y, mo: m, d, date: FORCE_DATE, ms: Date.UTC(y, m - 1, d, now.h, now.mi, now.s) }; }
if (FORCE_HOUR !== undefined) now = { ...now, h: Number(FORCE_HOUR), mi: 5 };
const dia = new Date(Date.UTC(now.y, now.mo - 1, now.d));
const weekday = dia.getUTCDay(); // 0 = domingo (calculado, nunca supuesto)
const slots = cfg.dayOverrides?.[now.date]?.slots ?? (weekday === 0 ? [] : weekday === 6 ? cfg.slots.saturday : cfg.slots.weekday);
const slot = slots.find((s) => s.hour === now.h);

// 6 juegos fijos (lunes a sábado) que se repiten cada semana: cada día de la semana siempre usa su propio juego
const juego = cfg.setsPorDia[String(weekday)];
const variacion = 0;
const n = 0;

const sh = (c) => execSync(c, { stdio: "inherit" });
function gitPush(message) {
  sh("git add -A out state");
  try { execSync("git diff --cached --quiet"); return; } catch { /* hay cambios */ }
  sh(`git commit -m "${message}"`);
  for (let i = 0; i < 3; i++) { try { sh("git pull --rebase --autostash"); sh("git push"); return; } catch (e) { if (i === 2) throw e; } }
}
const rawUrl = (f) => `https://raw.githubusercontent.com/${process.env.GITHUB_REPOSITORY}/${process.env.GITHUB_REF_NAME || "main"}/out/${f}`;
async function waitPublic(url) {
  for (let i = 0; i < 18; i++) { const r = await fetch(url, { method: "HEAD", cache: "no-store" }).catch(() => null); if (r && r.ok) return; await new Promise((ok) => setTimeout(ok, 5000)); }
  throw new Error("La imagen no quedó pública a tiempo: " + url);
}
const stamp = (t) => `${t.date}T${pad(t.h)}:${pad(t.mi)}:${pad(t.s)}`;
function prune() {
  const limit = dia.getTime() - cfg.keepDays * 86400000;
  for (const f of fs.existsSync("out") ? fs.readdirSync("out") : []) {
    const m = f.match(/^(\d{4})-(\d{2})-(\d{2})_/);
    if (m && Date.UTC(+m[1], +m[2] - 1, +m[3]) < limit) fs.unlinkSync(path.join("out", f));
  }
}
const feedCaption = (x, tipo) => [
  `Tasa de hoy · ${fechaCorta(dia)} · ${x.hh} 💚`, "",
  `Chile → Venezuela: 1 CLP = ${rateTxt(x.Rs.CLVE)} Bs`,
  ...(tipo === "tres" ? [`Chile → Colombia: 1 CLP = ${rateTxt(x.Rs.CLCO)} COP`, `Chile → Perú: 1 CLP = ${rateTxt(x.Rs.CLPE)} PEN`] : []), "",
  "✅ Comisión del servicio incluida en la tasa: lo que ves es lo que es", "⏱️ Tu envío se procesa de 15 minutos a 3 horas", "",
  "👉 Envía en superenvios.app (link en el perfil)", "",
  "Tasa referencial del momento de publicación; se actualiza cada hora. La final es la que ves en superenvios.app al enviar.", "",
  "#SuperEnviosToday #TasaDelDía #Remesas #EnviarDinero #VenezolanosEnChile",
].join("\n");

async function main() {
  if (cfg.paused && !DRY && !DRAFT && process.env.EVENT !== "workflow_dispatch") return summary("⏸️ Bot en pausa (config.json → paused).");
  if (now.date < cfg.startDate && !FORCE_DATE) return summary(`⏳ El bot empieza el ${cfg.startDate}.`);
  if ((cfg.closedDates ?? []).includes(now.date) && !FORCE_DATE) return summary(`🚫 ${now.date} es día cerrado.`);
  if (!slot) return summary(`ℹ️ ${now.date} ${pad(now.h)}:${pad(now.mi)} (día ${weekday}): no hay publicación a esta hora.`);
  if (!forced && now.mi > cfg.maxLateMinutes) return summary(`⏭️ Llegué tarde (minuto ${now.mi}). Salto esta hora.`);
  if (!DRY && !process.env.METRICOOL_TOKEN) return summary("⏸️ Falta METRICOOL_TOKEN.");
  let set = juego;
  if (!listo(set)) { summary(`⚠️ El juego ${set} aún no está listo: uso el juego A para no dejar el día sin tasa.`); set = "A"; }
  // el feed depende del día: martes, jueves y sábado van con Venezuela + Colombia + Perú
  const tipoDia = [2, 4, 6].includes(weekday) ? "tres" : "uno";
  const feedJuego = SETS[juego]?.feed && SETS[juego].feedTipo === tipoDia ? SETS[juego] : Object.values(SETS).find((z) => z.feed && z.feedTipo === tipoDia);
  const S = { ...SETS[set], feed: feedJuego.feed, feedTipo: feedJuego.feedTipo };

  const key = `${DRAFT ? "prueba_" : ""}${now.date}_${pad(slot.hour)}`;
  const statePath = "state/published.json";
  const state = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath, "utf8")) : {};
  if (state[key] && !DRY && !DRAFT) return console.log("Ya publicado:", key);

  const all = await getAll();
  if (!forced) for (const r of Object.values(all)) {
    const [d, t] = r.fecha.split(" "); const [Y, M, D] = d.split("-").map(Number); const [h, mi] = t.split(":").map(Number);
    const age = (now.ms - Date.UTC(Y, M - 1, D, h, mi)) / 60000;
    if (age > cfg.maxRateAgeMinutes) throw new Error(`La tasa ${r.key} tiene ${Math.round(age)} min de antigüedad. No publico una tasa vieja.`);
  }
  const R = Object.fromEntries(Object.entries(all).map(([k, v]) => [k, v.rate]));
  const Rs = Object.fromEntries(Object.entries(all).map(([k, v]) => [k, v.raw]));
  const hh = all.CLVE.hh;
  const x = { d: dia, hh, R, Rs, v: variacion };

  const files = [];
  fs.mkdirSync("out", { recursive: true });
  for (const [i, pos] of slot.pos.entries()) {
    const file = `${key}_${pos}_${CORRIDOR_ORDER[pos]}_${set}${variacion}_story.jpg`;
    await renderPage(S.stories[pos](x), { width: 1080, height: 1920, out: path.join("out", file) });
    files.push({ kind: "STORY", file, offset: i * 30 });
  }
  if (slot.feed) {
    const file = `${key}_feed_${set}${variacion}.jpg`;
    await renderPage(S.feed(x), { width: 1080, height: 1350, out: path.join("out", file) });
    files.push({ kind: "POST", file, offset: 0, text: feedCaption(x, S.feedTipo) });
  }
  summary(`🖼️ ${now.date} ${pad(now.h)}:00 · juego ${set} (${["dom", "lun", "mar", "mié", "jue", "vie", "sáb"][weekday]}) · ${files.map((f) => f.file).join(", ")} · CLVE ${Rs.CLVE} (${hh})`);
  if (DRY) return summary("Modo --dry: no publico.");

  gitPush(`imágenes ${key}`);
  const result = {}, drafts = [];
  for (const f of files) {
    const url = rawUrl(f.file);
    await waitPublic(url);
    // hora local de Chile (Metricool la interpreta con la zona America/Santiago): ahora + retraso, o la media hora si es la 2.ª historia del sábado
    const real = nowLocal(Date.now() + cfg.publishDelayMinutes * 60000);
    const when = forced ? stamp(real) : `${now.date}T${pad(now.h)}:${pad(Math.min(59, Math.max(real.h > now.h ? 59 : real.mi, f.offset)))}:00`;
    for (const network of cfg.networks[f.kind === "STORY" ? "story" : "post"]) {
      try {
        const p = await createPost({ imageUrl: url, type: f.kind, when, timezone: TZ, text: f.text || "", network, draft: DRAFT });
        result[`${f.file}_${network}`] = p.id ?? "ok";
        if (DRAFT && p.id) drafts.push(p.id);
        summary(`${DRAFT ? "🧪 Borrador" : "✅ Programado"} ${f.kind} en ${network} para ${when} · id ${p.id}`);
      } catch (e) {
        if (network === "instagram") throw e;
        summary(`⚠️ ${f.kind} en ${network}: ${e.message.slice(0, 300)}`);
      }
    }
  }
  if (DRAFT) { for (const id of drafts) await deletePost(id).catch(() => {}); return summary(`✅ PRUEBA OK: ${drafts.length} borradores creados y borrados. No se publicó nada.`); }
  state[key] = { ...result, juego: set, variacion, at: new Date().toISOString() };
  fs.mkdirSync("state", { recursive: true });
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
  prune();
  gitPush(`estado ${key}`);
}

try { await main(); } catch (e) { console.error("ERROR:", e.message); summary("❌ ERROR: " + String(e.message).slice(0, 900)); process.exitCode = 1; } finally { await closeBrowser(); }
