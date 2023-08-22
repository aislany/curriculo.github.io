
const PRECACHE = 'precache-v1'
const RUNTIME = 'runtine';




const PRECACHE_URLS = [
    'index2.html',

];




self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
        .then(cache => cache.addAll(PRECACHE_URLS))
        .then(self.skipWaiting())

    );

});




self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTINE];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return cache.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())

    );

});




self.addEventListener('fetch', event => {
    if (event.request.method === "POST") {
    }
    else{
        if (event.request.url.startsWith(self.location.origin)){
            event.respondWith(
                caches.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        return cacheadResponse;

                    }


                    return caches.open(RUNTIME).then(cache => {
                        return fetch(event.request).then(cache => {
                            return cache.put(event.request, response.clone()).then(() => {
                                return response;

                            });

                        });

                    });




                })

            );

        }

    }

});