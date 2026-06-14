const CACHE = 'inglese-irene-v39';

const ASSETS = [
  './',
  './index.html',
  './TO-BE.html',
  './to-be-infografica.png',
  './to-be-overview.mp3',
  './TO-HAVE.html',
  './to-have-infografica.png',
  './to-have-overview.m4a',
  './pronomi-personali.html',
  './pronomi-personali-infografica.png',
  './pronomi-personali-overview.mp3',
  './articoli-plurali.html',
  './articoli-plurali-infografica.png',
  './articoli-plurali-overview.m4a',
  './present-simple.html',
  './present-simple-infografica.png',
  './present-simple-overview.m4a',
  './present-continuous.html',
  './present-continuous-overview.m4a',
  './present-continuous-infografica.png',
  './question-words.html',
  './there-is-there-are.html',
  './can-cant.html',
  './past-simple.html',
  './future.html',
  './some-any.html',
  './preposizioni.html',
  './comparativo-superlativo.html',
  './have-got.html',
  './this-that.html',
  './genitivo-possessivi.html',
  './avverbi-frequenza.html',
  './simple-vs-continuous.html',
  './like-love-hate.html',
  './imperativo.html',
  './preposizioni-movimento.html',
  './preposizioni-movimento-allenamento.html',
  './tutor-alex/index.html',
  './alert.js',
  './lightbox.js',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
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
