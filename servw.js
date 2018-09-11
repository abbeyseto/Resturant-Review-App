var staticCacheName = 'RestRevApp1';


self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/Resturant-Review-App/',
                '/Resturant-Review-App/js/dbhelper.js',
                '/Resturant-Review-App/js/main.js',
                '/Resturant-Review-App/js/restaurant_info.js',
                '/Resturant-Review-App/css/styles.css',
                '/Resturant-Review-App/img/1.jpg',
                '/Resturant-Review-App/img/2.jpg',
                '/Resturant-Review-App/img/3.jpg',
                '/Resturant-Review-App/img/4.jpg',
                '/Resturant-Review-App/img/5.jpg',
                '/Resturant-Review-App/img/6.jpg',
                '/Resturant-Review-App/img/7.jpg',
                '/Resturant-Review-App/img/8.jpg',
                '/Resturant-Review-App/img/9.jpg',
                '/Resturant-Review-App/img/10.jpg',
                '/Resturant-Review-App/img/food.png',
                '/Resturant-Review-App/img/Icon-96.png',
                '/Resturant-Review-App/img/Icon-192.png',
                '/Resturant-Review-App/img/Icon-512.png',
                '/Resturant-Review-App/data/restaurants.json',
                '/Resturant-Review-App/index.html',
                '/Resturant-Review-App/restaurant.html',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                'https://abbeyseto.github.io/Resturant-Review-App/data/restaurants.json'
            ]);
        }).then(console.log('Yay... cache is sucessful'))
    );
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('Rest') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


// self.addEventListener('fetch', function (event) {

//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {
//                 console.log('Found', event.request, 'in cache');
//                 return response;
//             })
//             .catch(function (response) {
//                 console.log('Cound not find', event.request, 'in cache, Fetching ...');
//                 return fetch(event.request)
//             })
//             .then(function (response) {
//                 const clonedResponse = response.clone();
//                 caches.open(staticCacheName).then(function (cache) {
//                     cache.put(event.request, clonedResponse);
//                 })
//                 return response;
//             })
//     )
// });

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
return response || fetch(event.request);
    })
  );
  });
