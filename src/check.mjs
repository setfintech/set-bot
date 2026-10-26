// check.mjs — prueba el token de Metricool (lista las marcas) y la API de tasas de SET, sin publicar nada.
import { whoami } from "./metricool.mjs";
import { getAll } from "./data.mjs";
const marcas = await whoami();
console.log("Metricool OK · marcas:", marcas.join(" | "));
if (!marcas.some((m) => m.startsWith(process.env.METRICOOL_BLOG_ID))) throw new Error("El BLOG_ID no aparece entre las marcas del token");
const R = await getAll();
console.log("API superenvios.app OK ·", Object.values(R).map((r) => `${r.key}=${r.raw} (${r.hh})`).join(" "));
