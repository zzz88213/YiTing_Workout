const CACHE_NAME = 'workout-tracker-v2.0';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon.png'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求，優先使用快取，達到離線運作功能
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果在快取中找到匹配的資源，就回傳快取；否則透過網路請求
        return response || fetch(event.request);
      })
  );
});
