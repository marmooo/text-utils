const CACHE_NAME="2024-02-25 09:42",urlsToCache=["/text-utils/","/text-utils/index.js","/text-utils/favicon/favicon.svg","https://cdn.jsdelivr.net/npm/hiraroma/+esm"];self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(e=>e.addAll(urlsToCache)))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>t||fetch(e.request)))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(e=>Promise.all(e.filter(e=>e!==CACHE_NAME).map(e=>caches.delete(e)))))})