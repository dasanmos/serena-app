/* Service worker del lanzador de Serena (GitHub Pages).
 * Solo guarda la pantalla de inicio y los íconos para que la app se pueda instalar y abrir sin conexión.
 * Serena en sí (InfinityFree) NO pasa por aquí: el lanzador lleva a la persona al sitio real. */
const CACHE = 'serena-lanzador-v1';
const ARCHIVOS = ['./', './index.html', './manifest.webmanifest', './iconos/icon-192.png', './iconos/icon-512.png',
                  './iconos/icon-maskable-512.png', './iconos/logo.png', './iconos/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin || e.request.method !== 'GET') return; // nada de otros sitios
  if (e.request.mode === 'navigate') {
    // Primero la red (para recibir cambios); sin conexión, la copia guardada.
    e.respondWith(fetch(e.request).then((r) => {
      const copia = r.clone();
      caches.open(CACHE).then((c) => c.put('./index.html', copia));
      return r;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
