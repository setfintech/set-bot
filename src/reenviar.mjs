// reenviar.mjs — manda a Telegram la versión corregida de una pieza (con botones) y la registra en el bot de Cloudflare.
//   node src/reenviar.mjs <pieza> <diseño> "<cambio pedido>" "<nota del agente>"
// Necesita: TELEGRAM_TOKEN, CHAT_ID, WORKER_URL, ADMIN_KEY (secretos del repo). La imagen ya debe estar en preview/<diseño>.jpg.
import fs from "node:fs";
const [, , pieza, diseno, cambio = "", nota = ""] = process.argv;
const { TELEGRAM_TOKEN, CHAT_ID, WORKER_URL, ADMIN_KEY } = process.env;
const img = `preview/${diseno}.jpg`;
if (!fs.existsSync(img)) throw new Error(`No existe ${img}`);
const BOTONES = { inline_keyboard: [[{ text: "✅ Aprobar", callback_data: `ap|${pieza}` }, { text: "✏️ Editar", callback_data: `ed|${pieza}` }, { text: "❌ Rechazar", callback_data: `re|${pieza}` }]] };
const tg = async (method, form) => {
  const r = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/${method}`, { method: "POST", body: form });
  const j = await r.json();
  if (!j.ok) throw new Error(`${method}: ${j.description}`);
  return j.result;
};
const fd = new FormData();
fd.append("chat_id", CHAT_ID);
fd.append("photo", new Blob([fs.readFileSync(img)], { type: "image/jpeg" }), `${diseno}.jpg`);
await tg("sendPhoto", fd);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const t = new FormData();
t.append("chat_id", CHAT_ID);
t.append("parse_mode", "HTML");
t.append("text", `🔁 <b>Versión corregida</b> (hecha en la nube)\n<b>${pieza}</b> · diseño ${diseno}\n\n✏️ Pediste: <i>${esc(cambio).slice(0, 600)}</i>${nota ? `\n\n📝 ${esc(nota).slice(0, 800)}` : ""}`);
t.append("reply_markup", JSON.stringify(BOTONES));
const msg = await tg("sendMessage", t);
const r = await fetch(`${WORKER_URL}/admin/pieza`, {
  method: "POST", headers: { "content-type": "application/json", "X-Admin-Key": ADMIN_KEY },
  body: JSON.stringify({ id: pieza, tanda: "muestra", msg: msg.message_id, diseno, nube: true }),
});
if (!r.ok) throw new Error(`Worker ${r.status}`);
console.log(`reenviada ${pieza} (${diseno})`);
