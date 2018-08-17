const CACHE_NAME = 'dvice-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/img/',
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  console.log('fetch received');
  var url = new URL(event.request.url);

  if (url.origin != location.origin) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(event.request)
            .then(response => response || fetch(event.request).then(resp => {
                cache.put(event.request, resp.clone());
                return resp;
              }));
    })
  );
});
