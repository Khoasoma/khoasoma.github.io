// Service Worker for PWA functionality
const CACHE_NAME = 'liquid-portfolio-v3.0-optimized';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/liquid-style.css',
    '/assets/liquid-main.js',
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
