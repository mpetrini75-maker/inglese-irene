const CACHE = 'inglese-irene-v54';

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
  './past-simple-overview.mp3',
  './past-simple-infografica.png',
  './future-overview.mp3',
  './future-infografica.png',
  './comparativo-superlativo-overview.mp3',
  './comparativo-superlativo-infografica.png',
  './some-any-overview.mp3',
  './some-any-infografica.png',
  './there-is-there-are-overview.mp3',
  './there-is-there-are-infografica.png',
  './question-words-overview.mp3',
  './question-words-infografica.png',
  './have-got-overview.mp3',
  './have-got-infografica.png',
  './can-cant-overview.mp3',
  './can-cant-infografica.png',
  './must-have-to-overview.mp3',
  './must-have-to-infografica.png',
  './should-overview.mp3',
  './should-infografica.png',
  './past-continuous-overview.mp3',
  './past-continuous-infografica.png',
  './genitivo-possessivi-overview.mp3',
  './genitivo-possessivi-infografica.png',
  './preposizioni-overview.mp3',
  './preposizioni-infografica.png',
  './avverbi-frequenza-overview.mp3',
  './avverbi-frequenza-infografica.png',
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
  './past-continuous.html',
  './past-continuous-allenamento.html',
  './past-simple-vs-continuous.html',
  './past-simple-vs-continuous-allenamento.html',
  './must-have-to.html',
  './must-have-to-allenamento.html',
  './should.html',
  './should-allenamento.html',
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

  // Pagine HTML: network-first → prende sempre l'ultima versione se online,
  // ricade sulla cache solo offline. Evita di servire codice vecchio.
  const isHTML = e.request.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith("/");
  if (url.origin === self.location.origin && isHTML) {
    e.respondWith(
      caches.open(CACHE).then(cache =>
        fetch(e.request).then(res => {
          cache.put(e.request, res.clone());
          return res;
        }).catch(() => cache.match(e.request))
      )
    );
    return;
  }

  // Altre risorse locali (immagini, audio, js): stale-while-revalidate
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
