const FILES_TO_CACHE = [
	'/',
	'/index.html',
	'/styles.css',
	'index.js',
	'db.js',
	'/icons/icon-192x192.png',
	'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
	'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
];

const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(PRECACHE)
			.then(cache => cache.addAll(FILES_TO_CACHE))
			.then(self.skipWaiting())
	);
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
	const currentCaches = [PRECACHE, RUNTIME];
	event.waitUntil(
		caches
			.keys()
			.then(cacheNames => {
				return cacheNames.filter(
					cacheName => !currentCaches.includes(cacheName)
				);
			})
			.then(cachesToDelete => {
				return Promise.all(
					cachesToDelete.map(cacheToDelete => {
						return caches.delete(cacheToDelete);
					})
				);
			})
			.then(() => self.clients.claim())
	);
});

/** When the client triggers a fetch, intercept that request to serve cached data first and if necessary, fallback to network data. */
self.addEventListener('fetch', event => {
	// Cache successful requests to the API
	if (event.request.url.includes('/api/')) {
		event.respondWith(
			caches
				.open(RUNTIME)
				.then(async cache => {
					try {
						const response = await fetch(event.request);
						// If the response was good, clone it and store it in the cache.
						if (response.status === 200) {
							cache.put(event.request.url, response.clone());
						}
						return response;
					} catch (err) {
						return await cache.match(event.request);
					}
				})
				.catch(err => console.log(err))
		);

		// Halt the execution of the fetch event callback.
		return;
	}

	// If the request is not for the API, serve static assets using "offline-first" approach.
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});
