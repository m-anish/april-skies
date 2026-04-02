# Prompt: Generate a Monthly Clear Skies Edition

Use this prompt when asking an AI to produce a new monthly edition of the Clear Skies PWA night sky guide.

---

## Files to attach before sending this prompt

Attach all of the following. The AI needs them to understand the engine, avoid regenerating existing sketches, and produce patches rather than full rewrites.

| File | Role | Changes month to month? |
|---|---|---|
| `app.js` | Rendering engine | **Never** |
| `index.html` | HTML shell + CSS | Only the `<script>` data tag |
| `styles.css` | Stylesheet (if extracted) | Never |
| `sw.js` | Service worker | Cache name + data filename |
| `manifest.json` | PWA manifest | Never |
| `sketches.js` | SVG sketch registry | Append-only |
| `constellations.js` | Cover watermark registry | Append-only |
| `quotes.js` | Quote registry | Append-only |
| `objects-db.js` | Autocomplete catalogue | Append-only |
| `log.js` | Log storage engine | Never |
| `log-ui.js` | Log overlay UI | Never |
| `data-[prev-month]-[prev-year].js` | Most recent data file | Reference schema only |

> For the very first month after April 2026, attach `data-april-2026.js` as the reference. For every subsequent month, attach the most recent data file instead.

---

## The Prompt

