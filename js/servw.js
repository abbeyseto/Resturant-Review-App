var staticCacheName = 'RestRevApp1';


self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/css/styles.css',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/data/restaurants.json',
                '/index.html',
                '/restaurant.html',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                'https://abbeyseto.github.io/Resturant-Review-App/data/restaurants.json'
            ]);
        }).then(console.log('Yay... cache is sucessful'))
    );
});



self.addEventListener('fetch', function (event) {

    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                console.log('Found', event.request, 'in cache');
                return response;
            })
            .catch(function (response) {
                console.log('Cound not find', event.request, 'in cache, Fetching ...');
                return fetch(event.request)
            })
            .then(function (response) {
                const clonedResponse = response.clone();
                caches.open(staticCacheName).then(function (cache) {
                    cache.put(event.request, clonedResponse);
                })
                return response;
            })
    )
});
