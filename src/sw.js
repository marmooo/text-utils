var CACHE_NAME = "2023-07-12 10:15";
var urlsToCache = [
  "/text-utils/",
  "/text-utils/index.js",
  "/text-utils/favicon/favicon.svg",
  // "/text-utils/hiraroma.js",
  // "/text-utils/wordsninja.js",
  // "https://cdn.jsdelivr.net/npm/@geolonia/japanese-numeral@0.1.16/+esm",
  // "https://cdn.jsdelivr.net/npm/sprintf-js@1.1.2/src/sprintf.min.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache);
      }),
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }),
  );
});

self.addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
