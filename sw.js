// Shell resource
const staticCacheName = 'site-static-v7';
const dynamicCacheName = 'site-dynamic-v7';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/css/styles.css',
  '/img/ingot.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
  'https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  '/pages/fallback.html',
];

// Cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install service worker
self.addEventListener('install', (event) => {
  console.log('Service worker has been installed');
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
      console.log(assets);
    })
  );
});
// activate service worker
self.addEventListener('activate', (event) => {
  // console.log('Service worker has been activated');
  event.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys); // keys are the cache names
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Intercept fetch events when browser tries to go out to the server and
  // tries to retrieve resources.
  // event.respondWith(
  //   caches
  //     .match(event.request)
  //     .then((cacheRes) => {
  //       return (
  //         cacheRes ||
  //         fetch(event.request).then((fetchRes) => {
  //           return caches.open(dynamicCacheName).then((cache) => {
  //             cache.put(event.request.url, fetchRes.clone());
  //             limitCacheSize(dynamicCacheName, 15);
  //             return fetchRes;
  //           });
  //         })
  //       );
  //     })
  //     .catch(() => {
  //       // checks to see if the html string is in the url
  //       if (event.request.url.indexOf('.html') > -1) {
  //         return caches.match('/pages/fallback.html');
  //       }
  //     })
  // );
  // console.log('fetch event', event);
  if (event.request.url.indexOf('firestore.googleapis.com') === -1) {
    event.respondWith(
      caches
        .match(event.request)
        .then((cacheRes) => {
          return (
            cacheRes ||
            fetch(event.request).then((fetchRes) => {
              return caches.open(dynamicCacheName).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(dynamicCacheName, 15);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (event.request.url.indexOf('.html') > -1) {
            return caches.match('/pages/fallback.html');
          }
        })
    );
  }
});
