# set-bot — reglas para corregir diseños (agente en GitHub Actions)

Este repositorio genera las historias (1080×1920) y posts de feed (1080×1350) de **tasa** de Súper Envíos Today (SET).
Cuando el usuario pide una corrección desde Telegram, un workflow te pasa: la **pieza** (ej. T08), el **diseño** que la genera
(ej. S08 en `src/disenos.mjs`, B03 en `src/disenos_b.mjs`; cada juego de días tiene su archivo `src/disenos_<juego>.mjs`) y el **cambio pedido** (texto del usuario). Tu trabajo: aplicar SOLO ese cambio.

## Cómo trabajar
- Todo en español. El usuario es Francisco (SET).
- Edita únicamente la función del diseño indicado (y su CSS `cssXX`/`cXX`) en el archivo donde está definida (`src/disenos.mjs` o `src/disenos_<juego>.mjs`). No toques otros diseños, ni `data.mjs`, ni los workflows.
- No renderices ni hagas commit: el workflow lo hace después (renderiza con `node src/muestra.mjs <diseño>`).
- Si el pedido es ambiguo, aplica la interpretación más razonable y descríbela en una línea al final de tu respuesta (se le reenvía al usuario).
- Puedes verificar que el archivo sigue siendo JavaScript válido con `node --check src/disenos.mjs`.

## Reglas de marca (obligatorias)
- La tasa se muestra **tal cual viene de la API** (`rateTxt`), a 1 unidad, sin redondear. Nunca inventes tasas ni tramos (no hay tramos de 250.000 / 500.000).
- Frase de la comisión: **"Comisión del servicio incluida en la tasa"**. Nunca "sin comisión".
- Tiempos: "de 15 minutos a 3 horas". Horario: lunes a viernes 9:00–19:00, sábado 9:00–15:30, domingo cerrado. Nunca "24/7".
- Países: Chile, Perú, Colombia, Venezuela (y EE. UU., Argentina, Ecuador). Nunca Brasil.
- Venezuela → Chile: no se publica su tasa sin confirmación del usuario (en S01 la caja va vacía).
- Kit: verde #2F8F48 / #00913E / #187D41 / #0E5A2C, mostaza #DEA503, rojo #E0302B, crema #FFF9EC, tipografía Comfortaa, cruces "+" 3D, píldora roja, personas recortadas (`assets/people`).
- Nada de emojis de banderas (en Linux no se ven): usa `sqFlag("VE")` etc.
- Zona segura de historias: lo importante entre y=230 y y=1650.

## Mapa de piezas (6 juegos fijos, uno por día, se repiten cada semana)
Juego A (miércoles): T01→S01 · T02→S02 · T03→S03 · T04→S04 · T05→S05 · T06→S06 · T07→S07 · T08→S08 · T09→S09 · T10→S10 · TF1→F1 · TF2→F2
Juego B (jueves): B01…B10 → función del mismo nombre en src/disenos_b.mjs
Juego C (viernes): C01…C10 y el feed F3 → funciones del mismo nombre en src/disenos_c.mjs
Juego D (sábado, cierra 15:30): D01…D10 y el feed F4 → funciones del mismo nombre en src/disenos_d.mjs
Juego E (lunes): E01…E10 y el feed F5 → funciones del mismo nombre en src/disenos_e.mjs
