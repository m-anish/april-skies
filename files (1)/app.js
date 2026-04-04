// ─────────────────────────────────────────────────────────────────────────────
// app.js — Clear Skies PWA engine
// Reads from window.SKY_DATA (loaded by data-[month]-[year].js).
// This file never changes month to month.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
'use strict';

const D = window.SKY_DATA;
if (!D) { document.body.innerHTML = '<p style="color:red;padding:2rem">No SKY_DATA found. Include a data-[month].js before app.js.</p>'; return; }

// ── PATCH DOCUMENT METADATA ────────────────────────────────────────────────
document.title = `${D.month} ${D.year} — Clear Skies`;
document.querySelector('meta[name="apple-mobile-web-app-title"]').content = `${D.month} ${D.year}`;

// ── SEASON ACCENT ──────────────────────────────────────────────────────────
// Inject --season CSS variable from SKY_DATA.seasonAccent (fallback: gold)
const seasonAccent = D.seasonAccent || 'var(--gold)';
document.documentElement.style.setProperty('--season', seasonAccent);

// ── HELPERS ────────────────────────────────────────────────────────────────
function E(n) {
  return Array.from({length:5}, (_, i) => `<div class="${i < n ? 'sf' : 'se'}"></div>`).join('');
}

function sketch(s, size = 110) {
  const svgContent = (window.SKY_SKETCHES && window.SKY_SKETCHES[s.svgId]) || '';
  if (!svgContent) console.warn(`[app.js] Missing sketch: ${s.svgId} — add it to sketches.js`);
  return `<svg width="${size}" height="${size}" viewBox="0 0 140 140">${svgContent}</svg>`;
}

