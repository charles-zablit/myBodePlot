function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('sw.js', { scope: '/' }).then(() => {
					console.log('Service Worker registered successfully.');
			}).catch(error => {
					console.log('Service Worker registration failed:', error);
			});
	}
}

registerServiceWorker();

self.addEventListener('install', event => {
	event.waitUntil(
			caches.open('v1').then(cache => {
					return cache.addAll([
							'/',
							'sw.js',
							'static/js/app.js'
					]);
			})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
			fetch(event.request).catch(() => {
					return caches.match(event.request).then(response => {
							if (response) {
									return response;
							}
					});
			})
	);
});

self.addEventListener('activate', event => {
	var cacheWhitelist = ['v1'];
	event.waitUntil(
			caches.keys().then(keyList => {
					return Promise.all(keyList.map(key => {
							if (cacheWhitelist.indexOf(key) === -1) {
									return caches.delete(key);
							}
					}));
			})
	);
});