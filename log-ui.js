// ─────────────────────────────────────────────────────────────────────────────
// log-ui.js — Observer's log overlay UI.
// Self-contained: injects its own button, overlay, styles, and all logic.
// Depends on: log.js (SkyLog API) · objects-db.js (SKY_OBJECTS_DB) · SKY_DATA
// app.js does NOT need to change.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────
const CSS = `
/* ── LOG BUTTON ── */
#log-bubble {
  position: fixed; bottom: 110px; right: 16px; z-index: 500;
  width: 54px; height: 54px; border-radius: 50%;
  background: rgba(20,20,50,0.92); backdrop-filter: blur(14px);
  border: 2px solid rgba(64,192,160,0.45);
  box-shadow: 0 2px 20px rgba(0,0,0,0.6);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background .3s, border-color .3s, transform .15s;
  -webkit-tap-highlight-color: transparent; user-select: none;
}
#log-bubble:hover  { transform: scale(1.1); border-color: rgba(64,192,160,0.8); }
#log-bubble:active { transform: scale(0.92); }
#log-bubble .lb-icon {
  font-size: 22px; line-height: 1;
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%;
}
#log-bubble::after {
  content: 'Observer\'s log';
  position: absolute; right: calc(100% + 10px); top: 50%; transform: translateY(-50%);
  background: rgba(9,9,15,0.95); border: 1px solid rgba(64,192,160,0.3); border-radius: 6px;
  padding: 5px 11px; font-family: var(--sans); font-size: 11px; color: rgba(64,192,160,0.85);
  letter-spacing: .04em; white-space: nowrap; opacity: 0; pointer-events: none;
  transition: opacity .2s;
}
#log-bubble:hover::after { opacity: 1; }
body.red-sky #log-bubble { background: rgba(60,8,0,0.94); border-color: rgba(255,80,30,0.5); }
body.red-sky #log-bubble::after { border-color: rgba(255,80,30,0.35); color: rgba(255,120,80,0.85); }

/* ── OVERLAY ── */
#log-overlay {
  position: fixed; inset: 0; z-index: 800;
  display: none; flex-direction: column;
  background: rgba(6,6,14,0.97); backdrop-filter: blur(18px);
  animation: log-overlay-in .22s cubic-bezier(.22,.68,0,1.1) both;
}
#log-overlay.open { display: flex; }
@keyframes log-overlay-in {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── OVERLAY HEADER ── */
#log-overlay-header {
  flex-shrink: 0;
  display: flex; align-items: center; gap: 12px;
  padding: 14px 18px 0;
  background: rgba(9,9,15,0.98);
}
#log-overlay-header .log-title {
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  color: var(--teal); letter-spacing: .06em; text-transform: uppercase; flex: 1;
}
#log-overlay-header .log-count-badge {
  font-family: var(--sans); font-size: 10px; color: var(--dim);
  background: var(--card); border: 1px solid var(--border);
  padding: 2px 9px; border-radius: 20px; letter-spacing: .04em;
}
#log-close-btn {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,0.06); border: 1px solid var(--border2);
  color: var(--muted); font-size: 18px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s, color .15s; flex-shrink: 0;
}
#log-close-btn:hover { background: rgba(255,255,255,0.12); color: var(--text); }

/* ── PRIVACY NOTICE (overlay) ── */
.log-privacy-notice {
  font-family: var(--sans); font-size: 10px; color: var(--dim);
  padding: 5px 18px 11px;
  background: rgba(9,9,15,0.98);
  border-bottom: 1px solid var(--border2);
  display: flex; align-items: center; gap: 6px; letter-spacing: .02em;
}
.log-privacy-notice .pn-lock { font-size: 11px; flex-shrink: 0; opacity: .7; }
.log-privacy-notice strong   { color: var(--muted); font-weight: 500; }

/* ── TOOLBAR ── */
#log-toolbar {
  flex-shrink: 0;
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  padding: 11px 18px 10px;
  border-bottom: 1px solid var(--border);
  background: rgba(9,9,15,0.6);
}
.log-view-toggle { display: flex; border: 1px solid var(--border2); border-radius: 5px; overflow: hidden; }
.log-view-toggle button {
  font-family: var(--sans); font-size: 11px; padding: 5px 13px;
  background: transparent; border: none; color: var(--muted);
  cursor: pointer; letter-spacing: .03em; transition: background .15s, color .15s; white-space: nowrap;
}
.log-view-toggle button + button { border-left: 1px solid var(--border2); }
.log-view-toggle button.active { background: var(--card); color: var(--text); }
.log-spacer { flex: 1; }
.lb {
  font-family: var(--sans); font-size: 11px; padding: 5px 12px;
  border-radius: 5px; border: 1px solid var(--border2);
  background: var(--card); color: var(--text);
  cursor: pointer; letter-spacing: .03em; transition: background .15s, color .15s; white-space: nowrap;
}
.lb:hover { background: rgba(255,255,255,0.07); }
.lb.accent { background: var(--teal); border-color: var(--teal); color: #080810; font-weight: 700; }
.lb.accent:hover { opacity: .88; }
.lb.ghost { background: transparent; border-color: transparent; color: var(--muted); }
.lb.ghost:hover { color: var(--text); }

/* ── ENTRY LIST ── */
#log-body { flex: 1; overflow-y: auto; padding: 16px 18px 32px; -webkit-overflow-scrolling: touch; }
.log-empty {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 60px 20px;
  color: var(--dim); font-family: var(--sans); font-size: 12px; text-align: center; gap: 10px;
}
.log-empty-icon { font-size: 32px; opacity: .5; }

.log-entry-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 9px; margin-bottom: 10px; overflow: hidden; transition: border-color .2s;
}
.log-entry-card:hover { border-color: var(--border2); }
.log-entry-head {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; cursor: pointer; user-select: none; flex-wrap: wrap;
}
.log-entry-date {
  font-family: var(--sans); font-size: 12px; font-weight: 600;
  color: var(--text); white-space: nowrap; min-width: 86px;
}
.log-entry-time { font-family: var(--sans); font-size: 11px; color: var(--dim); white-space: nowrap; }
.log-entry-objs { flex: 1; display: flex; flex-wrap: wrap; gap: 3px; min-width: 0; }
.obj-chip {
  display: inline-block; background: rgba(64,192,160,0.1);
  border: 1px solid rgba(64,192,160,0.25); color: var(--teal);
  border-radius: 3px; font-family: var(--sans); font-size: 10px;
  padding: 1px 6px; white-space: nowrap;
}
.log-entry-cond { display: flex; gap: 6px; flex-shrink: 0; align-items: center; }
.cond-pip { display: flex; gap: 2px; }
.cond-pip span { display: inline-block; width: 6px; height: 6px; border-radius: 50%; }
.cond-pip span.on  { background: var(--teal); }
.cond-pip span.off { background: var(--border2); }
.log-entry-actions { display: flex; gap: 4px; flex-shrink: 0; }
.log-entry-actions button {
  font-family: var(--sans); font-size: 10px; padding: 3px 8px;
  border-radius: 4px; border: 1px solid var(--border2);
  background: transparent; color: var(--muted); cursor: pointer; transition: background .1s, color .1s;
}
.log-entry-actions button:hover { background: rgba(255,255,255,0.06); color: var(--text); }
.log-entry-actions .del-btn:hover { border-color: var(--warn); color: var(--warn); }
.log-entry-body { display: none; padding: 0 14px 12px; border-top: 1px solid var(--border); }
.log-entry-body.open { display: block; }
.log-entry-notes {
  font-family: var(--sans); font-size: 12px; color: var(--muted);
  line-height: 1.65; margin-top: 10px; font-style: italic;
}
.log-entry-meta-row {
  display: flex; gap: 18px; margin-top: 10px; flex-wrap: wrap;
  font-family: var(--sans); font-size: 11px; color: var(--dim);
}
.log-entry-meta-row span b { color: var(--muted); font-weight: 500; }

/* ── MODAL ── */
#log-modal-backdrop {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(6,6,14,0.82); backdrop-filter: blur(6px);
  display: none; align-items: flex-end; justify-content: center; padding: 0;
}
#log-modal-backdrop.open { display: flex; }
@media (min-width: 600px) { #log-modal-backdrop { align-items: center; padding: 24px; } }
#log-modal {
  background: #0d0d20; border: 1px solid var(--border2);
  border-radius: 14px 14px 0 0; width: 100%; max-width: 540px;
  max-height: 92vh; overflow-y: auto; padding: 20px 18px 32px;
  animation: modal-up .22s cubic-bezier(.22,.68,0,1.15) both;
}
@media (min-width: 600px) { #log-modal { border-radius: 14px; } }
@keyframes modal-up {
  from { transform: translateY(28px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
.modal-header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;
}
.modal-header h4 {
  font-family: var(--sans); font-size: 13px; font-weight: 600;
  color: var(--text); letter-spacing: .03em;
}
.modal-close {
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(255,255,255,0.06); border: 1px solid var(--border2);
  color: var(--muted); font-size: 16px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: background .15s, color .15s;
}
.modal-close:hover { background: rgba(255,255,255,0.12); color: var(--text); }

/* ── PRIVACY NOTICE (modal) ── */
.modal-privacy {
  font-family: var(--sans); font-size: 10px; color: var(--dim);
  display: flex; align-items: center; gap: 5px;
  margin-bottom: 16px; letter-spacing: .02em;
  background: rgba(64,192,160,0.05); border: 1px solid rgba(64,192,160,0.12);
  border-radius: 6px; padding: 7px 10px;
}
.modal-privacy .pn-lock { opacity: .7; font-size: 11px; flex-shrink: 0; }
.modal-privacy strong   { color: var(--muted); font-weight: 500; }

/* ── FORM ── */
.f-field { margin-bottom: 14px; }
.f-label {
  font-family: var(--sans); font-size: 10px; text-transform: uppercase;
  letter-spacing: .08em; color: var(--dim); margin-bottom: 5px;
}
.f-input {
  width: 100%; background: rgba(255,255,255,0.04);
  border: 1px solid var(--border2); border-radius: 6px;
  color: var(--text); font-family: var(--sans); font-size: 13px;
  padding: 8px 11px; outline: none; transition: border-color .15s; -webkit-appearance: none;
}
.f-input:focus { border-color: var(--teal); }
.f-input::placeholder { color: var(--dim); }
textarea.f-input { resize: vertical; min-height: 70px; }

/* Date / start / end row — 3 cols; date spans full width on very narrow screens */
.f-row3 { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 10px; }
@media (max-width: 400px) {
  .f-row3 { grid-template-columns: 1fr 1fr; }
  .f-row3 .f-date-cell { grid-column: 1 / -1; }
}

/* Seeing + Transparency — stack on mobile, side-by-side above 480px */
.f-cond-row { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 480px) { .f-cond-row { grid-template-columns: 1fr 1fr; } }

/* tap-rating */
.f-stars { display: flex; gap: 5px; }
.f-star {
  width: 36px; height: 36px; border-radius: 6px;
  border: 1px solid var(--border2); background: rgba(255,255,255,0.04);
  font-family: var(--sans); font-size: 13px; font-weight: 700; color: var(--dim);
  cursor: pointer; user-select: none; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: background .1s, color .1s, border-color .1s;
}
.f-star.on { background: var(--teal); border-color: var(--teal); color: #080810; }
.f-star:hover:not(.on) { border-color: var(--teal); color: var(--teal); }

/* autocomplete */
.f-ac-wrap { position: relative; }
.f-ac-chips { display: flex; flex-wrap: wrap; gap: 4px; min-height: 28px; margin-bottom: 6px; }
.f-chip {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(64,192,160,0.12); border: 1px solid rgba(64,192,160,0.3);
  color: var(--teal); border-radius: 4px;
  font-family: var(--sans); font-size: 11px; padding: 3px 8px;
}
.f-chip-x { cursor: pointer; opacity: .7; font-size: 14px; line-height: 1; transition: opacity .1s; }
.f-chip-x:hover { opacity: 1; }
.f-dropdown {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0;
  background: #0d0d20; border: 1px solid var(--border2); border-radius: 8px;
  z-index: 50; max-height: 230px; overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.7); display: none;
}
.f-dropdown.open { display: block; }
.f-dd-cat {
  font-family: var(--sans); font-size: 9px; text-transform: uppercase;
  letter-spacing: .1em; color: var(--dim);
  padding: 6px 12px 3px; background: rgba(255,255,255,0.02);
  border-bottom: 1px solid var(--border); position: sticky; top: 0;
}
.f-dd-item {
  padding: 9px 12px; cursor: pointer;
  display: flex; justify-content: space-between; align-items: baseline; gap: 8px;
  font-family: var(--sans); font-size: 12px; color: var(--text);
  border-bottom: 1px solid var(--border); transition: background .1s;
}
.f-dd-item:last-child { border-bottom: none; }
.f-dd-item:hover, .f-dd-item.hi { background: rgba(64,192,160,0.08); }
.f-dd-item .dd-name { font-weight: 500; }
.f-dd-item .dd-type { font-size: 10px; color: var(--dim); text-align: right; flex-shrink: 0; }

/* month badge */
.log-month-badge {
  font-family: var(--sans); font-size: 10px;
  color: var(--gold); background: rgba(240,192,64,0.08);
  border: 1px solid rgba(240,192,64,0.2);
  padding: 2px 9px; border-radius: 20px; letter-spacing: .04em;
}

/* ── DESKTOP SCALE-UP (≥ 900px) ── */
@media (min-width: 900px) {
  #log-overlay-header .log-title      { font-size: 16px; }
  #log-overlay-header .log-count-badge{ font-size: 12px; }
  .log-privacy-notice                 { font-size: 12px; padding: 6px 22px 13px; }
  .log-privacy-notice .pn-lock        { font-size: 13px; }
  #log-toolbar                        { padding: 13px 22px 12px; }
  .log-view-toggle button             { font-size: 13px; padding: 6px 16px; }
  .lb                                 { font-size: 13px; padding: 6px 15px; }
  .log-month-badge                    { font-size: 12px; }
  #log-body                           { padding: 20px 22px 40px; }
  .log-empty                          { font-size: 15px; }
  .log-empty-icon                     { font-size: 40px; }
  .log-entry-date                     { font-size: 14px; min-width: 108px; }
  .log-entry-time                     { font-size: 13px; }
  .obj-chip                           { font-size: 12px; padding: 2px 8px; }
  .log-entry-actions button           { font-size: 12px; padding: 4px 10px; }
  .log-entry-notes                    { font-size: 14px; }
  .log-entry-meta-row                 { font-size: 13px; gap: 22px; }
  .cond-pip span                      { width: 8px; height: 8px; }
  /* modal */
  .modal-header h4                    { font-size: 16px; }
  .modal-privacy                      { font-size: 12px; margin-bottom: 20px; padding: 9px 12px; }
  .modal-privacy .pn-lock             { font-size: 13px; }
  .f-label                            { font-size: 12px; }
  .f-input                            { font-size: 15px; padding: 9px 13px; }
  .f-star                             { width: 42px; height: 42px; font-size: 15px; }
  .f-chip                             { font-size: 13px; padding: 4px 10px; }
  .f-dd-item                          { font-size: 14px; padding: 10px 14px; }
  .f-dd-item .dd-type                 { font-size: 12px; }
  .f-dd-cat                           { font-size: 11px; }
}
`;

