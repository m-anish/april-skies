// ─────────────────────────────────────────────────────────────────────────────
// loader.js — Clear Skies data file loader.
//
// Runs before app.js. Responsibilities:
//   1. Determine which month/year to load based on today's date
//   2. Dynamically inject the correct data-[month]-[year].js script
//   3. Probe whether next month's data file exists on the server
//   4. Expose window.SKY_NEXT for app.js to render the teaser button
//
// If the current month's file is missing (not yet deployed), falls back
// to the most recent available month (tries up to 3 months back).
//
// No changes needed to this file when a new month is deployed — just
// drop the new data file on the server and loader picks it up.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
'use strict';

const MONTHS = [
  'january','february','march','april','may','june',
  'july','august','september','october','november','december'
];

function filename(monthIndex, year) {
  return `./data-${MONTHS[monthIndex]}-${year}.js`;
}

function nextMonthOf(monthIndex, year) {
  return monthIndex === 11
    ? { monthIndex: 0, year: year + 1 }
    : { monthIndex: monthIndex + 1, year };
}

function prevMonthOf(monthIndex, year) {
  return monthIndex === 0
    ? { monthIndex: 11, year: year - 1 }
    : { monthIndex: monthIndex - 1, year };
}

// Probe whether a file exists via HEAD request (no body, just status)
function probe(url) {
  return fetch(url, { method: 'HEAD' })
    .then(r => r.ok)
    .catch(() => false);
}

// Inject a script tag and return a promise that resolves when it loads
function injectScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload  = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// ── Main loader ───────────────────────────────────────────────────────────────
const today = new Date();
const curMonthIdx = today.getMonth();   // 0-indexed
const curYear     = today.getFullYear();

// Build candidate list: current month, then up to 3 months back as fallbacks
const candidates = [{ monthIndex: curMonthIdx, year: curYear }];
let m = curMonthIdx, y = curYear;
for (let i = 0; i < 3; i++) {
  const prev = prevMonthOf(m, y);
  candidates.push(prev);
  m = prev.monthIndex; y = prev.year;
}

// Show a loading indicator while we fetch — hidden once data loads
const loadingEl = document.createElement('div');
loadingEl.id = 'sky-loader';
loadingEl.innerHTML = `
  <style>
    #sky-loader {
      position:fixed;inset:0;z-index:9999;background:#09090f;
      display:flex;align-items:center;justify-content:center;
      flex-direction:column;gap:16px;
      font-family:'Helvetica Neue',Arial,sans-serif;
    }
    #sky-loader .sl-icon  { font-size:36px;animation:sl-spin 3s linear infinite; }
    #sky-loader .sl-text  { font-size:12px;color:#5a5a80;letter-spacing:.12em;text-transform:uppercase; }
    #sky-loader .sl-err   { font-size:12px;color:#e07030;letter-spacing:.06em;text-align:center;padding:0 24px; }
    @keyframes sl-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  </style>
  <div class="sl-icon">✦</div>
  <div class="sl-text">Loading sky data…</div>`;
document.body.appendChild(loadingEl);

// Try candidates in order until one loads
async function tryLoad(index) {
  if (index >= candidates.length) {
    // All failed — show error
    loadingEl.querySelector('.sl-text').textContent = '';
    const err = document.createElement('div');
    err.className = 'sl-err';
    err.textContent = 'No sky data found. Make sure a data-[month]-[year].js file is present.';
    loadingEl.appendChild(err);
    return;
  }

  const { monthIndex, year } = candidates[index];
  const src = filename(monthIndex, year);

  try {
    await injectScript(src);
    // Success — data is loaded, remove loader
    loadingEl.remove();

    // Store which file was actually loaded (for SW / debugging)
    window.SKY_LOADED_FILE = src;
    window.SKY_LOADED_MONTH = { monthIndex, year };

    // Probe next month in the background
    const next = nextMonthOf(monthIndex, year);
    const nextSrc = filename(next.monthIndex, next.year);

    probe(nextSrc).then(exists => {
      if (!exists) return;
      // Next month is available — expose for app.js teaser button
      const name = MONTHS[next.monthIndex];
      const displayName = name.charAt(0).toUpperCase() + name.slice(1);
      window.SKY_NEXT = {
        src:   nextSrc,
        month: displayName,
        year:  next.year,
      };
      // If app is already initialised, trigger teaser render
      if (typeof window.SKY_RENDER_NEXT_TEASER === 'function') {
        window.SKY_RENDER_NEXT_TEASER();
      }
    });

  } catch (e) {
    // This file doesn't exist — try the next candidate
    tryLoad(index + 1);
  }
}

// ── Preview mode: ?preview=may-2026 in URL loads that month instead ───────────
// Useful for reviewing a newly generated file before it's the current month.
const urlParams = new URLSearchParams(window.location.search);
const previewParam = urlParams.get('preview'); // e.g. "may-2026"
if (previewParam) {
  const parts = previewParam.match(/^([a-z]+)-(\d{4})$/);
  if (parts) {
    const mi = MONTHS.indexOf(parts[1]);
    const yr = parseInt(parts[2], 10);
    if (mi !== -1 && !isNaN(yr)) {
      injectScript(`./data-${parts[1]}-${yr}.js`)
        .then(() => {
          loadingEl.remove();
          window.SKY_LOADED_FILE = `./data-${parts[1]}-${yr}.js`;
          window.SKY_LOADED_MONTH = { monthIndex: mi, year: yr };
        })
        .catch(() => tryLoad(0)); // fallback to normal if preview file missing
      return; // skip normal load
    }
  }
}

tryLoad(0);

})();
