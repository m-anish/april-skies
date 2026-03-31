// ─────────────────────────────────────────────────────────────────────────────
// log.js — Observer's log storage engine.
// Reads/writes localStorage under key 'sky_log'.
// All entries are month/year-stamped from SKY_DATA at creation time.
// Exposes window.SkyLog API consumed by log-ui.js.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
'use strict';

const STORE_KEY = 'sky_log';

function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); }
  catch (e) { console.warn('[log.js] Parse error:', e); return []; }
}

function save(entries) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(entries)); return true; }
  catch (e) { console.warn('[log.js] Save error:', e); return false; }
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

window.SkyLog = {

  // ── READ ──────────────────────────────────────────────────────────────────
  all() {
    return load().sort((a, b) => b.createdAt - a.createdAt);
  },
  forMonth(month, year) {
    return load()
      .filter(e => e.month === month && e.year === year)
      .sort((a, b) => b.createdAt - a.createdAt);
  },
  getById(id) { return load().find(e => e.id === id) || null; },
  count() { return load().length; },
  countForMonth(month, year) { return this.forMonth(month, year).length; },

  // ── WRITE ─────────────────────────────────────────────────────────────────
  create(fields) {
    const D = window.SKY_DATA;
    const entry = {
      id:           uid(),
      month:        D ? D.month : '—',
      year:         D ? D.year  : 0,
      date:         fields.date         || '',
      timeStart:    fields.timeStart    || '',
      timeEnd:      fields.timeEnd      || '',
      seeing:       fields.seeing       || 0,
      transparency: fields.transparency || 0,
      objects:      fields.objects      || [],  // array of name strings
      notes:        fields.notes        || '',
      createdAt:    Date.now(),
    };
    const all = load();
    all.push(entry);
    save(all);
    return entry;
  },

  update(id, fields) {
    const all = load();
    const i = all.findIndex(e => e.id === id);
    if (i === -1) return null;
    all[i] = { ...all[i], ...fields, id, createdAt: all[i].createdAt };
    save(all);
    return all[i];
  },

  delete(id) {
    save(load().filter(e => e.id !== id));
  },

  // ── EXPORT ────────────────────────────────────────────────────────────────
  exportJSON() {
    const D = window.SKY_DATA;
    const payload = {
      exported:  new Date().toISOString(),
      telescope: D ? `${D.scope.aperture}mm f/${D.scope.fRatio}` : 'unknown',
      entries:   this.all(),
    };
    _download(
      JSON.stringify(payload, null, 2),
      `sky-log-${_today()}.json`,
      'application/json'
    );
  },

  exportCSV() {
    const entries = this.all();
    if (!entries.length) return;
    const header = ['ID','Date','TimeStart','TimeEnd','Month','Year','Seeing','Transparency','Objects','Notes'];
    const rows = entries.map(e => [
      e.id, e.date, e.timeStart, e.timeEnd || '', e.month, e.year,
      e.seeing, e.transparency,
      '"' + (e.objects || []).join('; ').replace(/"/g, '""') + '"',
      '"' + (e.notes   || '').replace(/"/g, '""') + '"',
    ]);
    _download(
      [header, ...rows].map(r => r.join(',')).join('\n'),
      `sky-log-${_today()}.csv`,
      'text/csv'
    );
  },
};

function _today() { return new Date().toISOString().slice(0, 10); }
function _download(content, filename, mime) {
  const a   = Object.assign(document.createElement('a'), {
    href:     URL.createObjectURL(new Blob([content], { type: mime })),
    download: filename,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

})();
