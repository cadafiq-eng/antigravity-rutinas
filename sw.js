const CACHE_NAME = 'antigravity-v6';
const APP_SHELL = [
  './',
  './index.html',
  './app-rutinas-v3.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './assets/exercises-web/walk-cycle.jpg',
  './assets/exercises-web/pelvic-tilt.jpg',
  './assets/exercises-web/bridge-male-v2.jpg',
  './assets/exercises-web/leg-raise.jpg',
  './assets/exercises-web/open-book-male-v2.jpg',
  './assets/exercises-web/cobra-child.jpg',
  './assets/exercises-web/glute-stretch.jpg',
  './assets/exercises-web/neck-stretch-male-v2.jpg',
  './assets/exercises-web/wrist-stretch-v2.jpg',
  './assets/exercises-web/hip-mobility.jpg',
  './assets/exercises-web/supported-squat-male-v2.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isVideo = url.pathname.includes('/Videos/') ||
    url.hostname === 'drive.google.com';

  if (isVideo) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match('./app-rutinas-v3.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (url.origin === self.location.origin && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