```
You are generating a new monthly edition of Clear Skies — a static, offline-capable PWA night sky guide for amateur astronomers.

The engine (app.js), shell (index.html), and all shared registries (sketches.js, constellations.js, quotes.js, objects-db.js) are already built and attached. Do not modify them except as noted below.

Produce exactly these outputs:

  OUTPUT 1  — data-[month]-[year].js          (full new file)
  OUTPUT 2  — sketches.js                     (full file — existing entries preserved, new ones appended)
  PATCH A   — index.html script tag           (the one changed line only)
  PATCH B   — sw.js                           (the two changed lines only: CACHE name + data filename in ASSETS)

---

## TARGET MONTH

Month:       [e.g. May]
Year:        [e.g. 2026]
Hemisphere:  northern

## TELESCOPE — copy verbatim, never change

Aperture:       114 mm
Focal ratio:    f/7.9
Focal length:   900 mm
Eyepieces:
  - 25mm → 36×, true FOV 1.44°, AFOV 52°
  - 9mm  → 100×, true FOV 0.52°, AFOV 52°
Limiting magnitude:    ~12
Max useful magnification: 230× (100× practical ceiling most nights)
Light gain:            265× over naked eye
Resolution:            ~1 arcsecond on best nights
Scope note:            Cannot fully resolve globular clusters — only granular halo texture at edges

## OBSERVER — copy verbatim, never change

Author:        Anish Mangal
Contributors:  Ishan Chrungoo, Sohail Lalani
Location:      Northern India (~32°N)

---

## OUTPUT 1 — data-[month]-[year].js

Populate window.SKY_DATA exactly matching the schema below.
Do not add keys not in the schema. Do not remove keys that are in the schema.
All values must be astronomically accurate for the target month/year from 32°N.

```js
window.SKY_DATA = {

  // ── IDENTITY ───────────────────────────────────────────────────────────
  month:       '[Full month name]',
  year:        [4-digit number],
  hemisphere:  'northern',
  title:       '[Month] Skies',
  titleItalic: 'Skies',
  subtitle:    'Northern Hemisphere · Interactive Guide',

  // ── MONTH CHARACTER ────────────────────────────────────────────────────
  // Drives cover watermark, starfield warmth, and italic accent colour.
  // All optional — app.js has sensible defaults if omitted.
  season:             '[winter|spring|summer|autumn]',
  seasonAccent:       '[hex colour — warm amber spring, cool blue winter, deep teal summer, ember autumn]',
  coverConstellation: '[key from constellations.js — leo|virgo|scorpius|cygnus|cassiopeia|perseus|orion|ursa_major]',
  starWarmBias:       [0.0–1.0 — 0.35 neutral, 0.55 summer, 0.25 winter],

  // ── TELESCOPE — copy verbatim ──────────────────────────────────────────
  scope: {
    aperture: 114, fRatio: 7.9, focalLength: 900,
    eyepieces: [
      { focal: 25, mag: 36,  trueFov: 1.44, afov: 52 },
      { focal:  9, mag: 100, trueFov: 0.52, afov: 52 },
    ],
    limitingMag: 12, maxUsefulMag: 230, lightGain: 265, resolution: 1,
    notes: 'Cannot fully resolve globular clusters — only granular halo texture at the edges.',
  },

  // ── CREDITS — copy verbatim ────────────────────────────────────────────
  credits: {
    author:       'Anish Mangal',
    contributors: ['Ishan Chrungoo', 'Sohail Lalani'],
  },

  // ── MOON PHASES ────────────────────────────────────────────────────────
  // Exactly 30 or 31 emoji (match the month's day count).
  // Use only: 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘
  // Verify against timeanddate.com or NASA lunar calendar — do not guess.
  moonPhases: [ /* 30 or 31 emoji, index 0 = day 1 */ ],
  newMoonDay: [1-indexed day — this day gets the gold glow],
  moonEvents: {
    full:     '[e.g. May 12]',
    lastQtr:  '[e.g. May 20]',
    newMoon:  '[e.g. May 27]',
    firstQtr: '[e.g. Jun 3]',
  },

  // ── MOON FEATURES — exactly 4 ──────────────────────────────────────────
  // Pick features visible with 114mm on good nights this month.
  moonFeatures: [
    { name: '...', desc: '...', best: 'Best: [date range] · [eyepiece]' },
    { name: '...', desc: '...', best: 'Best: ...' },
    { name: '...', desc: '...', best: 'Best: ...' },
    { name: '...', desc: '...', best: 'Best: ...' },
  ],

  // ── PLANNER — 6 to 9 rows ──────────────────────────────────────────────
  // type: 'normal' | 'best' | 'warn'
  //   best = teal highlight (new moon window, meteor peak)
  //   warn = orange (full moon, closing windows, interference)
  planner: [
    { dates: '...', targets: '...', time: '...', note: '...', type: 'normal' },
  ],
  // One line: where are the main constellation groups at mid-month, mid-evening
  plannerFooter: '...',

  // ── PLANETS ────────────────────────────────────────────────────────────
  // Include only planets genuinely worth observing. Omit if poorly placed.
  // ease: 1–5. rows: exactly 6 [label, value] pairs.
  planets: [
    {
      name: '...', ease: [1-5],
      rows: [
        ['Constellation',       '...'],
        ['Visible',              '...'],
        ['Sets/rises',           '...'],
        ['Brightness',           'mag ...'],
        ['At 36× (25mm)',        '...'],
        ['At 100× (9mm)',        '...'],
      ],
      note: '...',
    },
  ],

  // ── EVENTS ─────────────────────────────────────────────────────────────
  // type: 'info' (teal) | 'warn' (orange)
  // Include meteor showers, comets, conjunctions, oppositions, anything notable.
  events: [
    { type: 'info', title: '...', body: '...' },
  ],

  // ── OBJECTS — 6 to 9, ordered west to east ─────────────────────────────
  //
  // CRITICAL svgId rules:
  //   - Check the attached sketches.js first.
  //   - If the object's svgId already exists there: use it exactly as-is.
  //     Existing ids: sk_m42, sk_m46, sk_m47, sk_m44, sk_m3, sk_algieba, sk_leo, sk_m51
  //   - If the object is new: assign sk_[id] and generate SVG in OUTPUT 2.
  //   - NEVER embed svg: content in the data file. Only svgId and label.
  //
  objects: [
    {
      id:          '[slug]',
      navLabel:    '[max 8 chars]',
      name:        '[Name] — [Common name]',
      type:        '[Type] · [Constellation] · mag [X] · [distance]',
      ease:        [1-5],
      warning:     null,  // or '⚠ [actionable date constraint]'
      meta: [
        ['Best dates', '...'],
        ['Best time',  '...'],
        ['Direction',  '...'],
        ['Start with / Use', '25mm (36×)'],
        ['Then try / Needs', '9mm (100×) or dark skies etc'],
        ['[6th label]', '...'],
      ],
      description: '[Low-mag view first. High-mag second. What scope CANNOT show. Tip at end.]',
      finder:      '[Start from naked-eye star. Angular distances. Which eyepiece to star-hop with. What it looks like when found.]',
      twoSketch:   false,  // true only if 2 sketches needed (e.g. M46/M47 pair)
      sketches: [
        { svgId: 'sk_...', label: '[eyepiece] · [mag]×\n[one-line visual summary]' },
      ],
    },
  ],

  // ── GLOSSARY — 8 to 12 terms ───────────────────────────────────────────
  // Tailor to terms actually used in this month's objects and descriptions.
  glossary: [
    ['Term', 'Definition'],
  ],

  // One sentence covering this scope's limits — vary the specific object
  // examples to match this month's targets. Fixed numbers never change.
  scopeLimitNote: 'Your 114mm f/7.9 reflector\'s limits: limiting magnitude ~12 under dark skies · max useful magnification ~230× (100× practical ceiling most nights) · 265× more light than the naked eye · resolving power ~1 arcsecond on the best nights · [one month-specific limit note].',

  // Date range of the best dark-sky window (new moon ± ~5 days)
  darkSkyWindow: '[e.g. May 22–Jun 1]',

}; // end SKY_DATA
```

---

## OUTPUT 2 — sketches.js

The attached sketches.js already contains these objects — do not regenerate or modify them:
`sk_m42, sk_m46, sk_m47, sk_m44, sk_m3, sk_algieba, sk_leo, sk_m51`

For every object in OUTPUT 1 whose svgId is NOT in that list, generate a new SVG entry and append it inside `window.SKY_SKETCHES = { ... }` before the closing `};`.

### SVG specification

**Canvas:** viewBox `0 0 140 140`. All coordinates within this space.

**Structure — always in this exact order:**
1. `<defs>` with `<clipPath id="[svgId]">` containing `<circle cx="70" cy="70" r="62"/>`
2. Outer dark ring: `<circle cx="70" cy="70" r="66" fill="#0a0a14"/>`
3. `<g clip-path="url(#[svgId])">` containing:
   - Inner field fill: `<circle cx="70" cy="70" r="62" fill="#0c0c18"/>`
   - Object content (see per-type rules below)
4. Field boundary: `<circle cx="70" cy="70" r="62" fill="none" stroke="#fff" stroke-width="1" opacity=".14"/>`

**The clipPath id must exactly match the svgId key.**

**Per-type rules:**

*Open clusters* — 15–25 star circles. Vary r (0.8–2.6) and opacity (0.4–1.0). Brighter stars r=1.8–2.6, fill `#fff` or `#ffe8c0`. Faint fill stars r=0.8–1.2. Distribute naturally. Dense clusters pack toward centre.

