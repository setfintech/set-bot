// sets.mjs — juegos de diseños por día de publicación. Cada juego = 10 historias (en orden de corredor) + 1 post de feed.
// Orden de corredores de las 10 historias: CLVE, CLVE, CLPE, CLVE, CLCO, PEVE, CLVE, COVE, TODOS, CLVE.
// 6 juegos fijos, uno por día de la semana (config.json → setsPorDia: lun E · mar F · mié A · jue B · vie C · sáb D), que se repiten cada semana.
import "./tramos_pos.mjs"; // agrega los tramos de Chile → Venezuela a los diseños antes de armar los juegos
import { STORIES, FEEDS } from "./disenos.mjs";
import { STORIES_B } from "./disenos_b.mjs";
import { STORIES_C, FEEDS_C } from "./disenos_c.mjs";
import { STORIES_D, FEEDS_D } from "./disenos_d.mjs";
import { STORIES_E, FEEDS_E } from "./disenos_e.mjs";
import { STORIES_F, FEEDS_F } from "./disenos_f.mjs";

export const CORRIDOR_ORDER = ["CLVE", "CLVE", "CLPE", "CLVE", "CLCO", "PEVE", "CLVE", "COVE", "TODOS", "CLVE"];
export const SETS = {
  A: { stories: ["S01", "S02", "S03", "S04", "S05", "S06", "S07", "S08", "S09", "S10"].map((k) => STORIES[k]), feed: FEEDS.F1, feedTipo: "uno" },
  F: { stories: ["F01", "F02", "F03", "F04", "F05", "F06", "F07", "F08", "F09", "F10"].map((k) => STORIES_F[k]), feed: FEEDS_F.F6, feedTipo: "tres", conGraficos: true }, // martes (gráficos de bolsa)
  E: { stories: ["E01", "E02", "E03", "E04", "E05", "E06", "E07", "E08", "E09", "E10"].map((k) => STORIES_E[k]), feed: FEEDS_E.F5, feedTipo: "uno" }, // lunes
  D: { stories: ["D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10"].map((k) => STORIES_D[k]), feed: FEEDS_D.F4, feedTipo: "tres" }, // sábado
  C: { stories: ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10"].map((k) => STORIES_C[k]), feed: FEEDS_C.F3, feedTipo: "uno" }, // viernes
  B: { stories: ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10"].map((k) => STORIES_B[k]), feed: FEEDS.F2, feedTipo: "tres" }, // jueves
};
export const listo = (k) => !!(SETS[k] && SETS[k].stories && SETS[k].stories.every(Boolean) && SETS[k].feed);
