const CACHE_NAME = 'haq-market-cache-v1';
const urlsToCache = [
  'index.html',
  'cart.html',
  'checkout.html',
  'product.html',
  'profile.html',
  'about.html',
  'categories.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'styles.css',
  'script.js',
  // Add product category pages if needed
  'electronics.html',
  'books.html',
  'fashion.html',
  'design.html',
  'groceries.html',
  'home-appliances.html',
  'gaming.html',
  'health.html',
  'furniture.html',
  'toys.html'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Activate event (for future cache cleanup)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});