*Globular clusters* — Concentric glow layers: r≈26 fill `#3a3a5c` op .5 → r≈16 fill `#6060a0` op .5 → r≈8 fill `#c0c0e8` op .65 → r≈4 fill `#fff` op .95. Surround with 10–14 halo stars r=0.8–1.2. No resolved core stars.

*Emission/reflection nebulae* — Overlapping ellipses, fills `#3a3060`–`#7868c8`, opacity .35–.7, with `transform="rotate(...)"` for asymmetry. Bright core ellipse `#c0b0f0`–`#fff`. 3–5 field stars. M42-type: fan shape. Ring nebula: annular stroke circle + soft filled centre.

*Galaxies (oval/face-on)* — Ellipse layers with tilt rotation. Outer halo: large ellipse `#4a4a7a` op .5. Inner core: smaller ellipse `#8888bb` op .55. Nucleus: small circle `#ccccee`. Edge-on: very elongated ellipse. Galaxy pairs: separate coordinates per nucleus.

*Double stars* — Primary: r=3–4.5, fill warm gold `#f0c060` or `#fff`, with bright inner circle r=half. Secondary: r=2–3, same pattern. Diffraction halos: stroke circles, opacity .15–.2. Cleanly split pairs: centres 15–20px apart. Tight pairs: 8–12px.

*Planetary nebulae* — Annular ring: stroke circle r=6–9, stroke `#7090c0`, op .5–.7. Soft disc: same cx/cy, r=2–4, fill `#90b0d8`, op .3–.4. 1–2 field stars.

**Background field stars (every sketch):** 2–5 faint stars scattered away from main object, r=0.7–1.2, fill `#fff`, op .4–.65.

**Colour palette:**
```
Sky bg:          #0c0c18    Outer ring:    #0a0a14
Nebula purples:  #3a3060 → #7868c8 → #c0b0f0
Galaxy blues:    #3a3a6a → #6060a0 → #aaaacc → #ccccee
Star white:      #fff       Warm stars:   #ffe8c0
Golden K-giants: #f0c060, #e8b040
Globular glow:   #3a3a5c → #6060a0 → #c0c0e8
```

