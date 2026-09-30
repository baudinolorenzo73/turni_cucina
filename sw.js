/* Cache isolata per app e percorso, aggiornamenti sicuri e ripiego offline. */
const VERSIONE = "turni-v4";
const PREFISSO = "generatore-turni:" + self.registration.scope + ":";
const CACHE = PREFISSO + VERSIONE;
const INDEX = new URL("index.html", self.registration.scope).href;
const VERSION_URL = new URL("version.json", self.registration.scope).href;
const FILE = ["./", "./index.html", "./version.json", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-192.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png", "./icons/favicon-32.png"];
self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILE)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFISSO)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("message",e=>{if(e.data==="SKIP_WAITING")self.skipWaiting();});
self.addEventListener("fetch",e=>{
  const req=e.request,url=new URL(req.url),scope=new URL(self.registration.scope);
  if(req.method!=="GET"||url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
  if(url.pathname.endsWith("/version.json")){
    e.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      try{
        const res=await fetch(req,{cache:"no-store"});
        if(res.ok)e.waitUntil(cache.put(VERSION_URL,res.clone()));
        return res;
      }catch(err){return (await cache.match(VERSION_URL))||Response.error();}
    })());return;
  }
  if(req.mode==="navigate"){
    e.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      try{
        const res=await fetch(req);
        if(res.ok && [scope.pathname,scope.pathname+"index.html"].includes(url.pathname)){
          e.waitUntil(cache.put(INDEX,res.clone()));return res;
        }
        return (await cache.match(INDEX))||res;
      }catch(err){return (await cache.match(INDEX))||Response.error();}
    })());return;
  }
  e.respondWith((async()=>{
    const cache=await caches.open(CACHE),hit=await cache.match(req);if(hit)return hit;
    const res=await fetch(req);if(res.ok)e.waitUntil(cache.put(req,res.clone()));return res;
  })());
});
