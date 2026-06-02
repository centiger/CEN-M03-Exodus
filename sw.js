const CACHE='cen-exodus-wilderness-v1';
const ASSETS=['./','./index.html','./style.css','./script.js','./manifest.webmanifest','./assets/exodus-wilderness-bg.png','./icons/icon-192.png','./icons/icon-512.png','./hubs/index.html','./hubs/js/app.js','./hubs/data/hubs.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{})));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