// ── INJECT STYLES ─────────────────────────────────────────────────────────────
const styleEl = document.createElement('style');
styleEl.textContent = CSS;
document.head.appendChild(styleEl);

// ── PRIVACY STRINGS ───────────────────────────────────────────────────────────
const PRIVACY_OVERLAY = `<span class="pn-lock">🔒</span><strong>Your log never leaves this device.</strong> Stored locally in your browser only — never uploaded or shared with anyone.`;
const PRIVACY_MODAL   = `<span class="pn-lock">🔒</span><strong>Stays on your device only.</strong> This entry is never uploaded, synced, or shared.`;

// ── STATE ─────────────────────────────────────────────────────────────────────
let viewMode   = 'month';
let expandedId = null;
let editingId  = null;

let fDate = '', fTimeStart = '', fTimeEnd = '', fSeeing = 0, fTransp = 0, fObjects = [], fNotes = '';
let acQuery = '', acHiIdx = -1;

// ── BUILD DOM ─────────────────────────────────────────────────────────────────
function buildDOM() {
  // Floating log button
  const btn = document.createElement('button');
  btn.id = 'log-bubble';
  btn.setAttribute('aria-label', 'Observer\'s log');
  btn.innerHTML = '<span class="lb-icon">📓</span>';
  document.body.appendChild(btn);

  // Full-screen overlay
  const overlay = document.createElement('div');
  overlay.id = 'log-overlay';
  overlay.innerHTML = `
    <div id="log-overlay-header">
      <span class="log-title">Observer's Log</span>
      <span class="log-count-badge" id="log-count-badge">0 entries</span>
      <button id="log-close-btn" aria-label="Close log">✕</button>
    </div>
    <div class="log-privacy-notice">${PRIVACY_OVERLAY}</div>
    <div id="log-toolbar">
      <div class="log-view-toggle" id="log-view-toggle">
        <button data-view="month" class="active">This month</button>
        <button data-view="all">All sessions</button>
      </div>
      <span class="log-month-badge" id="log-month-badge"></span>
      <span class="log-spacer"></span>
      <button class="lb ghost" id="log-csv-btn">↓ CSV</button>
      <button class="lb ghost" id="log-json-btn">↓ JSON</button>
      <button class="lb accent" id="log-new-btn">+ New session</button>
    </div>
    <div id="log-body"></div>`;
  document.body.appendChild(overlay);

  // Modal backdrop + form
  const backdrop = document.createElement('div');
  backdrop.id = 'log-modal-backdrop';
  backdrop.innerHTML = `
    <div id="log-modal">
      <div class="modal-header">
        <h4 id="log-modal-title">New session</h4>
        <button class="modal-close" id="log-modal-close">✕</button>
      </div>
      <div class="modal-privacy">${PRIVACY_MODAL}</div>

      <div class="f-field f-row3">
        <div class="f-date-cell">
          <div class="f-label">Date</div>
          <input class="f-input" id="f-date" type="date">
        </div>
        <div>
          <div class="f-label">Time start</div>
          <input class="f-input" id="f-time-start" type="time">
        </div>
        <div>
          <div class="f-label">Time end <span style="opacity:.45;font-size:.85em;text-transform:none;letter-spacing:0">(optional)</span></div>
          <input class="f-input" id="f-time-end" type="time">
        </div>
      </div>

      <div class="f-field f-cond-row">
        <div>
          <div class="f-label">Seeing &nbsp;1 = poor · 5 = perfect</div>
          <div class="f-stars" id="f-seeing"></div>
        </div>
        <div>
          <div class="f-label">Transparency &nbsp;1 = hazy · 5 = crystal</div>
          <div class="f-stars" id="f-transp"></div>
        </div>
      </div>

      <div class="f-field">
        <div class="f-label">Objects observed</div>
        <div class="f-ac-chips" id="f-chips"></div>
        <div class="f-ac-wrap">
          <input class="f-input" id="f-ac-input" type="text"
            placeholder="Type to search — M42, Jupiter, Albireo…"
            autocomplete="off" autocorrect="off" spellcheck="false">
          <div class="f-dropdown" id="f-dropdown"></div>
        </div>
      </div>

      <div class="f-field">
        <div class="f-label">Notes</div>
        <textarea class="f-input" id="f-notes"
          placeholder="What did you see? Conditions, surprises, sketches…" rows="4"></textarea>
      </div>

      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px;">
        <button class="lb" id="f-cancel-btn">Cancel</button>
        <button class="lb accent" id="f-save-btn">Save session</button>
      </div>
    </div>`;
  document.body.appendChild(backdrop);
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function todayISO() { return new Date().toISOString().slice(0, 10); }
function nowHHMM() {
  const d = new Date();
  return d.getHours().toString().padStart(2,'0') + ':' + d.getMinutes().toString().padStart(2,'0');
}
function fmtDate(iso) {
  if (!iso) return '—';
  const [y,m,d] = iso.split('-');
  return `${d} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1]} ${y}`;
}
function fmtDuration(start, end) {
  if (!start || !end) return null;
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let mins = (eh * 60 + em) - (sh * 60 + sm);
  if (mins <= 0) mins += 24 * 60; // crossed midnight
  const h = Math.floor(mins / 60), m = mins % 60;
  return h > 0 ? `${h}h${m > 0 ? ' ' + m + 'min' : ''}` : `${m}min`;
}
function pips(val, max = 5) {
  return Array.from({length: max}, (_, i) =>
    `<span class="${i < val ? 'on' : 'off'}"></span>`).join('');
}
function filterDB(q) {
  if (!q) return [];
  const ql  = q.toLowerCase();
  const sel = new Set(fObjects.map(o => o.id));
  return (window.SKY_OBJECTS_DB || [])
    .filter(o => !sel.has(o.id) && (
      o.id.toLowerCase().includes(ql) ||
      o.name.toLowerCase().includes(ql) ||
      o.type.toLowerCase().includes(ql)
    )).slice(0, 50);
}
function groupBy(arr, key) {
  return arr.reduce((a, o) => { (a[o[key]] = a[o[key]] || []).push(o); return a; }, {});
}

// ── BADGE ─────────────────────────────────────────────────────────────────────
function refreshBadge() {
  const D = window.SKY_DATA;
  const el = document.getElementById('log-count-badge');
  if (el) el.textContent = `${D ? SkyLog.countForMonth(D.month, D.year) : 0} this month · ${SkyLog.count()} total`;
  const mb = document.getElementById('log-month-badge');
  if (mb && D) mb.textContent = `${D.month} ${D.year}`;
}

// ── ENTRY LIST ────────────────────────────────────────────────────────────────
function renderList() {
  refreshBadge();
  const D       = window.SKY_DATA;
  const entries = viewMode === 'month' && D
    ? SkyLog.forMonth(D.month, D.year)
    : SkyLog.all();

  document.querySelectorAll('#log-view-toggle button').forEach(b => {
    b.classList.toggle('active', b.dataset.view === viewMode);
  });

  const body = document.getElementById('log-body');
  if (!body) return;

  if (!entries.length) {
    body.innerHTML = `<div class="log-empty">
      <div class="log-empty-icon">✦</div>
      <div>No sessions logged${viewMode === 'month' ? ' for this month' : ''} yet.</div>
      <div style="margin-top:4px;color:var(--dim);font-size:11px;">
        Tap <strong style="color:var(--teal)">+ New session</strong> after you observe.
      </div>
    </div>`;
    return;
  }

  body.innerHTML = entries.map(e => {
    const expanded = expandedId === e.id;
    const dur      = fmtDuration(e.timeStart, e.timeEnd);
    const timeStr  = e.timeStart
      ? (e.timeEnd ? `${e.timeStart}–${e.timeEnd}` : e.timeStart)
      : '—';
    const objsHtml = (e.objects || []).length
      ? e.objects.map(o => `<span class="obj-chip">${o}</span>`).join('')
      : `<span style="color:var(--dim);font-size:11px;font-family:var(--sans)">—</span>`;

    return `<div class="log-entry-card" data-id="${e.id}">
  <div class="log-entry-head" data-expand="${e.id}">
    <span class="log-entry-date">${fmtDate(e.date)}</span>
    <span class="log-entry-time">${timeStr}${dur ? ` <span style="color:var(--teal);font-size:.88em">(${dur})</span>` : ''}</span>
    <span class="log-entry-objs">${objsHtml}</span>
    <span class="log-entry-cond">
      <span class="cond-pip" title="Seeing ${e.seeing}/5">${pips(e.seeing)}</span>
      <span class="cond-pip" title="Transparency ${e.transparency}/5">${pips(e.transparency)}</span>
    </span>
    <span class="log-entry-actions">
      <button class="edit-btn" data-id="${e.id}">Edit</button>
      <button class="del-btn"  data-id="${e.id}">✕</button>
    </span>
  </div>
  <div class="log-entry-body ${expanded ? 'open' : ''}" id="eb-${e.id}">
    <div class="log-entry-meta-row">
      <span><b>Seeing</b> ${e.seeing || '—'}/5</span>
      <span><b>Transparency</b> ${e.transparency || '—'}/5</span>
      ${dur ? `<span><b>Duration</b> ${dur}</span>` : ''}
      ${viewMode === 'all' ? `<span><b>Month</b> ${e.month} ${e.year}</span>` : ''}
    </div>
    ${e.notes ? `<div class="log-entry-notes">${e.notes.replace(/\n/g,'<br>')}</div>` : ''}
  </div>
</div>`;
  }).join('');

  body.querySelectorAll('[data-expand]').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target.closest('button')) return;
      const id = el.dataset.expand;
      expandedId = expandedId === id ? null : id;
      renderList();
    });
  });
  body.querySelectorAll('.edit-btn').forEach(btn =>
    btn.addEventListener('click', () => openModal(btn.dataset.id))
  );
  body.querySelectorAll('.del-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      if (confirm('Delete this session entry?')) {
        SkyLog.delete(btn.dataset.id);
        if (expandedId === btn.dataset.id) expandedId = null;
        renderList();
      }
    })
  );
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function openModal(editId) {
  editingId  = editId || null;
  const entry = editId ? SkyLog.getById(editId) : null;

  fDate      = entry ? entry.date          : todayISO();
  fTimeStart = entry ? (entry.timeStart    || '') : nowHHMM();
  fTimeEnd   = entry ? (entry.timeEnd      || '') : '';
  fSeeing    = entry ? (entry.seeing       || 0) : 0;
  fTransp    = entry ? (entry.transparency || 0) : 0;
  fObjects   = entry ? (entry.objects || []).map(n => {
    const found = (window.SKY_OBJECTS_DB || []).find(o => o.name === n);
    return found ? { id: found.id, name: found.name } : { id: n, name: n };
  }) : [];
  fNotes     = entry ? (entry.notes || '') : '';
  acQuery    = '';
  acHiIdx    = -1;

  document.getElementById('log-modal-title').textContent = editId ? 'Edit session' : 'New session';
  document.getElementById('f-date').value       = fDate;
  document.getElementById('f-time-start').value = fTimeStart;
  document.getElementById('f-time-end').value   = fTimeEnd;
  document.getElementById('f-notes').value      = fNotes;

  renderStars('f-seeing', fSeeing);
  renderStars('f-transp', fTransp);
  renderChips();
  closeDropdown();

  document.getElementById('log-modal-backdrop').classList.add('open');
  setTimeout(() => document.getElementById('f-ac-input').focus(), 120);
}

