const CACHE = 'inglese-irene-v1';

const ASSETS = [
  './',
  './index.html',
  './TO-BE.html',
  './TO-HAVE.html',
  './pronomi-personali.html',
  './articoli-plurali.html',
  './present-simple.html',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg',
];

// Installazione: pre-carica tutte le pagine locali
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Attivazione: elimina le cache vecchie
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first per i font Google, stale-while-revalidate per tutto il resto
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Font Google: cache-first (raramente cambiano)
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          const network = fetch(e.request).then(res => {
            cache.put(e.request, res.clone());
            return res;
          });
          return cached || network;
        })
      )
    );
    return;
  }

  // Pagine e risorse locali: stale-while-revalidate
  // → risponde subito dalla cache, aggiorna in background
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          const network = fetch(e.request).then(res => {
            cache.put(e.request, res.clone());
            return res;
          }).catch(() => {});
          return cached || network;
        })
      )
    );
  }
});
