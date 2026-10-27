// tasa_set.mjs — reglas de SET para Chile → Venezuela (pedidas por Francisco el 27-10-2026):
//   · la tasa del sistema se muestra con 4 decimales cortados hacia abajo (nunca prometer más de lo que da el sistema)
//   · tramos por monto: desde 250.000 CLP = tasa + 0,0050 · desde 500.000 CLP = tasa + 0,0100
// Los demás corredores se muestran tal cual vienen de la API.
export const trunc4 = (v) => Math.floor(Number(v) * 10000 + 1e-6) / 10000;

// Ajusta R/Rs de Chile → Venezuela en el lugar y devuelve los tramos como texto con punto ("0.9250").
export function aplicarTramos(R, Rs) {
  const b = trunc4(R.CLVE);
  R.CLVE = b;
  Rs.CLVE = b.toFixed(4);
  return { base: b.toFixed(4), t250: (b + 0.005).toFixed(4), t500: (b + 0.01).toFixed(4) };
}
