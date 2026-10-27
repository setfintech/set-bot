// tramos_pos.mjs — dónde va el bloque de tramos (desde 250.000 / 500.000 CLP) en cada diseño de Chile → Venezuela.
// Se importa antes de armar los juegos: envuelve las funciones de diseño y agrega el bloque dentro de #root.
// [variante, estilo CSS (posición/tamaño), título opcional]. "claro" = sobre fondo verde/oscuro; "oscuro" = sobre blanco/crema/mostaza.
// S01 no está aquí: es la réplica del modelo y muestra los tramos dentro de su caja (disenos.mjs).
import { STORIES, FEEDS, tramos } from "./disenos.mjs";
import { STORIES_B } from "./disenos_b.mjs";
import { STORIES_C, FEEDS_C } from "./disenos_c.mjs";
import { STORIES_D, FEEDS_D } from "./disenos_d.mjs";
import { STORIES_E, FEEDS_E } from "./disenos_e.mjs";
import { STORIES_F, FEEDS_F } from "./disenos_f.mjs";

const TODOS = "Chile → Venezuela según monto";
export const POS = {
  // miércoles (A)
  S02: ["claro", "left:150px;top:1330px;width:780px"],
  S04: ["oscuro", "left:70px;top:1345px;width:470px"],
  S07: ["oscuro", "left:200px;top:1330px;width:680px"],
  S09: ["claro", "left:140px;top:1150px;width:800px", TODOS],
  S10: ["claro", "left:65px;top:960px;width:450px;font-size:25px"],
  F1: ["oscuro", "left:80px;top:930px;width:560px"],
  // jueves (B)
  B01: ["claro", "left:110px;top:1385px;width:600px"],
  B02: ["claro", "left:110px;top:1290px;width:620px"],
  B04: ["claro", "left:200px;top:545px;width:680px"],
  B07: ["oscuro", "left:80px;top:560px;width:520px"],
  B09: ["claro", "left:160px;top:1140px;width:760px", TODOS],
  B10: ["claro", "left:77px;top:1115px;width:540px"],
  F2: ["claro fila", "left:80px;top:500px;width:920px;font-size:26px"],
  // viernes (C)
  C01: ["oscuro", "left:360px;top:1385px;width:560px"],
  C02: ["claro", "left:210px;top:1120px;width:660px"],
  C04: ["oscuro", "left:60px;top:790px;width:430px;font-size:25px"],
  C07: ["oscuro fila", "left:150px;top:1440px;width:780px;font-size:22px"],
  C09: ["oscuro", "left:540px;top:560px;width:440px;font-size:24px"],
  C10: ["claro", "left:96px;top:1345px;width:664px"],
  F3: ["claro", "left:80px;top:985px;width:560px"],
  // sábado (D)
  D01: ["oscuro fila", "left:154px;top:1235px;width:770px;font-size:24px"],
  D02: ["oscuro", "left:70px;top:1300px;width:640px"],
  D04: ["oscuro", "left:89px;top:1210px;width:500px;font-size:26px"],
  D07: ["oscuro fila", "left:135px;top:925px;width:810px;font-size:24px"],
  D09: ["claro", "left:140px;top:1150px;width:800px", TODOS],
  D10: ["claro fila", "left:85px;top:1060px;width:900px;font-size:26px"],
  F4: ["oscuro fila", "left:80px;top:950px;width:920px;font-size:24px", TODOS],
  // lunes (E)
  E01: ["oscuro", "left:140px;top:1100px;width:580px"],
  E02: ["claro", "left:120px;top:860px;width:640px"],
  E04: ["oscuro", "left:69px;top:1215px;width:430px;font-size:25px"],
  E07: ["claro", "left:215px;top:1225px;width:650px"],
  E09: ["oscuro", "left:140px;top:1160px;width:800px", TODOS],
  E10: ["oscuro fila", "left:104px;top:790px;width:887px;font-size:26px"],
  F5: ["claro fila", "left:80px;top:790px;width:920px;font-size:26px"],
  // martes (F, gráficos)
  F01: ["claro fila", "left:160px;top:1040px;width:760px;font-size:22px"],
  F02: ["claro fila", "left:54px;top:1400px;width:970px;font-size:22px"],
  F04: ["claro fila", "left:60px;top:808px;width:850px;font-size:21px"],
  F07: ["claro fila", "left:60px;top:705px;width:960px;font-size:22px"],
  F09: ["claro", "left:540px;top:520px;width:440px;font-size:24px"],
  F10: ["claro", "left:393px;top:1130px;width:600px"],
  F6: ["claro fila", "left:81px;top:470px;width:925px;font-size:22px"],
};

const envolver = (dict) => {
  for (const id of Object.keys(dict)) {
    const p = POS[id];
    if (!p || dict[id].__tramos) continue;
    const fn = dict[id];
    const nuevo = (x) => fn(x).replace(/<\/div><\/body><\/html>$/, `${tramos(x, p[0], p[1], p[2] || "")}</div></body></html>`);
    nuevo.__tramos = true;
    dict[id] = nuevo;
  }
};
for (const d of [STORIES, FEEDS, STORIES_B, STORIES_C, FEEDS_C, STORIES_D, FEEDS_D, STORIES_E, FEEDS_E, STORIES_F, FEEDS_F]) envolver(d);
