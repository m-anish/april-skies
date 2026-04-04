const CACHE = 'clear-skies-v2';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './loader.js',
  './manifest.json',
  './sketches.js',
  './constellations.js',
  './quotes.js',
  './objects-db.js',
  './log.js',
  './log-ui.js',
  './icon-192.png',
  './icon-512.png'
  // data-[month]-[year].js files are NOT precached here —
  // they are fetched and cached at runtime by loader.js on first load.
];

// ── INSTALL ─────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE ────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys.filter(k => k !== CACHE).map(k => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ── FETCH ───────────────────────────────────────────────
self.addEventListener('fetch', e => {

  // Ignore non-GET requests (fixes your error)
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {

      const fetchPromise = fetch(e.request)
        .then(res => {

          // Only cache valid, same-origin responses
          if (
            res &&
            res.ok &&
            e.request.url.startsWith(self.location.origin)
          ) {
            const toCache = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, toCache));
          }

          return res;
        })
        .catch(() => caches.match('./index.html'));

      return cached || fetchPromise;
    })
  );
});

// ── MESSAGE (skip waiting trigger) ──────────────────────
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