// ── STARFIELD ──────────────────────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('stars-canvas');
  const ctx    = canvas.getContext('2d');
  const NUM    = 180;
  // starWarmBias: 0.0 = all cool blue-white, 1.0 = all warm amber
  const WARM_BIAS = typeof D.starWarmBias === 'number' ? D.starWarmBias : 0.35;
  let stars = [], W, H;

  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }

  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function initStars() {
    stars = [];
    const rng = mulberry32(0xdeadbeef);
    for (let i = 0; i < NUM; i++) {
      stars.push({
        x: rng(), y: rng(),
        r: rng() * rng() * 1.8 + 0.3,
        op: rng() * 0.5 + 0.15,
        phase: rng() * Math.PI * 2,
        speed: rng() * 0.4 + 0.1,
        warm: rng() < WARM_BIAS,
      });
    }
  }

  let lastT = 0;
  function draw(t) {
    const dt = Math.min((t - lastT) / 1000, 0.05); lastT = t;
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      s.phase += s.speed * dt;
      const op = Math.max(0, Math.min(1, s.op + Math.sin(s.phase) * 0.25 * s.op));
      ctx.beginPath();
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.warm ? `rgba(255,232,192,${op})` : `rgba(220,220,255,${op})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize(); initStars();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
})();

// ── SLIDE DEFINITIONS ──────────────────────────────────────────────────────
const SLIDE_DEFS = [
  { id: 'cover',      label: 'Cover',      group: null },
  { id: 'planner',    label: 'Planner',    group: null },
  { id: 'moon',       label: 'Moon',       group: null },
  { id: 'planets',    label: 'Planets',    group: null },
  { id: 'objects',    label: 'Objects',    group: null, isGroup: true },
  ...D.objects.map(o => ({ id: o.id, label: o.navLabel, group: 'objects' })),
  { id: 'conditions', label: 'Conditions', group: null },
  { id: 'glossary',   label: 'Glossary',   group: null },
  { id: 'credits',    label: 'Credits',    group: null },
];
const RENDERABLE = SLIDE_DEFS.filter(s => !s.isGroup);
const N = RENDERABLE.length;

// ── CONTENT BUILDERS ──────────────────────────────────────────────────────

function constellationWatermark() {
  const key = D.coverConstellation;
  if (!key || !window.SKY_CONSTELLATIONS) return '';
  const paths = window.SKY_CONSTELLATIONS[key];
  if (!paths) return '';
  return `<svg class="cover-constellation" viewBox="0 0 400 300"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${paths}</svg>`;
}

function buildCover() {
  const ep = D.scope.eyepieces;

  const qObj = window.SKY_QUOTE || null;
  const quoteHtml = qObj
    ? `<div class="cover-quote">
        <span class="cover-quote-text">"${qObj.q}"</span>
        <span class="cover-quote-attr">— ${qObj.a}</span>
       </div>`
    : '';

  return `<div class="cover-wrap">
  ${constellationWatermark()}
  <div class="cover-dots"><div class="cover-dot lit"></div><div class="cover-dot lit"></div><div class="cover-dot"></div><div class="cover-dot lit"></div><div class="cover-dot"></div><div class="cover-dot lit"></div><div class="cover-dot"></div><div class="cover-dot lit"></div><div class="cover-dot lit"></div></div>
  <p class="cover-year">Clear Skies</p>
  <h1 class="cover-title">${D.month} <span class="cover-italic" style="color:var(--season)">${D.year}</span></h1>
  <p class="cover-sub">${D.subtitle}</p>
  <div class="spec-row">
    <span class="pill hi">${D.scope.aperture}mm reflector</span>
    <span class="pill hi">f/${D.scope.fRatio}</span>
    ${ep.map(e => `<span class="pill">${e.focal}mm → ${e.mag}×</span>`).join('')}
    <span class="pill">True FOV ${ep.map(e => e.trueFov + '°').join(' / ')}</span>
  </div>
  ${quoteHtml}
  <div class="cover-swipe-hint">
    <kbd>←</kbd><kbd>→</kbd> or swipe &nbsp;·&nbsp; or tap nav above
    <span class="swipe-arrow-anim">→</span>
  </div>
</div>`;
}

function buildPlanner() {
  const rows = D.planner.map(r => {
    const isBest = r.type === 'best', isWarn = r.type === 'warn';
    const noteHtml = isWarn ? `<span class="moon-warn">${r.note}</span>`
      : isBest ? `<span class="dark-win">${r.note}</span>` : r.note;
    return `<tr${isBest ? ' style="background:rgba(64,192,160,0.05)"' : ''}>
      <td${isBest ? ' style="color:var(--teal);font-weight:600"' : ''}>${r.dates}</td>
      <td${isBest ? ' style="color:#fff"' : ''}>${r.targets}</td>
      <td>${r.time}</td><td>${noteHtml}</td></tr>`;
  }).join('');

  const cards = D.planner.map(r => {
    const isBest = r.type === 'best', isWarn = r.type === 'warn';
    return `<div class="pweek${isBest ? ' bw' : ''}">
  <div class="pw-date">${r.dates}</div>
  <div class="pw-tg">${r.targets}</div>
  <div class="pw-time">Best: ${r.time}</div>
  <div class="pw-note ${isWarn ? 'moon-warn' : isBest ? 'dark-win' : ''}">${r.note}</div>
</div>`;
  }).join('');

  const phases = D.moonEvents;
  return `<h2 class="stitle">Sky at a glance — ${D.month} ${D.year}</h2>
<p class="sintro">Full Moon ${phases.full} · Last Qtr ${phases.lastQtr} · New Moon ${phases.newMoon} · First Qtr ${phases.firstQtr}</p>
<div class="planner-wrap"><table class="planner">
<thead><tr><th>Dates</th><th>Best targets</th><th>Best time</th><th>Note</th></tr></thead>
<tbody>${rows}</tbody></table></div>
<div class="plan-cards">${cards}</div>
${D.plannerFooter ? `<p style="font-size:12px;color:var(--dim);margin-top:11px;font-family:var(--sans);">${D.plannerFooter}</p>` : ''}`;
}

function buildMoon() {
  const phStrip = D.moonPhases.map((p, i) =>
    `<div class="phase-day${i + 1 === D.newMoonDay ? ' nm' : ''}"><span class="dn">${i + 1}</span><span class="pm">${p}</span></div>`
  ).join('');
  const features = D.moonFeatures.map(f =>
    `<div class="feat-card"><h4>${f.name}</h4><p>${f.desc}</p><p class="best">${f.best}</p></div>`
  ).join('');
  return `<h2 class="stitle">The Moon — ${D.month} ${D.year}</h2>
<p class="sintro">Phase calendar. New Moon ${D.moonEvents.newMoon} is your darkest night.</p>
<div class="phase-wrap"><div class="phase-strip">${phStrip}</div></div>
<div class="two-col">${features}</div>`;
}

function buildPlanets() {
  const cards = D.planets.map(p => `<div class="pcard">
  <h3>${p.name}</h3>
  ${p.rows.map(([l, v]) => `<div class="prow"><span class="lbl">${l}</span><span class="val">${v}</span></div>`).join('')}
  <p class="pcard-note">${p.note}</p>
  <div class="pcard-ease">${E(p.ease)}</div>
</div>`).join('');
  const events = D.events.map(ev =>
    `<div class="bonus${ev.type === 'warn' ? ' wb' : ''}"><h4>${ev.title}</h4><p>${ev.body}</p></div>`
  ).join('');
  return `<h2 class="stitle">Planets — ${D.month} ${D.year}</h2>
<div class="planet-grid">${cards}</div>${events}`;
}

function buildObject(o) {
  const warningHtml = o.warning ? `<div class="obj-note">${o.warning}</div>` : '';
  const meta1 = o.meta.slice(0,3).map(([k,v]) =>
    `<div class="obj-meta-item"><div class="mk">${k}</div><div class="mv">${v}</div></div>`).join('');
  const meta2 = o.meta.slice(3).map(([k,v]) =>
    `<div class="obj-meta-item"><div class="mk">${k}</div><div class="mv">${v}</div></div>`).join('');

  if (o.twoSketch) {
    const sketchCells = o.sketches.map(s => `<div class="two-sketch-cell">
  ${sketch(s)}<div class="sketch-lbl">${s.label.replace(/\n/g,'<br>')}</div></div>`).join('');
    return `<div class="obj-card">
  <div class="obj-head">
    <div><div class="obj-name">${o.name}</div><div class="obj-type">${o.type}</div></div>
    <div><div class="ease-label">Ease</div><div class="er" style="gap:3px">${E(o.ease)}</div></div>
  </div>${warningHtml}
  <div class="obj-meta">${meta1}</div>
  <div class="obj-meta" style="border-bottom:1px solid var(--border)">${meta2}</div>
  <div class="obj-body two-sketch"><div class="obj-desc"><h4>What you will see</h4><p>${o.description}</p></div></div>
  <div class="two-sketch-row">${sketchCells}</div>
  <div class="obj-finder"><h4>How to find it</h4><p>${o.finder}</p></div>
</div>`;
  }
  const s = o.sketches[0];
  return `<div class="obj-card">
  <div class="obj-head">
    <div><div class="obj-name">${o.name}</div><div class="obj-type">${o.type}</div></div>
    <div><div class="ease-label">Ease</div><div class="er" style="gap:3px">${E(o.ease)}</div></div>
  </div>${warningHtml}
  <div class="obj-meta">${meta1}</div>
  <div class="obj-meta" style="border-bottom:1px solid var(--border)">${meta2}</div>
  <div class="obj-body">
    <div class="obj-desc"><h4>What you will see</h4><p>${o.description}</p></div>
    <div class="obj-sketch-col">${sketch(s)}<div class="sketch-lbl">${s.label.replace(/\n/g,'<br>')}</div></div>
  </div>
  <div class="obj-finder"><h4>How to find it</h4><p>${o.finder}</p></div>
</div>`;
}

function buildConditions() {
  return `<h2 class="stitle">Conditions &amp; checklist</h2>
<div class="cond-grid">
  <div class="cond-box"><h4>Transparency vs seeing</h4><p>Transparency = how clear the air is (affects faint objects). Seeing = how steady the air is (affects fine detail and double star splitting at 100×). For galaxies: prioritise transparency. For double stars, planets, and the Moon: prioritise seeing.</p></div>
  <div class="cond-box"><h4>Averted vision</h4><p>Look slightly to the side of a faint object to use the eye's rod cells (~10–15° off-centre). Essential for faint galaxies and globular cluster halos. Takes a few sessions to become natural.</p></div>
</div>
<p style="font-size:11px;color:var(--dim);text-transform:uppercase;letter-spacing:.08em;font-family:var(--sans);margin-bottom:9px;">Pre-session checklist</p>
<ul class="checklist">
  <li><span class="chk">○</span>Let telescope cool outside 30–45 min — a warm mirror creates thermal currents that blur all magnifications</li>
  <li><span class="chk">○</span>Allow 20 min for eyes to dark-adapt — red torch only, avoid all white light</li>
  <li><span class="chk">○</span>Check Moon phase — plan deep sky sessions around ${D.darkSkyWindow} new moon window</li>
  <li><span class="chk">○</span>Start with ${D.scope.eyepieces[0].focal}mm (${D.scope.eyepieces[0].mag}×) to find every object, then switch to ${D.scope.eyepieces[1].focal}mm (${D.scope.eyepieces[1].mag}×) for detail</li>
  <li><span class="chk">○</span>Clean eyepieces only if needed — lens cloth, breathe gently on glass, never use tissue</li>
  <li><span class="chk">○</span>Note time, seeing (1–5) and transparency (1–5) — patterns across sessions reveal your best nights</li>
</ul>`;
}

function buildGlossary() {
  const items = D.glossary.map(([term, def]) =>
    `<div class="gloss-item"><div class="gloss-term">${term}</div><div class="gloss-def">${def}</div></div>`
  ).join('');
  const qObj = window.SKY_QUOTE || null;
  const quoteHtml = qObj
    ? `<div class="quote-box">"${qObj.q}"<br><span style="font-size:11px;font-style:normal;color:var(--dim);letter-spacing:.05em">— ${qObj.a}</span></div>`
    : '';
  return `<h2 class="stitle">Quick glossary</h2>
<div class="gloss-grid">${items}</div>
<div class="limit-box"><strong style="color:var(--text)">${D.scopeLimitNote}</strong></div>
${quoteHtml}`;
}

function buildCredits() {
  const contributors = D.credits.contributors.map(n => `<div class="credits-name-sm">${n}</div>`).join('');
  const ep   = D.scope.eyepieces;
  const qObj = window.SKY_QUOTE || null;
  const quoteHtml = qObj
    ? `<div class="credits-quote">"${qObj.q}"<br>
       <span style="font-size:11px;font-style:normal;color:var(--dim);letter-spacing:.06em;">— ${qObj.a}</span></div>`
    : '';
  return `<div class="credits-wrap">
  <div class="credits-star">✦</div>
  <div class="credits-title">Clear Skies · ${D.month} ${D.year}</div>
  <div class="credits-block">
    <div class="credits-role">Author</div>
    <div class="credits-name">${D.credits.author}</div>
  </div>
  <div class="credits-block">
    <div class="credits-role">Inputs by</div>
    ${contributors}
  </div>
  <div class="credits-scope">
    <strong>Telescope</strong> · ${D.scope.aperture}mm f/${D.scope.fRatio} Newtonian reflector<br>
    <strong>Eyepieces</strong> · ${ep.map(e => `${e.focal}mm (${e.mag}×)`).join(' &nbsp;·&nbsp; ')}<br>
    <strong>Hemisphere</strong> · ${D.hemisphere.charAt(0).toUpperCase() + D.hemisphere.slice(1)} &nbsp;·&nbsp; <strong>Month</strong> · ${D.month} ${D.year}
  </div>
  ${quoteHtml}
</div>`;
}

function buildContent(id) {
  if (id === 'cover')      return buildCover();
  if (id === 'planner')    return buildPlanner();
  if (id === 'moon')       return buildMoon();
  if (id === 'planets')    return buildPlanets();
  if (id === 'conditions') return buildConditions();
  if (id === 'glossary')   return buildGlossary();
  if (id === 'credits')    return buildCredits();
  const obj = D.objects.find(o => o.id === id);
  if (obj) return buildObject(obj);
  return `<h2 class="stitle">${id}</h2>`;
}

// ── BUILD DOM ──────────────────────────────────────────────────────────────
const topnav     = document.getElementById('topnav');
const subnav     = document.getElementById('subnav');
const track      = document.getElementById('slide-track');
const progressEl = document.getElementById('progress');
const counterEl  = document.getElementById('counter');
const dotsEl     = document.getElementById('swipe-dots');
const prevBtn    = document.getElementById('hint-prev');
const nextBtn    = document.getElementById('hint-next');

let current = 0;
track.style.width = N * 100 + 'vw';

SLIDE_DEFS.forEach(s => {
  if (s.group === 'objects') return;
  const a = document.createElement('a');
  a.textContent = s.label;
  if (s.isGroup) {
    a.dataset.group = 'objects';
    a.addEventListener('click', () => goTo(RENDERABLE.findIndex(r => r.group === 'objects')));
  } else {
    const idx = RENDERABLE.findIndex(r => r.id === s.id);
    a.dataset.idx = idx;
    a.addEventListener('click', () => goTo(idx));
  }
  topnav.appendChild(a);
});

RENDERABLE.forEach((s, idx) => {
  if (s.group !== 'objects') return;
  const a = document.createElement('a');
  a.textContent = s.label;
  a.dataset.idx = idx;
  a.addEventListener('click', () => goTo(idx));
  subnav.appendChild(a);
});

for (let i = 0; i < N; i++) {
  const d = document.createElement('div');
  d.className = 'sdot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(d);
}

RENDERABLE.forEach((s, i) => {
  const div   = document.createElement('div');
  div.className = 'slide';
  div.id = s.id;
  const inner = document.createElement('div');
  inner.className = 'slide-inner';
  inner.innerHTML = buildContent(s.id);
  div.appendChild(inner);
  track.appendChild(div);
});

// ── NAVIGATION ─────────────────────────────────────────────────────────────
function setTrackTop(withSub) { track.classList.toggle('with-sub', withSub); }

function updateUI(idx) {
  const slide = RENDERABLE[idx];
  const isObj = slide.group === 'objects';
  topnav.querySelectorAll('a').forEach(a => {
    if (a.dataset.group === 'objects') a.classList.toggle('active', isObj);
    else if (a.dataset.idx != null)    a.classList.toggle('active', +a.dataset.idx === idx);
  });
  subnav.classList.toggle('visible', isObj);
  setTrackTop(isObj);
  const objSlides = RENDERABLE.filter(s => s.group === 'objects');
  subnav.querySelectorAll('a').forEach((a, i) =>
    a.classList.toggle('active', objSlides[i] && objSlides[i].id === slide.id)
  );
  if (isObj) subnav.querySelector('a.active')?.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
  topnav.querySelector('a.active')?.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
  progressEl.style.width = (idx / (N - 1) * 100) + '%';
  counterEl.textContent  = (idx + 1) + ' / ' + N;
  dotsEl.querySelectorAll('.sdot').forEach((d, i) => d.classList.toggle('active', i === idx));
  prevBtn.classList.toggle('gone', idx === 0);
  nextBtn.classList.toggle('gone', idx === N - 1);
}

function goTo(idx) {
  if (idx < 0 || idx >= N) return;
  track.children[current].scrollTop = 0;
  current = idx;
  track.style.transform = `translateX(${-idx * 100}vw)`;
  updateUI(idx);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
  else if (e.key === 'ArrowLeft')              { e.preventDefault(); goTo(current - 1); }
});
prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

let tX0 = 0, tY0 = 0, tScrolling = null;
track.addEventListener('touchstart', e => { tX0 = e.touches[0].clientX; tY0 = e.touches[0].clientY; tScrolling = null; }, { passive: true });
track.addEventListener('touchmove', e => {
  if (tScrolling === null) {
    const dx = Math.abs(e.touches[0].clientX - tX0);
    const dy = Math.abs(e.touches[0].clientY - tY0);
    tScrolling = dy > dx ? 'vertical' : 'horizontal';
  }
  if (tScrolling === 'horizontal') e.preventDefault();
}, { passive: false });
track.addEventListener('touchend', e => {
  if (tScrolling !== 'horizontal') return;
  const dx = tX0 - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 50) goTo(dx > 0 ? current + 1 : current - 1);
}, { passive: true });

// ── REDSHIFT BUBBLE ────────────────────────────────────────────────────────
const bubble = document.getElementById('nightmode-bubble');
const nbIcon = bubble.querySelector('.nb-icon');
bubble.addEventListener('click', () => {
  const on = document.body.classList.toggle('red-sky');
  nbIcon.innerHTML = on ? '🪐' : '&#x2600;&#xFE0E;';
  document.querySelector('meta[name="theme-color"]').content = on ? '#100400' : '#09090f';
});

// ── SERVICE WORKER + UPDATE TOAST ─────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {

      // Always check for a new version on every boot
      reg.update();

      function onUpdateReady() {
        const toast = document.getElementById('update-toast');
        if (!toast) return;
        toast.classList.add('visible');
        toast.addEventListener('click', () => {
          if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }, { once: true });
      }

      if (reg.waiting) onUpdateReady();

      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) onUpdateReady();
        });
      });

      // Reload once the new SW has taken control
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) { refreshing = true; window.location.reload(); }
      });

    }).catch(e => console.warn('[SW] Registration failed:', e));
  });
}

// ── EASTER EGG 🐣 ─────────────────────────────────────────────────────────
// Appears only on Easter Sunday. Self-contained — no data file changes needed.
// Easter is computed via the anonymous Gregorian algorithm (valid 1900–2099).
(function () {
  function easterDate(year) {
    const a = year % 19, b = Math.floor(year / 100), c = year % 100;
    const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31); // 1-indexed
    const day   = ((h + l - 7 * m + 114) % 31) + 1;
    return { month, day };
  }

  const today = new Date();
  const yy = today.getFullYear(), mm = today.getMonth() + 1, dd = today.getDate();
  const e = easterDate(yy);
  if (mm !== e.month || dd !== e.day) return; // not Easter — do nothing

  // ── Inject CSS ────────────────────────────────────────────────────────────
  const css = `
#easter-egg-btn {
  position: absolute; bottom: 14px; right: 18px;
  font-size: 22px; background: none; border: none;
  cursor: pointer; opacity: 0; user-select: none;
  animation: egg-appear 1.8s ease 2.2s forwards;
  filter: drop-shadow(0 0 6px rgba(255,220,80,0));
  transition: filter .2s, transform .2s;
  -webkit-tap-highlight-color: transparent;
  z-index: 10;
}
#easter-egg-btn:hover { filter: drop-shadow(0 0 8px rgba(255,220,80,0.7)); transform: scale(1.15) rotate(-8deg); }
@keyframes egg-appear {
  0%   { opacity: 0; transform: translateY(6px); }
  100% { opacity: 0.55; transform: translateY(0); }
}
#easter-overlay {
  position: fixed; inset: 0; z-index: 2000;
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
  background: rgba(6,6,14,0.88); backdrop-filter: blur(10px);
  animation: egg-fade-in .3s ease both;
  cursor: pointer;
}
@keyframes egg-fade-in { from { opacity:0; } to { opacity:1; } }
#easter-overlay.out { animation: egg-fade-out .4s ease both; }
@keyframes egg-fade-out { from { opacity:1; } to { opacity:0; } }
#easter-card {
  background: var(--card); border: 1px solid rgba(240,192,64,0.35);
  border-radius: 14px; padding: 28px 26px 22px;
  max-width: 360px; text-align: center;
  box-shadow: 0 0 40px rgba(240,192,64,0.12);
  animation: egg-pop .4s cubic-bezier(.34,1.56,.64,1) both;
}
@keyframes egg-pop { from { transform: scale(.82) translateY(12px); opacity:0; } to { transform: scale(1) translateY(0); opacity:1; } }
#easter-card .egg-icon { font-size: 44px; display: block; margin-bottom: 14px; }
#easter-card .egg-msg {
  font-style: italic; font-size: 14px; color: var(--muted);
  line-height: 1.7; margin-bottom: 14px;
}
#easter-card .egg-attr {
  font-family: var(--sans); font-size: 10px; color: var(--dim);
  letter-spacing: .07em; text-transform: uppercase;
}
#easter-card .egg-dismiss {
  font-family: var(--sans); font-size: 10px; color: var(--dim);
  margin-top: 18px; letter-spacing: .05em;
}`;
  const s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);

  // ── Messages (Marvin meets Doc Brown meets the night sky) ─────────────────
  const msgs = [
    { msg: "The Moon that determines Easter is, cosmologically speaking, indistinguishable from the Moon on any other Sunday. It still doesn't care.", attr: "Marvin, probably" },
    { msg: "Great Scott — the same gravitational mechanics that govern this telescope's mirror also govern an egg rolling down a hill. The universe is, if nothing else, consistent.", attr: "Doc Brown, distantly" },
    { msg: "Easter is calculated from the first full Moon after the vernal equinox. Astronomers invented the algorithm. You're welcome.", attr: "Anonymous, 325 AD" },
    { msg: "Here we are, hurtling through space at 30 kilometres per second, and someone hid chocolate in the garden again.", attr: "Carl Sagan, in another life" },
    { msg: "The Paschal full Moon rose three days ago. I watched it from the eyepiece. It was not visibly holier than usual.", attr: "Observer's log, undated" },
  ];
  const chosen = msgs[Math.floor(Math.random() * msgs.length)];

  // ── Inject 🐣 button into cover after DOM is built ────────────────────────
  // We hook into goTo so we can re-add the button when cover is visited
  const _origGoTo = window._clearSkiesGoTo; // not set yet — use MutationObserver

  function plantEgg() {
    const coverSlide = document.getElementById('cover');
    if (!coverSlide || coverSlide.querySelector('#easter-egg-btn')) return;
    const wrap = coverSlide.querySelector('.cover-wrap');
    if (!wrap) return;
    wrap.style.position = 'relative';
    const btn = document.createElement('button');
    btn.id = 'easter-egg-btn';
    btn.setAttribute('aria-label', 'Easter egg');
    btn.textContent = '🐣';
    wrap.appendChild(btn);
    btn.addEventListener('click', showOverlay);
  }

  function showOverlay() {
    if (document.getElementById('easter-overlay')) return;
    const ov = document.createElement('div');
    ov.id = 'easter-overlay';
    ov.innerHTML = `<div id="easter-card">
      <span class="egg-icon">🐣</span>
      <p class="egg-msg">"${chosen.msg}"</p>
      <p class="egg-attr">— ${chosen.attr}</p>
      <p class="egg-dismiss">tap anywhere to close</p>
    </div>`;
    document.body.appendChild(ov);

    function dismiss() {
      ov.classList.add('out');
      ov.addEventListener('animationend', () => ov.remove(), { once: true });
    }
    ov.addEventListener('click', dismiss);
    // Auto-dismiss after 9 seconds
    setTimeout(dismiss, 9000);
  }

  // Plant the egg once the slide track is populated
  const observer = new MutationObserver(() => {
    if (document.getElementById('cover')) { plantEgg(); observer.disconnect(); }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  // Also try immediately in case DOM is already ready
  plantEgg();

})();

// ── Init ───────────────────────────────────────────────────────────────────
setTrackTop(false);
updateUI(0);

// ── NEXT MONTH TEASER ─────────────────────────────────────────────────────
// Renders the teaser pill if loader.js confirmed next month's file exists.
// Exposed globally so loader.js can also call it if it resolves after app.js.
function renderNextTeaser() {
  if (document.getElementById('next-month-teaser')) return;
  const next = window.SKY_NEXT;
  if (!next) return;
  const btn = document.createElement('button');
  btn.id = 'next-month-teaser';
  btn.setAttribute('aria-label', `Preview ${next.month} ${next.year}`);
  btn.innerHTML = `<span class="nt-icon">🔭</span><span class="nt-label">${next.month} ${next.year}</span><span class="nt-arrow">→</span>`;
  btn.addEventListener('click', () => {
    const slug = next.month.toLowerCase() + '-' + next.year;
    window.location.href = window.location.pathname + '?preview=' + slug;
  });
  document.body.appendChild(btn);
}
window.SKY_RENDER_NEXT_TEASER = renderNextTeaser;
renderNextTeaser(); // in case loader already resolved before app.js ran

})(); // end IIFE
