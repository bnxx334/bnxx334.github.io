const CACHE_NAME = 'portfolio-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './mobile-menu.js',
    './Asset/IMG_0853.JPG.jpeg',
    './Asset/Resume_Banyu_Handika_TJKT.pdf'
];

// Install Service Worker & Cache Assets
self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Network first, fallback to cache
self.addEventListener('fetch', (e) => {
    if (e.request.method !== 'GET') return;
    e.respondWith(
        fetch(e.request)
            .then((response) => {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
                return response;
            })
            .catch(() => caches.match(e.request))
    );
});

// Update Cache on Activate
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        }).then(() => self.clients.claim())
    );
});