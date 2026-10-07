/**
 * Service Worker para Antigravity Rutinas PWA
 * - Soporte 100% Offline para GitHub Pages, Vercel y Servidores Locales
 * - Pre-cacheo del App Shell (HTML, CSS, JS, Iconos)
 * - Cache dinámico para Infografías e Imágenes
 */

const CACHE_NAME = 'antigravity-rutinas-v1.1';

const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data/exercises-data.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './assets/infografias/rutina-fullbody-casa.png',
  './assets/infografias/rutina-fullbody-fuerza.png',
  './assets/infografias/rutina-terapeutica-inferior.png',
  './assets/infografias/rutina-terapeutica-superior-ligas.png',
  './assets/infografias/rutina-terapeutica-superior-sinligas.png',
  './assets/infografias/rutina-terapeutica-cuerpocompleto.png',
  './assets/exercises-web/supported-squat-male-v2.jpg',
  './assets/exercises-web/walk-cycle.jpg',
  './assets/exercises-web/bridge-male-v2.jpg',
  './assets/exercises-web/pelvic-tilt.jpg',
  './assets/exercises-web/open-book-male-v2.jpg',
  './assets/exercises-web/neck-stretch-male-v2.jpg',
  './assets/exercises-web/wrist-stretch-v2.jpg',
  './assets/exercises-web/cobra-child.jpg',
  './assets/exercises-web/glute-stretch.jpg',
  './assets/exercises-web/leg-raise.jpg',
  './assets/exercises-web/hip-mobility.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-cacheando App Shell y recursos esenciales...');
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Ignorar peticiones a videos pesados de Google Drive para no saturar cache de almacenamiento
  if (url.hostname.includes('drive.google.com') || url.pathname.includes('.mp4')) {
    event.respondWith(fetch(request));
    return;
  }

  // Estrategia Cache First con fallback a Network y actualización en segundo plano
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        // En segundo plano revalidar si hay conexión
        fetch(request).then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse));
          }
        }).catch(() => {/* Offline silencioso */});

        return cachedResponse;
      }

      // Si no está en caché, buscar en red y guardar
      return fetch(request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Fallback para navegación de página
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
