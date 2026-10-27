// telegram.mjs — manda las imágenes de tasas recién programadas al grupo de operaciones de Telegram (como archivo, sin compresión),
// para que el operador las descargue y las suba a las historias de WhatsApp. Si faltan TELEGRAM_TOKEN o TG_OPS_CHAT, no hace nada.
import fs from "node:fs";
import path from "node:path";

const NOMBRE = { CLVE: "Chile → Venezuela", CLPE: "Chile → Perú", CLCO: "Chile → Colombia", PEVE: "Perú → Venezuela", COVE: "Colombia → Venezuela", TODOS: "todos los corredores" };

export async function enviarImagenes(items, dir = "out") {
  const token = (process.env.TELEGRAM_TOKEN ?? "").trim(), chat = (process.env.TG_OPS_CHAT ?? "").trim();
  if (!token || !chat) return 0;
  let n = 0;
  for (const it of items) {
    const form = new FormData();
    form.append("chat_id", chat);
    form.append("caption", it.kind === "POST" ? `🖼️ Post del día de tasas · ${it.hora}` : `📲 Historia ${it.hora} · ${NOMBRE[it.corredor] ?? it.corredor}`);
    form.append("document", new Blob([fs.readFileSync(path.join(dir, it.file))], { type: "image/jpeg" }), it.file);
    const r = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, { method: "POST", body: form, signal: AbortSignal.timeout(60000) });
    if (r.ok) n++; else console.warn(`Telegram: ${it.file} → HTTP ${r.status}`);
  }
  return n;
}
