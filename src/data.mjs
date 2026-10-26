// data.mjs — tasas reales desde la API pública de Súper Envíos Today (api.superenvios.app), igual que vezmoney-bot.
// Cada corredor se actualiza cada hora en punto. "monto" = cuánto recibe el destino por 1 unidad del origen.
const UA = "Mozilla/5.0 (compatible; set-bot/1.0; +https://superenvios.app)";
const BASE = "https://api.superenvios.app/api/tasa/listaiden";

async function getPage(url, intentos = 4) {
  let err;
  for (let i = 1; i <= intentos; i++) {
    try {
      const r = await fetch(url, { headers: { "user-agent": UA, accept: "application/json" }, signal: AbortSignal.timeout(30000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) {
      err = e;
      await new Promise((ok) => setTimeout(ok, 1500 * i));
    }
  }
  throw new Error(`${url}: ${err?.cause?.code ?? err?.message ?? err}`);
}

// corredores que usa SET (clave → par de la API)
export const PAIRS = {
  CLVE: ["CLP", "BS"], CLPE: ["CLP", "PEN"], CLCO: ["CLP", "COP"], PEVE: ["PEN", "BS"], COVE: ["COP", "BS"],
  VECL: ["BS", "CLP"], CLUS: ["CLP", "USD"],
};

export async function getRate(key) {
  const [from, to] = PAIRS[key];
  const p = await getPage(`${BASE}/${from}/${to}?page=1`);
  const rows = [...p.data].sort((a, b) => a.fecha.localeCompare(b.fecha)).slice(-24);
  if (!rows.length) throw new Error(`API de tasas ${from}/${to}: sin datos`);
  const last = rows[rows.length - 1];
  return { key, rate: Number(last.monto), raw: String(last.monto), fecha: last.fecha, hh: last.fecha.slice(11, 16), series: rows.map((r) => Number(r.monto)) };
}

export async function getAll(keys = ["CLVE", "CLPE", "CLCO", "PEVE", "COVE"]) {
  const out = {};
  for (const k of keys) out[k] = await getRate(k);
  return out;
}