function closeModal() {
  document.getElementById('log-modal-backdrop').classList.remove('open');
  editingId = null;
}

function saveModal() {
  const fields = {
    date:         document.getElementById('f-date').value,
    timeStart:    document.getElementById('f-time-start').value,
    timeEnd:      document.getElementById('f-time-end').value,
    seeing:       fSeeing,
    transparency: fTransp,
    objects:      fObjects.map(o => o.name),
    notes:        document.getElementById('f-notes').value.trim(),
  };
  editingId ? SkyLog.update(editingId, fields) : SkyLog.create(fields);
  closeModal();
  renderList();
}

// ── STAR RATING ───────────────────────────────────────────────────────────────
function renderStars(containerId, current) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const cur = current !== undefined ? current
    : (containerId === 'f-seeing' ? fSeeing : fTransp);
  container.innerHTML = Array.from({length:5}, (_, i) => {
    const v = i + 1;
    return `<div class="f-star ${v <= cur ? 'on' : ''}" data-v="${v}">${v}</div>`;
  }).join('');
  container.querySelectorAll('.f-star').forEach(s => {
    s.addEventListener('click', () => {
      const v = +s.dataset.v;
      const next = cur === v ? 0 : v;
      if (containerId === 'f-seeing') { fSeeing = next; renderStars('f-seeing', fSeeing); }
      else                            { fTransp = next; renderStars('f-transp', fTransp); }
    });
  });
}

