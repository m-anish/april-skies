// ─────────────────────────────────────────────────────────────────────────────
// constellations.js — Faint cover watermark constellation silhouettes.
// Each entry is a raw SVG path/group drawn on a 400×300 viewBox.
// app.js renders the matching key at very low opacity behind the cover title.
// Referenced from SKY_DATA.coverConstellation.
// To add more: append a key below. Nothing else changes.
// ─────────────────────────────────────────────────────────────────────────────

window.SKY_CONSTELLATIONS = {

  // ── LEO (April / May) ─────────────────────────────────────────────────────
  // The Sickle + hindquarters
  leo: `
    <g stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Sickle: Regulus up through the curve -->
      <polyline points="160,230 150,195 145,165 158,145 178,138 195,148 185,168 158,145"/>
      <!-- Body to tail -->
      <line x1="150" y1="195" x2="130" y2="185"/>
      <line x1="130" y1="185" x2="105" y2="190"/>
      <line x1="105" y1="190" x2="85"  y2="175"/>
      <line x1="85"  y1="175" x2="75"  y2="155"/>
      <!-- Denebola tail -->
      <line x1="75"  y1="155" x2="55"  y2="148"/>
      <!-- Star dots -->
      <circle cx="160" cy="230" r="3.5" fill="currentColor"/><!-- Regulus -->
      <circle cx="185" cy="168" r="2.5" fill="currentColor"/><!-- Eta -->
      <circle cx="195" cy="148" r="2"   fill="currentColor"/>
      <circle cx="178" cy="138" r="2"   fill="currentColor"/>
      <circle cx="158" cy="145" r="2.5" fill="currentColor"/><!-- Algieba -->
      <circle cx="145" cy="165" r="2"   fill="currentColor"/>
      <circle cx="150" cy="195" r="2"   fill="currentColor"/>
      <circle cx="130" cy="185" r="2"   fill="currentColor"/>
      <circle cx="105" cy="190" r="2"   fill="currentColor"/>
      <circle cx="85"  cy="175" r="2"   fill="currentColor"/>
      <circle cx="75"  cy="155" r="2"   fill="currentColor"/>
      <circle cx="55"  cy="148" r="3"   fill="currentColor"/><!-- Denebola -->
    </g>`,

  // ── ORION (Dec / Jan / Feb) ───────────────────────────────────────────────
  orion: `
    <g stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Belt -->
      <line x1="175" y1="155" x2="200" y2="152"/>
      <line x1="200" y1="152" x2="225" y2="149"/>
      <!-- Shoulders -->
      <line x1="175" y1="155" x2="155" y2="115"/>
      <line x1="225" y1="149" x2="248" y2="112"/>
      <!-- Head -->
      <line x1="155" y1="115" x2="195" y2="100"/>
      <line x1="248" y1="112" x2="195" y2="100"/>
      <!-- Feet -->
      <line x1="175" y1="155" x2="162" y2="205"/>
      <line x1="225" y1="149" x2="240" y2="200"/>
      <!-- Sword (below belt) -->
      <line x1="200" y1="152" x2="198" y2="175"/>
      <!-- Star dots -->
      <circle cx="175" cy="155" r="3"   fill="currentColor"/><!-- Mintaka -->
      <circle cx="200" cy="152" r="3"   fill="currentColor"/><!-- Alnilam -->
      <circle cx="225" cy="149" r="3"   fill="currentColor"/><!-- Alnitak -->
      <circle cx="155" cy="115" r="4"   fill="currentColor"/><!-- Betelgeuse -->
      <circle cx="248" cy="112" r="3.5" fill="currentColor"/><!-- Bellatrix -->
      <circle cx="195" cy="100" r="2"   fill="currentColor"/><!-- Head -->
      <circle cx="162" cy="205" r="3.5" fill="currentColor"/><!-- Rigel -->
      <circle cx="240" cy="200" r="2.5" fill="currentColor"/><!-- Saiph -->
      <circle cx="198" cy="175" r="2"   fill="currentColor"/><!-- Sword tip -->
    </g>`,

  // ── SCORPIUS (Jun / Jul / Aug) ────────────────────────────────────────────
  scorpius: `
    <g stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Head claws -->
      <line x1="230" y1="85"  x2="210" y2="100"/>
      <line x1="210" y1="100" x2="195" y2="115"/>
      <line x1="210" y1="100" x2="220" y2="120"/>
      <!-- Body down to tail -->
      <polyline points="195,115 185,135 185,155 190,175 200,195 210,210 225,222 240,218 248,205 242,192"/>
      <!-- Antares area -->
      <circle cx="185" cy="135" r="4.5" fill="currentColor"/><!-- Antares -->
      <!-- Star dots -->
      <circle cx="230" cy="85"  r="2"   fill="currentColor"/>
      <circle cx="210" cy="100" r="2"   fill="currentColor"/>
      <circle cx="195" cy="115" r="2"   fill="currentColor"/>
      <circle cx="185" cy="155" r="2"   fill="currentColor"/>
      <circle cx="190" cy="175" r="2"   fill="currentColor"/>
      <circle cx="200" cy="195" r="2"   fill="currentColor"/>
      <circle cx="210" cy="210" r="2"   fill="currentColor"/>
      <circle cx="225" cy="222" r="2"   fill="currentColor"/>
      <circle cx="240" cy="218" r="2.5" fill="currentColor"/><!-- Stinger 1 -->
      <circle cx="248" cy="205" r="2.5" fill="currentColor"/><!-- Stinger 2 -->
    </g>`,

  // ── CYGNUS (Jul / Aug / Sep) ──────────────────────────────────────────────
  // The Northern Cross / Swan
  cygnus: `
    <g stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Long axis: Deneb to Albireo -->
      <line x1="200" y1="80"  x2="200" y2="220"/>
      <!-- Crossbar: wings -->
      <line x1="120" y1="150" x2="280" y2="150"/>
      <!-- Star dots -->
      <circle cx="200" cy="80"  r="4"   fill="currentColor"/><!-- Deneb -->
      <circle cx="200" cy="150" r="3"   fill="currentColor"/><!-- Sadr (centre) -->
      <circle cx="200" cy="220" r="3"   fill="currentColor"/><!-- Albireo -->
      <circle cx="120" cy="150" r="2.5" fill="currentColor"/><!-- Wing tip -->
      <circle cx="280" cy="150" r="2.5" fill="currentColor"/><!-- Wing tip -->
      <circle cx="200" cy="115" r="2"   fill="currentColor"/>
      <circle cx="200" cy="185" r="2"   fill="currentColor"/>
    </g>`,

  // ── CASSIOPEIA (Oct / Nov) ────────────────────────────────────────────────
  // The W
  cassiopeia: `
    <g stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="110,130 150,170 200,140 250,175 300,130"/>
      <circle cx="110" cy="130" r="2.5" fill="currentColor"/>
      <circle cx="150" cy="170" r="2.5" fill="currentColor"/>
      <circle cx="200" cy="140" r="3.5" fill="currentColor"/><!-- Gamma Cas -->
      <circle cx="250" cy="175" r="2.5" fill="currentColor"/>
      <circle cx="300" cy="130" r="2.5" fill="currentColor"/>
    </g>`,

  // ── PERSEUS (Nov / Dec) ───────────────────────────────────────────────────
  perseus: `
    <g stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="195,75 200,100 195,125 185,148 175,168 165,188"/>
      <line x1="200" y1="100" x2="225" y2="112"/>
      <line x1="195" y1="125" x2="220" y2="130"/>
      <line x1="185" y1="148" x2="210" y2="155"/>
      <line x1="175" y1="168" x2="155" y2="155"/>
      <line x1="165" y1="188" x2="145" y2="198"/>
      <circle cx="195" cy="75"  r="3.5" fill="currentColor"/><!-- Mirfak -->
      <circle cx="200" cy="100" r="2.5" fill="currentColor"/>
      <circle cx="195" cy="125" r="2"   fill="currentColor"/>
      <circle cx="185" cy="148" r="3"   fill="currentColor"/><!-- Algol -->
      <circle cx="175" cy="168" r="2"   fill="currentColor"/>
      <circle cx="165" cy="188" r="2"   fill="currentColor"/>
      <circle cx="225" cy="112" r="2"   fill="currentColor"/>
      <circle cx="220" cy="130" r="2"   fill="currentColor"/>
      <circle cx="210" cy="155" r="2"   fill="currentColor"/>
      <circle cx="155" cy="155" r="2"   fill="currentColor"/>
      <circle cx="145" cy="198" r="2"   fill="currentColor"/>
    </g>`,

  // ── VIRGO (Mar / Apr / May) ───────────────────────────────────────────────
  virgo: `
    <g stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="200,85 195,110 185,135 190,160 200,180 205,205"/>
      <line x1="185" y1="135" x2="160" y2="128"/>
      <line x1="160" y1="128" x2="138" y2="118"/>
      <line x1="185" y1="135" x2="175" y2="158"/>
      <line x1="190" y1="160" x2="215" y2="155"/>
      <line x1="215" y1="155" x2="240" y2="148"/>
      <line x1="195" y1="110" x2="218" y2="105"/>
      <circle cx="200" cy="85"  r="2"   fill="currentColor"/>
      <circle cx="195" cy="110" r="2"   fill="currentColor"/>
      <circle cx="185" cy="135" r="2"   fill="currentColor"/>
      <circle cx="190" cy="160" r="4.5" fill="currentColor"/><!-- Spica -->
      <circle cx="200" cy="180" r="2"   fill="currentColor"/>
      <circle cx="205" cy="205" r="2"   fill="currentColor"/>
      <circle cx="160" cy="128" r="2"   fill="currentColor"/>
      <circle cx="138" cy="118" r="2"   fill="currentColor"/>
      <circle cx="175" cy="158" r="2"   fill="currentColor"/>
      <circle cx="215" cy="155" r="2"   fill="currentColor"/>
      <circle cx="240" cy="148" r="2"   fill="currentColor"/>
      <circle cx="218" cy="105" r="2"   fill="currentColor"/>
    </g>`,

  // ── URSA MAJOR / BIG DIPPER (year-round, northern) ───────────────────────
  ursa_major: `
    <g stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Bowl -->
      <polyline points="140,170 165,155 195,160 185,185 140,170"/>
      <!-- Handle -->
      <polyline points="140,170 115,148 95,120 80,95"/>
      <!-- Star dots -->
      <circle cx="140" cy="170" r="3"   fill="currentColor"/><!-- Phecda -->
      <circle cx="165" cy="155" r="3"   fill="currentColor"/><!-- Megrez -->
      <circle cx="195" cy="160" r="3"   fill="currentColor"/><!-- Alioth -->
      <circle cx="185" cy="185" r="3"   fill="currentColor"/><!-- Merak -->
      <circle cx="165" cy="190" r="3"   fill="currentColor"/><!-- Dubhe -->
      <circle cx="115" cy="148" r="3"   fill="currentColor"/><!-- Mizar -->
      <circle cx="95"  cy="120" r="2.5" fill="currentColor"/><!-- Alioth -->
      <circle cx="80"  cy="95"  r="3"   fill="currentColor"/><!-- Alkaid -->
    </g>`,

};
