// service-worker.ts
/// <reference lib="webworker" />

const CACHE_NAME = 'beerlist-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
];
/* eslint-disable-next-line no-restricted-globals */
const selfInstance: ServiceWorkerGlobalScope = self as any;

selfInstance.addEventListener('install', (event: ExtendableEvent) => {
  const extendableEvent = event as ExtendableEvent & { waitUntil: (promise: Promise<any>) => void };
  extendableEvent.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

selfInstance.addEventListener('fetch', (event: ExtendableEvent) => {
  if (event instanceof FetchEvent) {
    const fetchEvent = event as FetchEvent & { respondWith: (response: Response | Promise<Response>) => void };
    fetchEvent.respondWith(
      caches.match(fetchEvent.request)
        .then((response) => response || fetch(fetchEvent.request))
    );
  }
});

// Function to register the service worker
export const register = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
};