// ── AUTOCOMPLETE ──────────────────────────────────────────────────────────────
function renderChips() {
  const el = document.getElementById('f-chips');
  if (!el) return;
  el.innerHTML = fObjects.map(o =>
    `<span class="f-chip">${o.name}<span class="f-chip-x" data-id="${o.id}">×</span></span>`
  ).join('');
  el.querySelectorAll('.f-chip-x').forEach(x =>
    x.addEventListener('click', () => {
      fObjects = fObjects.filter(o => o.id !== x.dataset.id);
      renderChips();
    })
  );
}

function openDropdown() {
  const results = filterDB(acQuery);
  const dd      = document.getElementById('f-dropdown');
  if (!dd) return;
  if (!results.length) { closeDropdown(); return; }
  const groups = groupBy(results, 'cat');
  dd.innerHTML = Object.entries(groups).map(([cat, items]) =>
    `<div class="f-dd-cat">${cat}</div>` +
    items.map((o, i) =>
      `<div class="f-dd-item ${i === acHiIdx ? 'hi' : ''}" data-id="${o.id}" data-name="${o.name.replace(/"/g,'&quot;')}">
        <span class="dd-name">${highlight(o.name, acQuery)}</span>
        <span class="dd-type">${o.type}</span>
      </div>`
    ).join('')
  ).join('');
  dd.classList.add('open');
  dd.querySelectorAll('.f-dd-item').forEach(item =>
    item.addEventListener('mousedown', e => { e.preventDefault(); selectObject(item.dataset.id, item.dataset.name); })
  );
}

