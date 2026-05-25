const CACHE_NAME = 'devdeck-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if found
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network
        return fetch(event.request).then(networkResponse => {
          // Don't cache bad responses or non-http protocols (like chrome-extension://)
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' || !event.request.url.startsWith('http')) {
            return networkResponse;
          }

          // Cache the successful network response for future offline use
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        }).catch(() => {
          // If offline and request fails, try to return the cached root
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});
