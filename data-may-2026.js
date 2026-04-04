// ─────────────────────────────────────────────────────────────────────────────
// data-may-2026.js
// Month-specific astronomical data for the Clear Skies PWA engine.
// The engine (app.js) never changes. Drop this file to update the app.
// ─────────────────────────────────────────────────────────────────────────────

window.SKY_DATA = {

  // ── IDENTITY ───────────────────────────────────────────────────────────────
  month:       'May',
  year:        2026,
  hemisphere:  'northern',
  title:       'May Skies',
  titleItalic: 'Skies',
  subtitle:    'Northern Hemisphere · Interactive Guide',

  // ── MONTH CHARACTER ────────────────────────────────────────────────────────
  season:             'spring',
  seasonAccent:       '#8fba6a',   // fresh spring green — Virgo, galaxy season
  coverConstellation: 'virgo',     // Spica and Virgo high in the south
  starWarmBias:       0.48,        // late spring — slightly warm bias

  // ── TELESCOPE ──────────────────────────────────────────────────────────────
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

  // ── CREDITS ────────────────────────────────────────────────────────────────
  credits: {
    author:       'Anish Mangal',
    contributors: ['Ishan Chrungoo', 'Sohail Lalani'],
  },

  // ── MOON PHASES ────────────────────────────────────────────────────────────
  // Full Moon May 1 · Last Qtr May 8 · New Moon May 16 · First Qtr May 23 · Full Moon (Blue) May 31
  moonPhases: [
    '🌕','🌖','🌖','🌖','🌖','🌖','🌗','🌗',
    '🌘','🌘','🌘','🌘','🌑','🌑','🌑','🌑',
    '🌒','🌒','🌒','🌒','🌓','🌓','🌓','🌔',
    '🌔','🌔','🌔','🌔','🌕','🌕','🌕',
  ],
  newMoonDay:  16,
  moonEvents: {
    full:    'May 1 & May 31',
    lastQtr: 'May 8',
    newMoon: 'May 16',
    firstQtr:'May 23',
  },

  // ── MOON FEATURES ──────────────────────────────────────────────────────────
  moonFeatures: [
    {
      name: 'Clavius crater',
      desc: 'One of the largest craters on the Moon. At 100× look for the chain of smaller craters inside it — a crater within a crater. Best seen when the terminator bisects it.',
      best: 'Best: May 18–20 · 9mm (100×)',
    },
    {
      name: 'Mare Imbrium',
      desc: 'The Sea of Rains — a vast dark lava plain over 1,100km wide. At 36× the mountain ranges bordering it (Apennines, Alps, Caucasus) cast dramatic shadows near the terminator.',
      best: 'Best: May 19–21 · 25mm (36×)',
    },
    {
      name: 'Plato crater',
      desc: 'A flat-floored walled plain sitting on the northern shore of Mare Imbrium. Dark and smooth inside, making it easy to identify. Look for tiny craterlets on its floor at 100×.',
      best: 'Best: May 20–21 · 9mm (100×)',
    },
    {
      name: 'Earthshine',
      desc: 'Ghostly glow on the dark limb of the crescent Moon, caused by sunlight reflected from Earth. Naked eye or binoculars only — the telescope makes it too bright to appreciate.',
      best: 'May 17–19 post-sunset · naked eye',
    },
  ],

  // ── PLANNER ────────────────────────────────────────────────────────────────
  planner: [
    {
      dates:   'May 1–3',
      targets: 'Moon (full), Venus & Jupiter low W, M13, M51',
      time:    '9pm–midnight',
      note:    'Full Moon — skip faint deep sky',
      type:    'warn',
    },
    {
      dates:   'May 1–31',
      targets: 'Venus low WNW, brightening toward June',
      time:    '8:30–10pm',
      note:    'Gaining altitude each week',
      type:    'normal',
    },
    {
      dates:   'May 5–7',
      targets: '★ Eta Aquarid meteors + deep sky',
      time:    '2am–dawn',
      note:    'Moon down — best meteor window',
      type:    'best',
    },
    {
      dates:   'May 8–15',
      targets: 'M13, M3, M51, M5, Leo Triplet, M64',
      time:    '10pm–2am',
      note:    'Improving dark window each night',
      type:    'normal',
    },
    {
      dates:   'May 16–22',
      targets: '★ All objects — best dark skies of month',
      time:    '9pm–3am',
      note:    'New Moon May 16 — darkest skies',
      type:    'best',
    },
    {
      dates:   'May 23–28',
      targets: 'M13, M5, Albireo, M57 ring nebula',
      time:    '10pm–2am',
      note:    'Moon growing — southern objects fading',
      type:    'normal',
    },
    {
      dates:   'May 29–31',
      targets: 'Moon craters, Venus & Jupiter closing',
      time:    '9–11pm',
      note:    'Blue Moon May 31 — deep sky fading',
      type:    'warn',
    },
  ],
  plannerFooter: 'Venus/Jupiter → low WNW at dusk, closing together all month · Virgo/Leo → due south 10pm · M13/Hercules → rising ENE · M57 → NE after midnight',

  // ── PLANETS ────────────────────────────────────────────────────────────────
  planets: [
    {
      name: 'Jupiter',
      ease: 5,
      rows: [
        ['Constellation',    'Gemini → Taurus (from May 20)'],
        ['Visible',          'Evening, WNW sky'],
        ['Sets after sunset','~2 hrs (May 1) → ~1 hr (May 31)'],
        ['Brightness',       'mag −2.0'],
        ['At 36× (25mm)',   'Disc + 4 Galilean moons'],
        ['At 100× (9mm)',   'Cloud belts, moon shadows'],
      ],
      note: 'Jupiter and Venus are converging toward their spectacular June 9 conjunction. Watch them close by ~1°/week throughout May.',
    },
    {
      name: 'Venus',
      ease: 4,
      rows: [
        ['Constellation',    'Taurus'],
        ['Visible',          'Evening, low WNW'],
        ['Sets after sunset','~2.5–3 hrs'],
        ['Brightness',       'mag −3.9 to −4.1'],
        ['At 36× (25mm)',   'Small gibbous disc, ~12–14″'],
        ['At 100× (9mm)',   '85→75% lit, brightening phase'],
      ],
      note: 'Venus climbs steadily higher all month. Brilliant naked-eye object — unmistakable. Converging with Jupiter toward the June 9 conjunction.',
    },
  ],

  // ── EVENTS ─────────────────────────────────────────────────────────────────
  events: [
    {
      type:  'best',
      title: '★ Eta Aquarid meteor shower — peak May 5–7',
      body:  'One of the year\'s best showers, caused by debris from Halley\'s Comet. Radiant in Aquarius, rises after midnight. From 32°N expect ~20–30 meteors/hr before dawn on the peak night. Moon is absent — ideal conditions. No telescope needed; lie back and look east.',
    },
    {
      type:  'info',
      title: 'Venus–Jupiter conjunction building toward June 9',
      body:  'The two brightest planets are closing in on each other all month, moving ~1° closer per week. By May 31 they\'ll be separated by ~7°, heading for a spectacular less-than-1° conjunction on June 9. Dramatic even now in binoculars — watch them converge.',
    },
    {
      type:  'info',
      title: 'Blue Moon — second full Moon of May on May 31',
      body:  'May 2026 has two full Moons: May 1 and May 31. The second is a "Blue Moon" by the modern popular definition. It won\'t appear blue — but it\'s a curiosity worth noting. Deep sky observing is compromised on both dates.',
    },
  ],

  // ── OBJECTS ────────────────────────────────────────────────────────────────
  objects: [
    {
      id:       'm3',
      navLabel: 'M3',
      name:     'M3 — Globular Cluster',
      type:     'Globular cluster · Canes Venatici · mag 6.2 · 34,000 ly',
      ease:     4,
      warning:  null,
      meta: [
        ['Best dates', 'May 8–26'],
        ['Best time',  '10pm–1am'],
        ['Direction',  'High south, near Arcturus'],
        ['Start with', '25mm (36×)'],
        ['Then try',   '9mm (100×)'],
        ['Needs',      'Dark skies'],
      ],
      description: 'At 36× an obvious round cotton-ball glow with a concentrated bright core. At 100× the halo takes on a slightly granular, salt-and-pepper texture at the edges — tantalising hints of stars, but not cleanly resolved pinpoints. A 114mm aperture cannot fully resolve M3\'s stars — that requires 150mm or more. The granular texture is real and rewarding. Use averted vision to draw it out.',
      finder:   'Find bright orange Arcturus high in the south. Move ~6° northwest toward Cor Caroli in Canes Venatici, then nudge south. M3 appears as a fuzzy "star" that refuses to sharpen with focus. Unmistakable once you\'ve seen it.',
      twoSketch: false,
      sketches: [
        { svgId: 'sk_m3', label: '9mm · 100×\ngranular halo, bright core' },
      ],
    },

    {
      id:       'm64',
      navLabel: 'M64',
      name:     'M64 — Black Eye Galaxy',
      type:     'Spiral galaxy · Coma Berenices · mag 8.5 · 17 million ly',
      ease:     3,
      warning:  null,
      meta: [
        ['Best dates', 'May 8–26'],
        ['Best time',  '10pm–midnight'],
        ['Direction',  'High south, Coma Berenices'],
        ['Start with', '25mm (36×)'],
        ['Then try',   '9mm (100×)'],
        ['Needs',      'Dark skies, good transparency'],
      ],
      description: 'At 36× a slightly oval glow with a noticeably brighter core — easy to locate. At 100× look carefully just north of the bright nucleus for the dark dust lane that gives this galaxy its name. With 114mm it appears as a subtle darkening on one side of the core, not a crisp black eye — that requires larger aperture. Still one of the most rewarding galaxies for a small scope on a good night.',
      finder:   'Find Arcturus in the south. Move ~12° northwest to Gamma (γ) Comae — the brightest star in Coma Berenices. Then nudge ~1° east and slightly north. M64 appears as an oval smudge noticeably brighter than M51 or the Leo Triplet. At 100× look for the asymmetry near the core.',
      twoSketch: false,
      sketches: [
        { svgId: 'sk_m64', label: '9mm · 100×\noval glow, dark lane hint' },
      ],
    },

    {
      id:       'm51',
      navLabel: 'M51',
      name:     'M51 — Whirlpool Galaxy',
      type:     'Spiral galaxy + NGC 5195 · Canes Venatici · mag 8.4 · 23 million ly',
      ease:     3,
      warning:  null,
      meta: [
        ['Best dates', 'May 8–26'],
        ['Best time',  '10pm–1am'],
        ['Direction',  'North, high overhead'],
        ['Start with', '25mm (36×)'],
        ['Then try',   '9mm (100×)'],
        ['Needs',      'Excellent dark skies'],
      ],
      description: 'At 36× two fuzzy glows close together — M51 and companion NGC 5195. At 100× M51\'s core brightens and both nuclei are distinct. The faint bridge may be hinted at with averted vision on the very best nights. Note: spiral arms are NOT visible at 114mm — that requires 150–200mm. What you see is a round, uneven glow. Still the showpiece of the month overhead.',
      finder:   'Find Alkaid — end star of the Big Dipper\'s handle, nearly overhead in May. M51 sits ~3.5° southwest (7 moon-widths). At 36× sweep slowly — the double glow is the giveaway. Both nuclei visible in the same field.',
      twoSketch: false,
      sketches: [
        { svgId: 'sk_m51', label: '9mm · 100×\ntwo nuclei, hint of bridge' },
      ],
    },

    {
      id:       'm13',
      navLabel: 'M13',
      name:     'M13 — Great Hercules Cluster',
      type:     'Globular cluster · Hercules · mag 5.8 · 22,000 ly',
      ease:     5,
      warning:  null,
      meta: [
        ['Best dates', 'May 10–28'],
        ['Best time',  '11pm–2am'],
        ['Direction',  'East, rising through the night'],
        ['Start with', '25mm (36×)'],
        ['Then try',   '9mm (100×)'],
        ['Needs',      'Dark sky helps but not essential'],
      ],
      description: 'At 36× a large, obvious cotton-ball glow — noticeably bigger and brighter than M3. At 100× the halo gains a rich granular texture, the core blazes, and on a steady night the very edge of the halo resolves into individual star-points. M13 is the finest globular cluster visible from northern latitudes and one of the best objects in the whole sky for a 114mm telescope. Use averted vision at the edges.',
      finder:   'Find the Keystone of Hercules — a slightly squashed rectangle of four stars rising in the east. M13 sits on the western side of the Keystone, ~1/3 of the way from the bottom star (Zeta) to the top (Eta). Naked-eye on a dark night as a faint fuzzy star. Centre it in the 25mm, then switch to 9mm.',
      twoSketch: false,
      sketches: [
        { svgId: 'sk_m13', label: '9mm · 100×\nrich halo, resolved edge stars' },
      ],
    },

    {
      id:       'm5',
      navLabel: 'M5',
      name:     'M5 — Globular Cluster',
      type:     'Globular cluster · Serpens · mag 5.6 · 24,500 ly',
      ease:     4,
      warning:  null,
      meta: [
        ['Best dates', 'May 12–28'],
        ['Best time',  '11pm–2am'],
        ['Direction',  'South-SE, rising high'],
        ['Start with', '25mm (36×)'],
        ['Then try',   '9mm (100×)'],
        ['Needs',      'Dark skies'],
      ],
      description: 'One of the finest globulars in the northern sky, rivalling M13. At 36× a slightly oval, bright cotton-ball glow. At 100× the halo is clearly granular with hints of resolution at the edges. The core is compact and blazing white. Some observers find M5 marginally more condensed-looking than M13 — compare them on the same night. Like M13, 114mm cannot fully resolve the core.',
      finder:   'Find Arcturus high in the south. Drop ~10° south-southeast toward the head of Serpens. The brightest star in the area is 5 Serpentis (mag 5.1) — M5 sits just 20 arcminutes northwest of it, easily in the same low-power field. Appears as a slightly non-stellar glow that refuses to sharpen.',
      twoSketch: false,
      sketches: [
        { svgId: 'sk_m5', label: '9mm · 100×\nbright oval, granular halo' },
      ],
    },

    {
      id:       'm57',
      navLabel: 'M57',
      name:     'M57 — Ring Nebula',
      type:     'Planetary nebula · Lyra · mag 8.8 · ~2,300 ly',
      ease:     3,
      warning:  null,
      meta: [
        ['Best dates', 'May 20–31'],
        ['Best time',  '1am–3am (rising NE)'],
        ['Direction',  'NE, Lyra rising after midnight'],
        ['Use',        '9mm (100×)'],
        ['Needs',      'Steady seeing, dark sky'],
        ['Skip',       'Below ~25° altitude before 1am'],
      ],
      description: 'The quintessential planetary nebula. At 100× it appears as a tiny, unmistakable grey-green smoke ring — a small oval with a slightly darker centre. The central white dwarf star is NOT visible at 114mm (requires 200mm+). The ring shape itself is clear and rewarding. It\'s small — only 1 arcminute across — so 100× is the minimum useful magnification. Late May is the beginning of M57 season; it gets better through summer.',
      finder:   'Find Vega — the brilliant bluish-white star blazing in the NE, rising after 11pm. Lyra is the small parallelogram of stars just below and left of Vega. M57 sits exactly halfway between the two bottom stars of the parallelogram, Beta (Sheliak) and Gamma (Sulafat). At 100× it will look like a small out-of-focus star that won\'t sharpen — that\'s the ring.',
      twoSketch: false,
      sketches: [
        { svgId: 'sk_m57', label: '9mm · 100×\ngrey-green smoke ring' },
      ],
    },

    {
      id:       'albireo',
      navLabel: 'Albireo',
      name:     'Albireo — β Cygni',
      type:     'Double star · Cygnus · mags 3.1 + 5.1 · sep 34″ · 430 ly',
      ease:     5,
      warning:  null,
      meta: [
        ['Best dates',   'May 20–31'],
        ['Best time',    '1am–3am (Cygnus rising)'],
        ['Direction',    'NE, rising after midnight'],
        ['Use',          '25mm (36×) or 9mm (100×)'],
        ['Seeing',       'Any conditions — easy split'],
        ['Moon caution', 'Any phase fine'],
      ],
      description: 'The most celebrated colour-contrast double star in the sky. At 36× two stars cleanly split — one a warm golden-amber (the primary, a K-type giant), the other a piercing ice-blue (a hotter B-type star). The colour contrast is vivid and immediate, unlike anything else at the eyepiece. Separation of 34 arcseconds means it splits at even 36× with room to spare. Show this to anyone who\'s never looked through a telescope.',
      finder:   'Find Vega blazing in the NE. Cygnus is the large cross shape (the Northern Cross) nearby, with Deneb at the top. Albireo is the star at the very bottom of the cross — the "head" of the swan. Naked-eye it looks like a single star. Point the 25mm at it and prepare for the colour contrast.',
      twoSketch: false,
      sketches: [
        { svgId: 'sk_albireo', label: '25mm · 36×\ngold + blue, vivid contrast' },
      ],
    },
  ],

  // ── GLOSSARY ───────────────────────────────────────────────────────────────
  glossary: [
    ['Magnitude (mag)',  'Brightness scale — lower is brighter. Sun −26, naked eye limit ~6, your scope reaches ~12.'],
    ['Globular cluster', 'A tight spherical swarm of 100,000–1,000,000 stars gravitationally bound. M13 and M5 are the finest northern examples.'],
    ['Planetary nebula', 'The expelled outer shell of a dying star, briefly glowing before fading. M57 is a classic example. Nothing to do with planets.'],
    ['Averted vision',  'Look slightly off-centre to use rod cells. Essential for faint galaxies and globular halo texture.'],
    ['Seeing',          'Atmospheric steadiness. Poor seeing blurs fine detail and prevents double-star splits.'],
    ['Transparency',    'Atmospheric clarity. Poor transparency dims faint galaxies and globular halos even if stars look sharp.'],
    ['Dark adaptation', 'Eyes need ~20 min in full darkness for peak sensitivity. One white light flash resets it.'],
    ['Opposition',      'When a planet is directly opposite the Sun. Maximum brightness and visible all night.'],
    ['Conjunction',     'Two objects close together in the sky. Jupiter and Venus head for a spectacular one June 9.'],
    ['Blue Moon',       'The second full Moon in a single calendar month. May 31 is a Blue Moon. Not actually blue.'],
  ],
  scopeLimitNote: 'Your 114mm f/7.9 reflector\'s limits: limiting magnitude ~12 under dark skies · max useful magnification ~230× (100× practical ceiling most nights) · 265× more light than the naked eye · resolving power ~1 arcsecond on the best nights · M13 and M5 show rich granular texture but full stellar resolution requires 150mm+.',

  // ── CONDITIONS ─────────────────────────────────────────────────────────────
  darkSkyWindow: 'May 11–21',

}; // end SKY_DATA
