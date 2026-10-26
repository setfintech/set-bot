// sets.mjs — juegos de diseños por día de publicación. Cada juego = 10 historias (en orden de corredor) + 1 post de feed.
// Orden de corredores de las 10 historias: CLVE, CLVE, CLPE, CLVE, CLCO, PEVE, CLVE, COVE, TODOS, CLVE.
// Los días de publicación (lun–sáb, sin domingos ni días cerrados) recorren A→F; cada vuelta de 6 días cambia la variación (v=0..3),
// así ninguna historia se repite dentro de la semana y las semanas 2–4 son variaciones. Después del mes se recicla.
import { STORIES, FEEDS } from "./disenos.mjs";
import { STORIES_B } from "./disenos_b.mjs";
import { STORIES_C, FEEDS_C } from "./disenos_c.mjs";
import { STORIES_D, FEEDS_D } from "./disenos_d.mjs";

export const CORRIDOR_ORDER = ["CLVE", "CLVE", "CLPE", "CLVE", "CLCO", "PEVE", "CLVE", "COVE", "TODOS", "CLVE"];
export const SETS = {
  A: { stories: ["S01", "S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S10"].map((k) => STORIES[k]), feed: FEEDS.F1, feedTipo: "uno" },
  D: { stories: ["D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10"].map((k) => STORIES_D[k]), feed: FEEDS_D.F4, feedTipo: "tres" }, // sábado
  C: { stories: ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10"].map((k) => STORIES_C[k]), feed: FEEDS_C.F3, feedTipo: "uno" }, // viernes
  B: { stories: ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10"].map((k) => STORIES_B[k]), feed: FEEDS.F2, feedTipo: "tres" }, // jueves
};
export const listo = (k) => !!(SETS[k] && SETS[k].stories && SETS[k].stories.every(Boolean) && SETS[k].feed);
