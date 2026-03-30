# Prompt: Generate a Monthly Night Sky Guide Edition

Use this prompt verbatim (or with the variables filled in) when asking an AI to produce a new monthly edition of the Night Sky PWA.

---

## Context to provide before the prompt

Attach or paste the following files in full before sending this prompt:

| File | Purpose |
|---|---|
| `app.js` | The rendering engine — never changes |
| `index.html` | The shell — only the `<script>` tag for the data file changes |
| `sketches.js` | The SVG registry — will be appended to, not replaced |
| `sw.js` | Service worker — cache name and asset list needs updating |
| `data-april-2026.js` | The reference data file — the schema to follow exactly |

> If you are generating a second or later month, also attach the most recent `data-[month]-[year].js` so the AI has the freshest example.

---

## The Prompt

```
You are generating a new monthly edition of a progressive web app (PWA) night sky guide.
The app is a static, offline-capable swipe-deck for amateur astronomers.
The engine (app.js), shell (index.html structure), and SVG registry (sketches.js) are already built and attached.
Your job is to produce exactly two output files and one patch:

OUTPUT 1 — data-[month]-[year].js
OUTPUT 2 — sketches.js (full updated file with new sketches appended)
PATCH     — the two changed lines in index.html and the cache bump in sw.js

---

## TARGET MONTH

Month:       [e.g. May]
Year:        [e.g. 2026]
Hemisphere:  [northern / southern]

## TELESCOPE (do not change these — they belong to the same observer)

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

## OBSERVER

Author:        Anish Mangal
Contributors:  Ishan Chrungoo, Sohail Lalani
Location:      Northern India (~32°N) — affects rise/set times and altitude notes

---

## RULES FOR data-[month]-[year].js

The file must populate window.SKY_DATA exactly matching the schema below.
Do not add any keys that are not in the schema.
Do not remove any keys that are in the schema.
All values must be accurate for the target month and year from the observer's location.

### Schema (with field-level instructions)

```js
window.SKY_DATA = {

  // ── IDENTITY ──────────────────────────────────────────────────────────────
  month:       '[Full month name, e.g. May]',
  year:        [4-digit year, number],
  hemisphere:  'northern',
  title:       '[Month] Skies',
  titleItalic: 'Skies',           // always 'Skies' — the gold italic word on the cover
  subtitle:    'Northern Hemisphere · Interactive Guide',

  // ── TELESCOPE ─────────────────────────────────────────────────────────────
  // Copy this block verbatim — it never changes
  scope: {
    aperture:     114,
    fRatio:       7.9,
    focalLength:  900,
    eyepieces: [
      { focal: 25, mag: 36,  trueFov: 1.44, afov: 52 },
      { focal:  9, mag: 100, trueFov: 0.52, afov: 52 },
    ],
    limitingMag:  12,
    maxUsefulMag: 230,
    lightGain:    265,
    resolution:   1,
    notes: 'Cannot fully resolve globular clusters — only granular halo texture at the edges.',
  },

  // ── CREDITS ───────────────────────────────────────────────────────────────
  // Copy this block verbatim — it never changes
  credits: {
    author:       'Anish Mangal',
    contributors: ['Ishan Chrungoo', 'Sohail Lalani'],
  },

  // ── MOON PHASES ───────────────────────────────────────────────────────────
  // moonPhases: array of 30 or 31 emoji (one per day of the month)
  // Use: 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 only
  // newMoonDay: 1-indexed day of the new moon (this day gets the gold glow in the UI)
  moonPhases: [ /* 30 or 31 emoji */ ],
  newMoonDay: [number],
  moonEvents: {
    full:    '[e.g. May 12]',
    lastQtr: '[e.g. May 20]',
    newMoon: '[e.g. May 27]',
    firstQtr:'[e.g. Jun 3]',
  },

  // ── MOON FEATURES ─────────────────────────────────────────────────────────
  // Exactly 4 features. Pick features visible with this scope on GOOD nights THIS month.
  // best: string starting with "Best:" followed by date range and eyepiece recommendation
  moonFeatures: [
    { name: '...', desc: '...', best: 'Best: ...' },
    { name: '...', desc: '...', best: 'Best: ...' },
    { name: '...', desc: '...', best: 'Best: ...' },
    { name: '...', desc: '...', best: 'Best: ...' },
  ],

  // ── PLANNER ───────────────────────────────────────────────────────────────
  // 6–9 rows covering the whole month in date windows.
  // type: 'normal' | 'best' | 'warn'
  //   best  = teal highlight (new moon / dark sky window / meteor peak)
  //   warn  = orange note (full moon, closing windows, bright interference)
  //   normal = standard row
  planner: [
    { dates: '...', targets: '...', time: '...', note: '...', type: 'normal' },
    // ...
  ],
  // Single line summary of where major constellation groups are in the sky at mid-month
  plannerFooter: '...',

  // ── PLANETS ───────────────────────────────────────────────────────────────
  // Include only planets that are genuinely worth observing this month.
  // Omit planets that are too close to the sun or poorly placed.
  // ease: 1–5 (5 = trivial, 1 = very hard)
  // rows: exactly 6 [label, value] pairs
  planets: [
    {
      name: '...',
      ease: [1-5],
      rows: [
        ['Constellation', '...'],
        ['Visible',        '...'],
        ['Sets after sunset / Rises before sunrise', '...'],
        ['Brightness',     'mag ...'],
        ['At 36× (25mm)', '...'],
        ['At 100× (9mm)', '...'],
      ],
      note: '...',
    },
  ],

  // ── EVENTS ────────────────────────────────────────────────────────────────
  // Special alerts shown below the planet cards.
  // type: 'warn' (orange border) | 'info' (teal border)
  // Include: meteor showers, comets, conjunctions, oppositions, anything notable
  events: [
    { type: 'info', title: '...', body: '...' },
  ],

  // ── OBJECTS ───────────────────────────────────────────────────────────────
  // 6–9 objects ordered WEST to EAST (approximate observing sequence for the month).
  // Each object is a full card slide.
  //
  // id: short lowercase slug (e.g. 'm13', 'double_cluster', 'arcturus')
  // navLabel: very short label for the sub-nav (max ~8 chars)
  // ease: 1–5
  // warning: string with ⚠ prefix, or null
  // meta: exactly 6 [label, value] pairs
  // twoSketch: true if the object has two sketches (side-by-side layout), false otherwise
  // sketches: array of sketch references — 1 item if twoSketch:false, 2 if twoSketch:true
  //
  // CRITICAL — svgId naming convention:
  //   - Prefix with 'sk_'
  //   - Use the object id: sk_m13, sk_double_cluster, sk_m57 etc.
  //   - If the object already exists in the attached sketches.js, use the EXISTING svgId exactly
  //   - If it is a NEW object, assign a new svgId — you will add its SVG to sketches.js
  //
  // NEVER embed svg: fields in this file. Only svgId and label belong here.

  objects: [
    {
      id:          '...',
      navLabel:    '...',
      name:        '... — ...',
      type:        '[Object type] · [Constellation] · mag [X] · [distance] ly',
      ease:        [1-5],
      warning:     null,   // or '⚠ ...'
      meta: [
        ['Best dates', '...'],
        ['Best time',  '...'],
        ['Direction',  '...'],
        ['Start with', '25mm (36×)'],   // or Use / eyepiece instruction
        ['Then try',   '9mm (100×)'],   // or Needs / skip if not applicable
        ['Needs',      '...'],          // dark skies / steady seeing / etc
      ],
      description: '...',   // What the observer will actually see. Be specific to 114mm.
      finder:      '...',   // Step-by-step naked-eye + eyepiece star-hop instructions.
      twoSketch:   false,
      sketches: [
        { svgId: 'sk_...', label: '[eyepiece] · [mag]×\n[one-line visual description]' },
      ],
    },
  ],

  // ── GLOSSARY ──────────────────────────────────────────────────────────────
  // 8–12 terms actually used in this month's guide. Tailor to the objects selected.
  glossary: [
    ['Term', 'Definition'],
  ],

  // Single sentence summarising the scope's limits. Vary the specific objects mentioned
  // to reflect this month's targets. The fixed facts (aperture, mag, lightgain) never change.
  scopeLimitNote: 'Your 114mm f/7.9 reflector\'s limits: limiting magnitude ~12 under dark skies · max useful magnification ~230× (100× practical ceiling most nights) · 265× more light than the naked eye · resolving power ~1 arcsecond on the best nights · [add one month-specific limit note].',

  // ── CONDITIONS ────────────────────────────────────────────────────────────
  // The date range for the best dark-sky window this month (around new moon ± 5 days)
  darkSkyWindow: '[e.g. May 22–Jun 1]',

}; // end SKY_DATA
```

---

## RULES FOR sketches.js

The attached sketches.js already contains SVGs for these objects (do not regenerate them):
sk_m42, sk_m46, sk_m47, sk_m44, sk_m3, sk_algieba, sk_leo, sk_m51

For every object in the new data file whose svgId IS NOT in that list, you must generate a new SVG and append it to the registry.

### SVG sketch specification

Each sketch simulates the telescopic view through an eyepiece. Follow these rules precisely:

**Canvas:** viewBox="0 0 140 140". All coordinates are within this space.

**Structure (always in this order):**
1. `<defs>` with a `<clipPath id="[svgId]">` containing a circle at cx=70 cy=70 r=62
2. Outer dark ring: `<circle cx="70" cy="70" r="66" fill="#0a0a14"/>` 
3. Inner field: `<circle cx="70" cy="70" r="62" fill="#0c0c18"/>` inside a `<g clip-path="url(#[svgId])">`
4. Object-specific content (see per-type rules below)
5. Field boundary ring: `<circle cx="70" cy="70" r="62" fill="none" stroke="#fff" stroke-width="1" opacity=".14"/>`

**Clip path id must exactly match the svgId key** (e.g. key `sk_m13` → clipPath id `sk_m13`).

**Per object-type rules:**

*Open clusters* — Place 15–25 individual star circles. Vary radii (0.8–2.6), opacity (0.4–1.0). Brighter/larger stars at r=1.8–2.6, fill #fff or #ffe8c0 (warm K-giants). Faint stars r=0.8–1.2. Distribute naturally, not in a grid. Dense clusters pack stars toward centre.

*Globular clusters* — Concentric glow layers: large soft circle (r~26, fill #3a3a5c, opacity .5), then progressively smaller and brighter (r~16 fill #6060a0, r~8 fill #c0c0e8, r~4 fill #fff). Surround with 10–14 small satellite stars (r=0.8–1.2) in a halo pattern. Do NOT place individually resolved stars in the core.

*Emission/reflection nebulae* — Use overlapping ellipses with soft fills (#3a3060–#7868c8 range), low opacity (.35–.7), with `transform="rotate(...)"` for natural asymmetry. Bright core: small ellipse with #c0b0f0–#fff. For M42-type: fan shape. For ring nebula: annular stroke circle with soft central fill. Add 3–5 field stars scattered around.

*Galaxies (face-on/oval)* — Ellipse layers with transform rotate for tilt. Outer halo: large ellipse, fill #4a4a7a, opacity .5. Inner core: smaller ellipse, fill #8888bb, opacity .55–.6. Nucleus: small circle fill #ccccee. Edge-on galaxies: very elongated ellipse (rx much larger than ry), thin. For galaxy pairs/groups: place each galaxy at different coordinates.

*Double stars* — Two star objects. Primary: larger, brighter (r=3–4.5, fill warm gold #f0c060 or #fff). Secondary: slightly smaller (r=2–3). Both with a tight bright inner circle (r = half outer, fill near #fff). Add diffraction halo rings (stroke circles, opacity .15–.2). Separation between centres: 15–20px for a cleanly split pair, 8–12px for a tight pair.

*Planetary nebulae* — Annular ring: stroke circle (r=6–9), stroke #7090c0, opacity .5–.7. Soft central disc: filled circle same cx/cy, r=2–4, fill #90b0d8, opacity .3–.4. Field star or two nearby.

**Background field stars:** every sketch gets 2–5 faint background stars scattered across the field (r=0.7–1.2, fill #fff, opacity .4–.65). Place them away from the main object.

**Colour palette:** 
- Sky background: #0c0c18
- Outer ring: #0a0a14
- Nebula blues/purples: #3a3060 → #7868c8 → #c0b0f0
- Galaxy blues: #3a3a6a → #6060a0 → #aaaacc
- Star white: #fff
- Warm stars: #ffe8c0
- Golden stars (K/M giants): #f0c060, #e8b040
- Globular glow: #3a3a5c → #6060a0 → #c0c0e8

**Output format:** The value in window.SKY_SKETCHES must be a single-line template literal containing only the SVG inner content — everything that goes *inside* `<svg viewBox="0 0 140 140">...</svg>`. No outer `<svg>` tags. No newlines inside the value.

**Append new entries to the bottom of the existing sketches.js, inside the window.SKY_SKETCHES object, before the closing `};`. Do not regenerate or modify existing entries.**

---

## RULES FOR index.html

Only one line changes. Find this block:
```html
<script src="./data-[previous-month]-[previous-year].js"></script>
<script src="./sketches.js"></script>
<script src="./app.js"></script>
```
Change the first script tag's src to point to the new data file:
```html
<script src="./data-[new-month]-[new-year].js"></script>
```
Output only this 3-line block as the patch — do not output the full index.html.

---

## RULES FOR sw.js

Two changes only:
1. Bump the cache name: `'[month]-skies-v1'` (always start at v1 for a new month)
2. Replace the data file name in ASSETS: `'./data-[new-month]-[new-year].js'`

Output only the changed `const CACHE` and `const ASSETS` lines — do not output the full sw.js.

---

## QUALITY STANDARDS

**Astronomical accuracy:**
- All dates, magnitudes, distances, constellation placements must be correct for the target month and year
- Rise/set times and directions must be plausible for ~32°N latitude
- Moon phase emoji sequence must match the real lunar calendar for the month
- newMoonDay must be the correct calendar day
- Do not include objects that are below 20° altitude or in solar glare
- Do not include objects that require larger aperture than 114mm to be meaningfully visible

**Writing style (match the reference data file exactly):**
- `description` fields: start with the low-magnification view, then high-magnification. Name specific visual details the 114mm scope will show. State clearly what the scope CANNOT show (spiral arms, resolved stars in globulars, etc.). End with an observation tip.
- `finder` fields: start from a naked-eye bright star. Give angular distances in degrees or "fist-widths". Name the eyepiece to use for the star-hop. End with what the object looks like when found.
- `note` fields in planner: short, punchy, max 8 words
- `warning` fields: always start with ⚠ and give an actionable date constraint
- All prose uses British English spelling (colour, centre, behaviour)

**Object selection criteria:**
- Pick 6–9 objects that are well-placed for the month from 32°N
- Order them west-to-east (the natural observing sequence as the sky rotates)
- Include a mix of object types: at least one open cluster, one globular or nebula, one galaxy or double star
- Prefer objects with ease ≥ 3 for this aperture — include 1–2 challenging objects (ease 1–2) with honest warnings
- If an object from the attached sketches.js is well-placed this month, prefer reusing it (it saves generating a new SVG)

---

## OUTPUT FORMAT

Produce the outputs in this exact order, clearly delimited:

### OUTPUT 1: data-[month]-[year].js
[full file content]

### OUTPUT 2: sketches.js
[full updated file — existing entries preserved, new entries appended]

### PATCH: index.html (script block only)
[3-line script block]

### PATCH: sw.js (changed lines only)
[const CACHE and const ASSETS lines]
```

---

## Notes for the human using this prompt

- **Do not ask the AI to generate `app.js` or the CSS in `index.html`** — these are stable and never change month to month.
- **If a new object appears in multiple future months** (e.g. M13 is good June–September), its SVG only needs to be generated once. After the first time it appears in `sketches.js`, future months just reference the same `svgId`.
- **Verify moon phases independently.** AI models can confuse lunar calendars. Cross-check `moonPhases[]` and `newMoonDay` against a reliable source (e.g. timeanddate.com or NASA's lunar calendar) before publishing.
- **The SVG sketches are artistic impressions**, not simulations. Minor inaccuracies in star positions within the sketch are acceptable — what matters is that the object type, brightness character, and number of stars are representative of what the 114mm scope actually shows.
- **After receiving the output**, run a quick sanity check: open the browser console with the new files loaded. Any missing `svgId` references will print a warning: `[app.js] Missing sketch: sk_xxx — add it to sketches.js`.
