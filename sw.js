// install service worker
self.addEventListener('install', (event) => {
  console.log('Service worker has been installed');
});

// activate service worker
self.addEventListener('activate', (event) => {
  console.log('Service worker has been activated');
});

// Fetch event
self.addEventListener('fetch', event => {
  // Intercept fetch events when browser tries to go out to the server and
  // tries to retrieve resources.
  console.log('fetch event', event);
  // if (event.request.url.indexOf('firestore.googleapis.com') === -1) {
  //   event.respondWith(
  //     caches
  //       .match(event.request)
  //       .then(cacheRes => {
  //         return (
  //           cacheRes ||
  //           fetch(event.request).then(fetchRes => {
  //             return caches.open(dynamicCacheName).then(cache => {
  //               cache.put(event.request.url, fetchRes.clone());
  //               limitCacheSize(dynamicCacheName, 15);
  //               return fetchRes;
  //             });
  //           })
  //         );
  //       })
  //       .catch(() => {
  //         if (event.request.url.indexOf('.html') > -1) {
  //           return caches.match('/pages/fallback.html');
  //         }
  //       })
  //   );
  // }
});