**Output format:** Each value is a single-line template literal of SVG inner content only — no `<svg>` wrapper tag, no newlines inside the value.

---

## PATCH A — index.html (one line only)

Find the data script tag:
```html
<script src="./data-[previous-month]-[previous-year].js"></script>
```
Change it to:
```html
<script src="./data-[new-month]-[new-year].js"></script>
```
Output only that single changed line.

---

## PATCH B — sw.js (two lines only)

1. Change the cache name: `const CACHE = '[month-slug]-skies-v1';`
   (always reset to v1 for a new month, e.g. `'may-skies-v1'`)
2. Change the data filename in ASSETS: `'./data-[new-month]-[new-year].js'`

Output only those two changed lines.

---

## Quality standards

**Astronomical accuracy (non-negotiable):**
- Moon phase emoji sequence must match the real lunar calendar. Cross-check against timeanddate.com or NASA before finalising — AI lunar calendars are unreliable.
- `newMoonDay` must be the correct 1-indexed calendar day.
- All dates, magnitudes, distances, and constellation positions must be correct for the target month/year.
- Rise/set times and compass directions must be plausible for ~32°N latitude.
- Do not include objects below ~20° altitude or in solar glare.
- Do not include objects requiring aperture larger than 114mm to be meaningfully interesting.

**Writing style:**
- `description`: low-mag view first → high-mag view → what 114mm CANNOT show → one practical tip. Be specific, not generic.
- `finder`: start from a bright naked-eye star → angular hops in degrees or fist-widths → name the star-hop eyepiece → describe what the object looks like when found.
- `note` (planner): punchy, max 8 words.
- `warning`: always begins with ⚠ and gives an actionable date constraint.
- All prose: British English spelling (colour, centre, behaviour, practise).

**Object selection:**
- 6–9 objects per month, ordered west to east (natural observing sequence).
- Mix of types: at least one open cluster, one globular or nebula, one galaxy or double star.
- Prefer ease ≥ 3 for most objects. Include 1–2 challenging objects (ease 1–2) with honest caveats.
- If an object from the existing sketches.js is well-placed this month, prefer reusing it — no new SVG needed.

---

## Output format

Produce in this exact order, clearly delimited with headers:

### OUTPUT 1: data-[month]-[year].js
[full file]

### OUTPUT 2: sketches.js
[full file — all existing entries preserved, new entries appended]

### PATCH A: index.html
[the single changed script src line]

### PATCH B: sw.js
[the two changed lines]
```

---

## Notes for the person using this prompt

**Do not ask the AI to regenerate `app.js`, `log.js`, `log-ui.js`, `objects-db.js`, `constellations.js`, `quotes.js`, `manifest.json`, or the CSS.** These are stable and should never change month to month. The only engine files that change are `index.html` (one line) and `sw.js` (two lines).

**Moon phases need independent verification.** AI models frequently miscalculate lunar calendars. Always cross-check `moonPhases[]` and `newMoonDay` against a reliable source before publishing. The visual on the Moon slide will be obviously wrong if the phases are off.

**Reusing existing sketches is always preferred.** Before the AI generates a new SVG, check whether that object is already in `sketches.js`. M3, M42, M44, M46, M47, M51, Algieba, and the Leo Triplet are already there. Summer months can reuse M3 and M51. M44 is a spring–autumn fixture. Each reuse saves ~2KB and a round of SVG generation.

**SVGs are artistic impressions, not simulations.** Slight inaccuracies in star placement are acceptable. What matters is that object type, brightness character, and visual texture are representative of what the 114mm scope shows at the stated magnification.

**After deploying**, open the browser console. Any missing `svgId` reference will log: `[app.js] Missing sketch: sk_xxx — add it to sketches.js`. This is your sanity check.

**The `coverConstellation` field** references a key in `constellations.js`. Current keys: `leo, virgo, scorpius, cygnus, cassiopeia, perseus, orion, ursa_major`. To add a new constellation for a month not yet covered, append it to `constellations.js` — the file comments explain the SVG format.

**The `seasonAccent` colour** tints the year number on the cover and the active nav item. Suggested palette:
- Winter (Dec–Feb): `#7090c8` (cool blue-white)
- Spring (Mar–May): `#c8955a` (warm amber-rose)
- Summer (Jun–Aug): `#5ab89a` (deep teal-green, Milky Way season)
- Autumn (Sep–Nov): `#c87840` (ember orange)
