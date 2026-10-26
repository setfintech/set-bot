# set-bot

Publica las historias y el post de feed de **tasa** de Súper Envíos Today con la tasa **real** de `api.superenvios.app`, a través de Metricool (misma base que karduto-bot, giros-bot y vezmoney-bot).

- `src/data.mjs` → lee la API de tasas (se actualiza cada hora en punto). La tasa se publica tal cual viene de la API.
- `src/disenos.mjs` → diseños de historias (1080×1920) y feed (1080×1350) con el kit SET.
- `src/metricool.mjs` → API REST de Metricool. `src/check.mjs` → prueba el token y la API sin publicar.
- `.github/workflows/tasa.yml` → por ahora solo modos manuales `check` y `muestra`.

Secretos (Settings → Secrets and variables → Actions): `METRICOOL_TOKEN`, `METRICOOL_USER_ID` (5326777), `METRICOOL_BLOG_ID` (7092202).

En tu PC: `npm install` · `npx playwright install chromium` · `node src/muestra.mjs` (deja las imágenes en `preview/`).
