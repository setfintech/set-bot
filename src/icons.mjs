// icons.mjs — elementos 3D del kit SET (SVG con degradados): cruces "+", monedas, billetes, escudo, reloj, candado,
// check, % en sello rojo, flechas curvas y banderas. El isotipo Set nunca se redibuja: siempre se usa el PNG real.
const defs = `<defs>
<linearGradient id="gV" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8FDA6E"/><stop offset=".5" stop-color="#3FAE4F"/><stop offset="1" stop-color="#1B7A36"/></linearGradient>
<linearGradient id="gVd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F8A3C"/><stop offset="1" stop-color="#0F5A26"/></linearGradient>
<linearGradient id="gW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#D9E3DC"/></linearGradient>
<linearGradient id="gWd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9C6BD"/><stop offset="1" stop-color="#8FA095"/></linearGradient>
<linearGradient id="gL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D8F3B8"/><stop offset="1" stop-color="#8CC573"/></linearGradient>
<linearGradient id="gLd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6FA457"/><stop offset="1" stop-color="#4E8039"/></linearGradient>
<radialGradient id="gGold" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#FFF1A8"/><stop offset=".45" stop-color="#F7C530"/><stop offset="1" stop-color="#C98A0B"/></radialGradient>
<linearGradient id="gGoldE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D79A12"/><stop offset="1" stop-color="#9A6606"/></linearGradient>
<linearGradient id="gBill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B7E39A"/><stop offset=".6" stop-color="#63B650"/><stop offset="1" stop-color="#3C8E35"/></linearGradient>
<linearGradient id="gRed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF6A5E"/><stop offset="1" stop-color="#C62520"/></linearGradient>
<linearGradient id="gBlue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8FC3FF"/><stop offset="1" stop-color="#2D6FD6"/></linearGradient>
<linearGradient id="gGrey" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6B737B"/><stop offset="1" stop-color="#2F3439"/></linearGradient>
</defs>`;
const wrap = (vb, inner) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${defs}${inner}</svg>`;

// cruz 3D: cara frontal + extrusión inferior/derecha
const plus = (f, e) => wrap("0 0 120 124", `
<path d="M44 12h32v32h32v32H76v32H44V76H12V44h32z" transform="translate(6 8)" fill="url(#${e})"/>
<path d="M44 12h32v32h32v32H76v32H44V76H12V44h32z" fill="url(#${f})"/>
<path d="M48 16h10v28" stroke="#fff" stroke-width="5" opacity=".45" fill="none" stroke-linecap="round"/>`);

const coin = (cx, cy, r) => `
<ellipse cx="${cx}" cy="${cy + r * .18}" rx="${r}" ry="${r * .98}" fill="url(#gGoldE)"/>
<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#gGold)"/>
<circle cx="${cx}" cy="${cy}" r="${r * .76}" fill="none" stroke="#B87C07" stroke-width="${r * .07}" opacity=".6"/>
<text x="${cx}" y="${cy + r * .36}" text-anchor="middle" font-family="Arial" font-weight="900" font-size="${r * 1.05}" fill="#B87C07">$</text>
<path d="M${cx - r * .66} ${cy - r * .38} A${r * .78} ${r * .78} 0 0 1 ${cx + r * .06} ${cy - r * .76}" stroke="#fff" stroke-width="${r * .1}" fill="none" stroke-linecap="round" opacity=".75"/>`;

const bill = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
<rect x="0" y="8" width="200" height="104" rx="10" fill="#2F7A2B"/>
<rect x="0" y="0" width="200" height="104" rx="10" fill="url(#gBill)"/>
<rect x="10" y="10" width="180" height="84" rx="8" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/>
<circle cx="100" cy="52" r="26" fill="#fff" opacity=".35"/><text x="100" y="66" text-anchor="middle" font-family="Arial" font-weight="900" font-size="40" fill="#2F7A2B">$</text></g>`;