function closeDropdown() {
  const dd = document.getElementById('f-dropdown');
  if (dd) { dd.classList.remove('open'); dd.innerHTML = ''; }
  acHiIdx = -1;
}

function selectObject(id, name) {
  if (!fObjects.find(o => o.id === id)) fObjects.push({ id, name });
  renderChips();
  const inp = document.getElementById('f-ac-input');
  if (inp) inp.value = '';
  acQuery = '';
  closeDropdown();
}

function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  return text.replace(re, '<strong style="color:var(--teal)">$1</strong>');
}

// ── OVERLAY ───────────────────────────────────────────────────────────────────
function openOverlay()  { document.getElementById('log-overlay').classList.add('open'); renderList(); }
function closeOverlay() { document.getElementById('log-overlay').classList.remove('open'); }

// ── EVENTS ────────────────────────────────────────────────────────────────────
function bindEvents() {
  document.getElementById('log-bubble').addEventListener('click', openOverlay);
  document.getElementById('log-close-btn').addEventListener('click', closeOverlay);

  document.getElementById('log-view-toggle').addEventListener('click', e => {
    const btn = e.target.closest('button[data-view]');
    if (!btn) return;
    viewMode = btn.dataset.view;
    renderList();
  });

  document.getElementById('log-new-btn').addEventListener('click',  () => openModal(null));
  document.getElementById('log-json-btn').addEventListener('click', () => SkyLog.exportJSON());
  document.getElementById('log-csv-btn').addEventListener('click',  () => SkyLog.exportCSV());

  document.getElementById('log-modal-close').addEventListener('click',  closeModal);
  document.getElementById('f-cancel-btn').addEventListener('click',     closeModal);
  document.getElementById('log-modal-backdrop').addEventListener('click', e => {
    if (e.target === document.getElementById('log-modal-backdrop')) closeModal();
  });

  document.getElementById('f-save-btn').addEventListener('click', saveModal);

  document.getElementById('f-time-start').addEventListener('input', e => { fTimeStart = e.target.value; });
  document.getElementById('f-time-end').addEventListener('input',   e => { fTimeEnd   = e.target.value; });
  document.getElementById('f-notes').addEventListener('input',      e => { fNotes     = e.target.value; });

  const acInput = document.getElementById('f-ac-input');
  acInput.addEventListener('input', e => {
    acQuery = e.target.value.trim();
    acHiIdx = -1;
    acQuery.length >= 1 ? openDropdown() : closeDropdown();
  });
  acInput.addEventListener('keydown', e => {
    const dd    = document.getElementById('f-dropdown');
    const items = dd ? dd.querySelectorAll('.f-dd-item') : [];
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      acHiIdx = Math.min(acHiIdx + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('hi', i === acHiIdx));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      acHiIdx = Math.max(acHiIdx - 1, -1);
      items.forEach((el, i) => el.classList.toggle('hi', i === acHiIdx));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (acHiIdx >= 0 && items[acHiIdx]) {
        selectObject(items[acHiIdx].dataset.id, items[acHiIdx].dataset.name);
      } else if (acQuery.trim()) {
        const q = acQuery.trim();
        selectObject(q.toLowerCase().replace(/\s+/g,'_'), q);
      }
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });
  acInput.addEventListener('blur', () => setTimeout(closeDropdown, 180));

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('log-modal-backdrop').classList.contains('open')) closeModal();
    else closeOverlay();
  });
}

// ── INIT ──────────────────────────────────────────────────────────────────────
function init() {
  buildDOM();
  bindEvents();
  renderStars('f-seeing', 0);
  renderStars('f-transp', 0);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
