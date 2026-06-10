const C='axar-v5';
const F=['./index.html','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(Promise.all([clients.claim(),caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k))))]))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>{if(r)return r;return fetch(e.request).then(res=>{if(!res||res.status!==200||res.type!=='basic')return res;caches.open(C).then(c=>c.put(e.request,res.clone()));return res;}).catch(()=>caches.match('./index.html'));}));});