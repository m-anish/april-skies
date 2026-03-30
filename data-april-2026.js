// ─────────────────────────────────────────────────────────────────────────────
// data-april-2026.js
// Month-specific astronomical data for the Night Sky PWA engine.
// Replace this file each month. The engine (app.js) never changes.
// ─────────────────────────────────────────────────────────────────────────────

window.SKY_DATA = {

  // ── IDENTITY ───────────────────────────────────────────────────────────────
  month:       'April',
  year:        2026,
  hemisphere:  'northern',
  title:       'April Skies',          // cover h1 (non-italic part)
  titleItalic: 'Skies',               // the italic gold word
  subtitle:    'Northern Hemisphere · Interactive Guide',

  // ── TELESCOPE ──────────────────────────────────────────────────────────────
  scope: {
    aperture:     114,    // mm
    fRatio:       7.9,
    focalLength:  900,    // mm
    eyepieces: [
      { focal: 25, mag: 36,  trueFov: 1.44, afov: 52 },
      { focal:  9, mag: 100, trueFov: 0.52, afov: 52 },
    ],
    limitingMag:  12,
    maxUsefulMag: 230,
    lightGain:    265,    // × over naked eye
    resolution:   1,      // arcseconds, best nights
    notes: 'Cannot fully resolve globular clusters — only granular halo texture at the edges.',
  },

  // ── CREDITS ────────────────────────────────────────────────────────────────
  credits: {
    author:       'Anish Mangal',
    contributors: ['Ishan Chrungoo', 'Sohail Lalani'],
  },

  // ── MOON PHASES ────────────────────────────────────────────────────────────
  // phases: 30-element array of emoji, index 0 = day 1
  moonPhases: [
    '🌕','🌕','🌖','🌖','🌖','🌖','🌗','🌗','🌗','🌗',
    '🌘','🌘','🌘','🌘','🌑','🌑','🌑','🌒','🌒','🌒',
    '🌓','🌓','🌓','🌓','🌔','🌔','🌔','🌔','🌔','🌕',
  ],
  newMoonDay:   17,   // 1-indexed — this day gets the gold glow
  moonEvents: {
    full:    'Apr 2',
    lastQtr: 'Apr 10',
    newMoon: 'Apr 17',
    firstQtr:'Apr 24',
  },
  // 4 lunar features to highlight
  moonFeatures: [
    {
      name: 'Clavius crater',
      desc: 'One of the largest craters on the Moon. At 100× look for smaller craters inside it along the southern terminator — a crater within a crater.',
      best: 'Best: Apr 19–21 · 9mm (100×)',
    },
    {
      name: 'Apennine mountains',
      desc: 'Dramatic range bordering Mare Imbrium. Peaks cast sharp black shadows at low illumination near the terminator — spectacular at 36×.',
      best: 'Best: Apr 20–22 · 25mm (36×)',
    },
    {
      name: 'Tycho crater',
      desc: 'Young, sharp-walled crater in the southern highlands. Ray system visible at full moon; walls most dramatic Apr 19–20.',
      best: 'Best: Apr 19–20 · 9mm (100×)',
    },
    {
      name: 'Earthshine',
      desc: 'Ghostly glow on the dark limb of the crescent Moon. Naked eye or binoculars only — the telescope makes it too bright to appreciate.',
      best: 'Apr 13–14 pre-dawn · Apr 20–21 post-sunset',
    },
  ],

  // ── PLANNER ────────────────────────────────────────────────────────────────
  // type: 'normal' | 'best' | 'warn'
  // best = teal highlight; warn = orange note; normal = standard row
  planner: [
    {
      dates:   'Apr 1–3',
      targets: 'Moon, Jupiter, M42 & M46/47 (low SW)',
      time:    '8–10pm',
      note:    'Full Moon — skip faint deep sky',
      type:    'warn',
    },
    {
      dates:   'Apr 1–12',
      targets: 'M42 Orion Nebula, M46 & M47 separately',
      time:    '8:30–10pm',
      note:    'Window closing — sets ~11pm',
      type:    'warn',
    },
    {
      dates:   'Apr 4–9',
      targets: 'Moon craters, Algieba double star',
      time:    '10pm–1am',
      note:    'Moon sets ~2am, improving each night',
      type:    'normal',
    },
    {
      dates:   'Apr 10–16',
      targets: 'M44, M3, Algieba, Leo Triplet',
      time:    '10pm–2am',
      note:    'Good dark window after midnight',
      type:    'normal',
    },
    {
      dates:   'Apr 17–20',
      targets: '★ All spring objects — best of month',
      time:    '9pm–3am',
      note:    'New Moon Apr 17 — darkest skies',
      type:    'best',
    },
    {
      dates:   'Apr 21–22',
      targets: '★ Lyrid meteors + all deep sky',
      time:    '10pm–4am',
      note:    'Lyrid peak — 10–15/hr, Moon down',
      type:    'best',
    },
    {
      dates:   'Apr 10–20',
      targets: 'Comet C/2025 R3 pre-dawn (mag ~8)',
      time:    '90min before sunrise',
      note:    'Enters solar glare after Apr 20',
      type:    'normal',
    },
    {
      dates:   'Apr 28–30',
      targets: 'Moon craters (waxing gibbous)',
      time:    '8–11pm',
      note:    'Moon brightening — deep sky fading',
      type:    'warn',
    },
  ],
  plannerFooter: 'Orion/Puppis → low SW 8:30pm · Leo/Virgo → due south 11pm · M44 → south-SW · M3 → east-SE by midnight',

  // ── PLANETS ────────────────────────────────────────────────────────────────
  planets: [
    {
      name:       'Jupiter',
      ease:       5,
      rows: [
        ['Constellation', 'Gemini'],
        ['Visible',        'Evening, SW sky'],
        ['Sets after sunset', '2–3 hrs'],
        ['Brightness',     'mag −2.0'],
        ['At 36× (25mm)', 'Disc + 4 Galilean moons'],
        ['At 100× (9mm)', 'Cloud bands visible'],
      ],
      note: 'Galilean moons change positions every night. Moon nearby Apr 22.',
    },
    // Venus omitted this month — not prominent enough to merit a card
  ],

  // Events / bonus alert cards below the planet cards
  // type: 'warn' (orange border) | 'info' (teal border)
  events: [
    {
      type:  'warn',
      title: 'Mars — pre-dawn only, very difficult in April 2026',
      body:  'Mars is a morning planet rising low in the east before dawn. Extremely difficult from northern latitudes this month due to low altitude. Skip until autumn 2026.',
    },
    {
      type:  'info',
      title: 'Comet C/2025 R3 — pre-dawn window Apr 10–20 only',
      body:  'Magnitude ~8 comet in Pegasus/Pisces, visible at 36× (25mm) ~90 min before sunrise, low east. Enters solar glare around Apr 20–25. Check sky reports before going out.',
    },
    {
      type:  'info',
      title: 'Lyrid meteor shower — peak night Apr 21–22',
      body:  '10–15 meteors/hr at peak. Radiant near Vega in Lyra, rising NE from 10pm. Best after midnight when Moon has set. No telescope needed.',
    },
    {
      type:  'info',
      title: 'Comet C/2026 A1 (MAPS) — around Apr 4–6',
      body:  'A sungrazer at perihelion in early April. Potentially visible low in the western twilight — requires unobstructed horizon. May not survive perihelion. Check reports night-by-night.',
    },
  ],

  // ── OBJECTS ────────────────────────────────────────────────────────────────
  // Ordered west-to-east (approximate observing sequence for the month).
  // Each object rendered as a full card slide in the Objects group.
  objects: [
    {
      id:          'm42',
      navLabel:    'M42',
      name:        'M42 — Orion Nebula',
      type:        'Emission nebula · Orion · mag 4.0 · 1,350 ly',
      ease:        5,
      warning:     '⚠ April 2026 window closing fast — Orion is setting. Observe 8:30–10pm in the first two weeks only, low southwest. Gone from useful observing by mid-April.',
      meta: [
        ['Best dates',   'Apr 1–12'],
        ['Best time',    '8:30–10pm only'],
        ['Direction',    'Low SW, sinking'],
        ['Start with',   '25mm (36×)'],
        ['Then try',     '9mm (100×)'],
        ['Moon caution', 'Survives most phases'],
      ],
      description: 'At 36× an unmistakable fan-shaped glow — two bright lobes spread like wings around a luminous core. At 100× the Trapezium becomes the centrepiece: four hot young stars in a tiny trapezoid at the nebula\'s heart, each cleanly split as individual pinpoints. The surrounding nebulosity gains texture — brighter regions, darker bays. One of the most spectacular objects any telescope can show.',
      finder:      'Find Orion\'s Belt — three stars in a row, low SW. Below the belt hangs the Sword — a short chain of fainter points. The middle "star" of the Sword looks fuzzy: that\'s M42. Completely unmistakable.',
      // twoSketch: false → single sketch on the right of the description
      twoSketch:   false,
      sketches: [
        {
          svgId:  'sk_m42',
          label:  '25mm · 36×\nfan glow + Trapezium',
          // Raw SVG inner content (everything inside the outer <svg> tag)
        },
      ],
    },

    {
      id:          'm4647',
      navLabel:    'M46 / M47',
      name:        'M46 & M47 — Twin Clusters',
      type:        'Open clusters · Puppis · mag 6.1 (M46) / 4.2 (M47) · observe separately',
      ease:        4,
      warning:     '⚠ Early April 2026 only — low SW, sinking fast. Observe as soon as it\'s fully dark. Not usefully visible after mid-April from northern latitudes.',
      meta: [
        ['Best dates',    'Apr 1–10'],
        ['Best time',     '8:30–10:30pm'],
        ['Direction',     'Low SW, Puppis'],
        ['Use',           '25mm (36×) each'],
        ['Separation',    '~1.3° — outside FOV'],
        ['Bonus in M46',  'NGC 2438 nebula'],
      ],
      description: 'M46 and M47 are 1.3° apart — just outside your 1.44° true FOV at 36×. Observe each separately, then sweep between them to appreciate the contrast. <strong style="color:var(--text);font-weight:normal">M47</strong> is the showpiece: a bright loose scatter of prominent stars with warm yellow-orange giants. <strong style="color:var(--text);font-weight:normal">M46</strong> is a complete contrast — a much denser, uniform cluster of fainter stars, like a fine dusting of salt. At 100× look on M46\'s northern edge for NGC 2438: a tiny, ghostly ring — a planetary nebula in the foreground of the cluster.',
      finder:      'Find Sirius — the brightest star, blazing SW. Scan ~12–14° east and slightly north (~1.5 fist-widths). M47 appears first as a bright patch; M46 is ~1.3° further east. Sweep slowly between them.',
      twoSketch:   true,
      sketches: [
        {
          svgId:  'sk_m47',
          label:  'M47 · 25mm · 36×\nbright & loose',
        },
        {
          svgId:  'sk_m46',
          label:  'M46 · 25mm · 36×\ndense · NGC 2438 ring',
        },
      ],
    },

    {
      id:          'm44',
      navLabel:    'M44',
      name:        'M44 — Beehive Cluster',
      type:        'Open cluster · Cancer · mag 3.7 · 577 ly',
      ease:        5,
      warning:     null,
      meta: [
        ['Best dates',   'Apr 4–28'],
        ['Best time',    '9pm–1am'],
        ['Direction',    'South-SW, high'],
        ['Use only',     '25mm (36×)'],
        ['Moon caution', 'Survives most phases'],
        ['Skip',         'Apr 1–3 (full moon)'],
      ],
      description: 'A spectacular loose swarm of stars filling the whole field. M44 spans ~1.6° — slightly wider than your 1.44° FOV — so stars drift off the edge giving a sense of immersion. Don\'t switch to the 9mm. Look for the subtle warm yellowish tinge of the K-type giant stars. Naked-eye as a fuzzy patch on a clear night.',
      finder:      'Find Castor and Pollux in Gemini (bright pair high SW). Move two fist-widths east — fuzzy naked-eye patch on a clear night. That\'s M44. Centre it in the 25mm.',
      twoSketch:   false,
      sketches: [
        {
          svgId: 'sk_m44',
          label: '25mm · 36×\nloose star swarm, fills FOV',
        },
      ],
    },

    {
      id:          'm3',
      navLabel:    'M3',
      name:        'M3 — Globular Cluster',
      type:        'Globular cluster · Canes Venatici · mag 6.2 · 34,000 ly',
      ease:        4,
      warning:     null,
      meta: [
        ['Best dates', 'Apr 10–27'],
        ['Best time',  '11pm–2am'],
        ['Direction',  'East, rising high'],
        ['Start with', '25mm (36×)'],
        ['Then try',   '9mm (100×)'],
        ['Needs',      'Dark skies'],
      ],
      description: 'At 36× an obvious round cotton-ball glow with a concentrated bright core. At 100× the halo takes on a slightly granular, salt-and-pepper texture at the edges — tantalising hints of stars, but not cleanly resolved pinpoints. A 114mm aperture cannot fully resolve M3\'s stars — that requires 150mm or more. The granular texture is real and rewarding. Use averted vision to draw it out.',
      finder:      'Find bright orange Arcturus high east by midnight. Move ~6° northwest toward Cor Caroli in Canes Venatici, then nudge south. M3 appears as a fuzzy "star" that refuses to sharpen with focus.',
      twoSketch:   false,
      sketches: [
        {
          svgId: 'sk_m3',
          label: '9mm · 100×\ngranular halo, bright core',
        },
      ],
    },

    {
      id:          'algieba',
      navLabel:    'Algieba',
      name:        'Algieba — γ Leonis',
      type:        'Binary star · Leo · combined mag 2.0 · 126 ly · separation ~4.6″',
      ease:        4,
      warning:     null,
      meta: [
        ['Best dates',   'Apr 4–27'],
        ['Best time',    '9pm–1am'],
        ['Direction',    'South, high in Leo'],
        ['Use',          '9mm (100×)'],
        ['Needs',        'Steady seeing'],
        ['Moon caution', 'Any phase fine'],
      ],
      description: 'At 100× two warm golden-orange stars side by side, cleanly separated — one of the most beautiful colour-matched pairs in the sky. Both are giant stars with nearly identical warm hues. Separation ~4.6 arcseconds — comfortably within reach of 114mm on a steady night. If the air is unsteady the pair blurs into one — try again on a calmer night.',
      finder:      'Find the Sickle of Leo — the backward question-mark with Regulus at the base. Algieba is the bright star near the top of the curve, third brightest in Leo. Naked-eye easy. Point the 9mm at it — steady air needed to split cleanly.',
      twoSketch:   false,
      sketches: [
        {
          svgId: 'sk_algieba',
          label: '9mm · 100×\ngolden pair, cleanly split',
        },
      ],
    },

    {
      id:          'leo',
      navLabel:    'Leo Triplet',
      name:        'Leo Triplet — M65, M66, NGC 3628',
      type:        'Galaxy group · Leo · mag 9.3–10.2 · 35 million ly',
      ease:        2,
      warning:     null,
      meta: [
        ['Best dates', 'Apr 10–25'],
        ['Best time',  '10pm–1am'],
        ['Direction',  'Due south, high'],
        ['Use',        '25mm (36×)'],
        ['Needs',      'Bortle 4 or better'],
        ['Avoid',      'Any moonlight'],
      ],
      description: 'Genuinely challenging for 114mm. On a truly dark night (Bortle 4+), M65 and M66 appear as faint elongated oval smudges with slightly brighter cores. NGC 3628 (the "Hamburger galaxy") is significantly fainter — a thin, low-contrast edge-on streak requiring averted vision and excellent transparency. Completely invisible from light-polluted skies. Reserve for the Apr 17–20 new moon window only.',
      finder:      'Find Theta Leonis (θ Leo) — bottom-right star in Leo\'s body. M65 and M66 sit ~1.5° south (three moon-widths). Sweep slowly south at 36×. NGC 3628 is ~0.6° further north — averted vision and patience required.',
      twoSketch:   false,
      sketches: [
        {
          svgId: 'sk_leo',
          label: '25mm · 36×\nfaint ovals, dark skies only',
        },
      ],
    },

    {
      id:          'm51',
      navLabel:    'M51',
      name:        'M51 — Whirlpool Galaxy',
      type:        'Spiral galaxy + NGC 5195 · Canes Venatici · mag 8.4 · 23 million ly',
      ease:        3,
      warning:     null,
      meta: [
        ['Best dates', 'Apr 10–27'],
        ['Best time',  '11pm–2am'],
        ['Direction',  'North, high overhead'],
        ['Start with', '25mm (36×)'],
        ['Then try',   '9mm (100×)'],
        ['Needs',      'Excellent dark skies'],
      ],
      description: 'At 36× two fuzzy glows close together — M51 and companion NGC 5195. At 100× M51\'s core brightens and both nuclei are distinct. The faint bridge may be hinted at with averted vision on the very best nights. Note: spiral arms are NOT visible at 114mm — that requires 150–200mm. What you see is a round, uneven glow. Still the showpiece of the month.',
      finder:      'Find Alkaid — end star of the Big Dipper\'s handle. M51 sits ~3.5° southwest (7 moon-widths). At 36× sweep slowly — the double glow is the giveaway.',
      twoSketch:   false,
      sketches: [
        {
          svgId: 'sk_m51',
          label: '9mm · 100×\ntwo nuclei, hint of bridge',
        },
      ],
    },
  ], // end objects

  // ── GLOSSARY ───────────────────────────────────────────────────────────────
  // Tailor these to terms actually used in this month's guide
  glossary: [
    ['Magnitude (mag)',  'Brightness scale — lower is brighter. Sun −26, naked eye limit ~6, your scope reaches ~12.'],
    ['True FOV',        'AFOV ÷ magnification. At 36× with 52° AFOV: 52÷36 = 1.44°. The Moon is 0.5° wide.'],
    ['Averted vision',  'Look slightly off-centre to use rod cells. Essential for faint galaxies and M3\'s halo texture.'],
    ['Seeing',          'Atmospheric steadiness. Poor seeing blurs stars and prevents double star splits.'],
    ['Terminator',      'Light/dark boundary on the Moon — the best place to see shadow-enhanced crater detail.'],
    ['Dark adaptation', 'Eyes need ~20 min in full darkness for peak sensitivity. One white light flash resets it.'],
    ['Arcsecond (″)',   '1/3600 of a degree. Algieba\'s 4.6″ gap is comfortably split at 100× on a steady night.'],
    ['Bortle scale',    '1–9 sky darkness scale. Leo Triplet and NGC 3628 need Bortle 4 or better.'],
    ['Trapezium',       'Four hot young stars at M42\'s core — clearly split as pinpoints at 100×.'],
    ['AFOV',            'Apparent field of view of the eyepiece. Your 25mm has ~52°. Divide by magnification for true FOV.'],
  ],
  scopeLimitNote: 'Your 114mm f/7.9 reflector\'s limits: limiting magnitude ~12 under dark skies · max useful magnification ~230× (100× practical ceiling most nights) · 265× more light than the naked eye · resolving power ~1 arcsecond on the best nights · cannot fully resolve globular clusters — only granular halo texture at the edges.',

  // ── CONDITIONS (month-specific date in checklist) ──────────────────────────
  darkSkyWindow: 'Apr 10–27',  // used in the checklist

}; // end SKY_DATA