const flag = (inner) => wrap("0 0 120 120", `<defs><clipPath id="fc"><circle cx="60" cy="60" r="52"/></clipPath></defs>
<circle cx="60" cy="66" r="52" fill="#000" opacity=".18"/>
<g clip-path="url(#fc)">${inner}</g>
<circle cx="60" cy="60" r="52" fill="none" stroke="#fff" stroke-width="7"/>
<path d="M28 34 A40 40 0 0 1 60 18" stroke="#fff" stroke-width="6" fill="none" opacity=".5" stroke-linecap="round"/>`);
const star = (cx, cy, r, c = "#fff") => { let d = ""; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; d += `${i ? "L" : "M"}${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`; } return `<path d="${d}Z" fill="${c}"/>`; };

export const ICONS = {
  plus: plus("gV", "gVd"),
  plusW: plus("gW", "gWd"),
  plusL: plus("gL", "gLd"),
  coin: wrap("0 0 200 210", coin(100, 96, 84)),
  coins: wrap("0 0 300 280", coin(92, 190, 64) + coin(208, 170, 72) + coin(146, 88, 62)),
  bills: wrap("0 0 300 240", bill(40, 110, -14) + bill(70, 60, -4) + bill(96, 20, 8)),
  shield: wrap("0 0 200 230", `
<path d="M104 18 L184 46 V110 C184 162 148 198 104 220 C60 198 24 162 24 110 V46 Z" fill="#0F5A26"/>
<path d="M100 10 L176 38 V104 C176 154 140 190 100 210 C60 190 24 154 24 104 V38 Z" fill="url(#gV)"/>
<path d="M100 26 L162 48 V104 C162 144 134 174 100 192 C66 174 38 144 38 104 V48 Z" fill="none" stroke="#fff" stroke-width="5" opacity=".35"/>
<path d="M64 108 l26 28 50-58" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  clock: wrap("0 0 210 230", `
<circle cx="62" cy="30" r="22" fill="url(#gRed)"/><circle cx="148" cy="30" r="22" fill="url(#gRed)"/>
<circle cx="110" cy="134" r="86" fill="#0F5A26"/>
<circle cx="104" cy="126" r="86" fill="url(#gV)"/>
<circle cx="104" cy="126" r="66" fill="#fff"/>
<g stroke="#1B7A36" stroke-width="8" stroke-linecap="round"><path d="M104 126V84"/><path d="M104 126L134 142"/></g>
<circle cx="104" cy="126" r="9" fill="url(#gRed)"/>`),
  lock: wrap("0 0 200 230", `
<path d="M56 104 V70 a44 44 0 0 1 88 0 V104" stroke="url(#gGrey)" stroke-width="20" fill="none"/>
<rect x="30" y="100" width="140" height="120" rx="24" fill="url(#gGoldE)" transform="translate(6 6)"/>
<rect x="30" y="100" width="140" height="120" rx="24" fill="url(#gGold)"/>
<circle cx="100" cy="150" r="16" fill="#9A6606"/><rect x="93" y="152" width="14" height="36" rx="7" fill="#9A6606"/>`),
  check: wrap("0 0 200 210", `
<circle cx="106" cy="110" r="88" fill="#0F5A26"/>
<circle cx="100" cy="100" r="88" fill="url(#gV)"/>
<path d="M56 102 l32 32 58-66" stroke="#fff" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  percent: wrap("0 0 200 200", (() => { let d = ""; for (let i = 0; i < 24; i++) { const a = i * Math.PI / 12, r = i % 2 ? 78 : 94; d += `${i ? "L" : "M"}${(100 + r * Math.cos(a)).toFixed(1)} ${(100 + r * Math.sin(a)).toFixed(1)}`; } return `<path d="${d}Z" transform="translate(4 8)" fill="#8E1512"/><path d="${d}Z" fill="url(#gRed)"/><circle cx="100" cy="100" r="58" fill="#fff"/><text x="100" y="128" text-anchor="middle" font-family="Arial" font-weight="900" font-size="80" fill="#D0302A">%</text>`; })()),
  chat: wrap("0 0 220 200", `
<path d="M36 26 h160 a22 22 0 0 1 22 22 v80 a22 22 0 0 1 -22 22 H102 L58 186 V150 H36 a22 22 0 0 1 -22 -22 V48 a22 22 0 0 1 22 -22z" fill="#0F5A26" transform="translate(6 6)"/>
<path d="M30 20 h160 a22 22 0 0 1 22 22 v80 a22 22 0 0 1 -22 22 H96 L52 180 V144 H30 a22 22 0 0 1 -22 -22 V42 a22 22 0 0 1 22 -22z" fill="url(#gV)"/>
<g fill="#fff"><circle cx="70" cy="82" r="12"/><circle cx="110" cy="82" r="12"/><circle cx="150" cy="82" r="12"/></g>`),
  globe: wrap("0 0 200 200", `
<circle cx="104" cy="106" r="86" fill="#0E3F7A"/>
<circle cx="100" cy="100" r="86" fill="url(#gBlue)"/>
<path d="M60 50 q30 -6 40 14 q-10 16 6 26 q18 6 10 26 q-14 20 -30 8 q-10 -24 -26 -20 q-16 -14 0 -54z M130 40 q24 10 34 40 q-14 4 -24 -10 q-14 -6 -10 -30z M120 130 q20 -6 34 8 q-6 26 -30 34 q-12 -16 -4 -42z" fill="url(#gV)"/>
<path d="M44 70 A70 70 0 0 1 90 30" stroke="#fff" stroke-width="8" opacity=".45" fill="none" stroke-linecap="round"/>`),
  calendar: wrap("0 0 200 210", `
<rect x="26" y="40" width="160" height="156" rx="26" fill="#0F5A26" transform="translate(6 6)"/>
<rect x="26" y="40" width="160" height="156" rx="26" fill="#fff"/>
<path d="M26 66 a26 26 0 0 1 26 -26 h108 a26 26 0 0 1 26 26 v24 H26z" fill="url(#gRed)"/>
<rect x="60" y="22" width="16" height="40" rx="8" fill="url(#gGrey)"/><rect x="136" y="22" width="16" height="40" rx="8" fill="url(#gGrey)"/>
${[0, 1, 2, 3].map((c) => [0, 1].map((r) => `<rect x="${46 + c * 32}" y="${108 + r * 36}" width="24" height="24" rx="6" fill="${c === 3 && r === 1 ? "#D0302A" : "#CFE8D6"}"/>`).join("")).join("")}
<path d="M53 125 l6 6 12-13" stroke="#1B7A36" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  rocket: wrap("0 0 200 220", `
<path d="M100 10 C150 40 160 110 132 160 H68 C40 110 50 40 100 10z" fill="#fff"/>
<path d="M100 10 C150 40 160 110 132 160 H100z" fill="#D9E3DC"/>
<circle cx="100" cy="80" r="22" fill="url(#gBlue)" stroke="#8FA095" stroke-width="6"/>
<path d="M68 130 L34 170 L70 164z M132 130 L166 170 L130 164z" fill="url(#gRed)"/>
<path d="M78 160 Q100 214 122 160z" fill="#F7C530"/>`),
  mail: wrap("0 0 220 180", `
<rect x="18" y="30" width="190" height="136" rx="20" fill="#0F5A26" transform="translate(6 6)"/>
<rect x="18" y="30" width="190" height="136" rx="20" fill="url(#gW)"/>
<path d="M22 44 L113 110 L204 44" stroke="#1B7A36" stroke-width="12" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="182" cy="42" r="28" fill="url(#gRed)"/><text x="182" y="53" text-anchor="middle" font-family="Arial" font-weight="900" font-size="32" fill="#fff">1</text>`),
  bank: wrap("0 0 220 210", `
<path d="M110 14 L206 64 H14 Z" fill="#0F5A26" transform="translate(5 5)"/>
<path d="M110 14 L206 64 H14 Z" fill="url(#gV)"/>
<g fill="url(#gW)">${[40, 80, 120, 160].map((x) => `<rect x="${x}" y="74" width="22" height="84" rx="6"/>`).join("")}</g>
<rect x="14" y="164" width="192" height="30" rx="8" fill="url(#gV)"/>
<circle cx="110" cy="44" r="10" fill="#fff" opacity=".8"/>`),
  // flecha curva (trazo blanco) — recurso del kit
  arrowW: wrap("0 0 300 240", `<path d="M20 40 C 60 200, 200 220, 262 150" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M226 128 L270 142 L250 184" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  arrowG: wrap("0 0 300 240", `<path d="M20 40 C 60 200, 200 220, 262 150" stroke="#7FD08E" stroke-width="22" fill="none" stroke-linecap="round" opacity=".9"/><path d="M216 126 L276 140 L252 196" stroke="#7FD08E" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>`),
  // banderas circulares
  cl: flag(`<rect x="0" y="0" width="120" height="60" fill="#fff"/><rect x="0" y="60" width="120" height="60" fill="#D52B1E"/><rect x="0" y="0" width="56" height="60" fill="#0039A6"/>${star(28, 30, 15)}`),
  ve: flag(`<rect x="0" y="0" width="120" height="40" fill="#FFCC00"/><rect x="0" y="40" width="120" height="40" fill="#00247D"/><rect x="0" y="80" width="120" height="40" fill="#CF142B"/>${[...Array(8)].map((_, i) => { const a = Math.PI * (1.15 + i * .1); return star(60 + 26 * Math.cos(a), 72 + 26 * Math.sin(a), 4); }).join("")}`),
  pe: flag(`<rect width="120" height="120" fill="#fff"/><rect width="40" height="120" fill="#D91023"/><rect x="80" width="40" height="120" fill="#D91023"/>`),
  co: flag(`<rect width="120" height="60" fill="#FCD116"/><rect y="60" width="120" height="30" fill="#003893"/><rect y="90" width="120" height="30" fill="#CE1126"/>`),
  ar: flag(`<rect width="120" height="120" fill="#fff"/><rect width="120" height="40" fill="#74ACDF"/><rect y="80" width="120" height="40" fill="#74ACDF"/><circle cx="60" cy="60" r="11" fill="#F6B40E"/>`),
  br: flag(`<rect width="120" height="120" fill="#009C3B"/><path d="M60 22 L106 60 L60 98 L14 60z" fill="#FFDF00"/><circle cx="60" cy="60" r="22" fill="#002776"/>`),
  us: flag(`<rect width="120" height="120" fill="#fff"/>${[0, 2, 4, 6, 8, 10, 12].map((k) => `<rect y="${k * 9.2}" width="120" height="9.2" fill="#B22234"/>`).join("")}<rect width="58" height="64" fill="#3C3B6E"/>${[0, 1, 2].map((r) => [0, 1, 2].map((c) => star(12 + c * 17, 12 + r * 19, 5)).join("")).join("")}`),
  ec: flag(`<rect width="120" height="60" fill="#FFD100"/><rect y="60" width="120" height="30" fill="#0072CE"/><rect y="90" width="120" height="30" fill="#EF3340"/><circle cx="60" cy="58" r="12" fill="#6B4A2B" opacity=".8"/>`),
};

export const icon = (name, style = "") => `<div class="ico" style="${style}">${ICONS[name]}</div>`;
// nube de cruces flotantes (firma del kit): lista de [x, y, tamaño, variante]
export const crosses = (list) => list.map(([x, y, s, v = "plus", rot = 0]) => icon(v, `left:${x}px;top:${y}px;width:${s}px;height:${s}px;transform:rotate(${rot}deg)`)).join("");
