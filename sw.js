const CACHE = 'clear-skies-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sketches.js',
  './constellations.js',
  './quotes.js',
  './objects-db.js',
  './log.js',
  './log-ui.js',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => caches.match('./index.html'));
      return cached || fetchPromise;
    })
  );
});

// ── UPDATE: allow app.js to trigger skipWaiting via postMessage ─────────────
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
