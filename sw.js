const CACHE='cen-exodus-wilderness-v1_29-bible-links';
const ASSETS=['./','./index.html','./style.css','./script.js','./manifest.webmanifest','./assets/exodus-wilderness-bg.png','./icons/icon-192.png','./icons/icon-512.png','./hubs/index.html','./hubs/js/app.js','./hubs/data/hubs.json','./hubs/style.css','./hubs/assets/maps/oppression-hub-map.png','./hubs/assets/maps/exodus-hub-map.png','./hubs/assets/maps/sinai-hub-map.png','./hubs/assets/maps/wilderness-hub-map.png','./hubs/assets/maps/moab-hub-map.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('cen-exodus-wilderness-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return r}).catch(()=>caches.match(e.request))));

/* 20260616-next-era-links */
