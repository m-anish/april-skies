const CACHE = 'april-skies-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sketches.js',
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
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(networkResponse => {
        caches.open(CACHE).then(cache => {
          cache.put(e.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(() => {
        // Fallback for offline if not in cache (e.g., initial load failure)
        return caches.match('./index.html');
      });

      // Serve from cache immediately if available, but fetch in background to update
      return cached || fetchPromise;
    })
  );
});
