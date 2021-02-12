const staticCacheName = 'site-static-v.1.15.0.2';
const assets = [
	'/',
	'/cxrili/',
	'/cxrili/?d=mon',
	'/cxrili/?d=tue',
	'/cxrili/?d=wed',
	'/cxrili/?d=thu',
	'/cxrili/?d=fri',
	'/cxrili/index.html',
	'/cxrili/css/root.css',
	'/cxrili/css/style.css',
	'/cxrili/css/buttons.css',
	'https://d-t-666.github.io/time-table/fonts/bpg_glaho_sylfaen.ttf',
	'/cxrili/js/app.js',
	'/cxrili/js/script.js',
	'/cxrili/js/buttons.js',
	'/cxrili/js/createBreakEllement.js',
	'/cxrili/js/createClassEllement.js',
	'/cxrili/js/loadTimeTabel.js',
	'/cxrili/js/buildTabel.js',
	'/cxrili/js/updateTimers.js',
	'/cxrili/js/getCurrentDay.js',
	'/cxrili/timetabel/mon.csv',
	'/cxrili/timetabel/tue.csv',
	'/cxrili/timetabel/wed.csv',
	'/cxrili/timetabel/thu.csv',
	'/cxrili/timetabel/fri.csv',
	'/cxrili/icons/32x32.png',
	'/cxrili/icons/48x48.png',
	'/cxrili/icons/64x64.png',
	'/cxrili/icons/96x96.png',
	'/cxrili/icons/128x128.png',
	'/cxrili/icons/160x160.png',
	'/cxrili/icons/512x512.png',
	'/cxrili/favicon.ico',
	'/cxrili/manifest.json',

	'/cxrili/pages/weekview/',
	'/cxrili/pages/weekview/index.html',
	'/cxrili/pages/weekview/css/style.css',
	'/cxrili/pages/weekview/js/script.js'
];

self.addEventListener('install', evt => {
	evt.waitUntil(
		caches.open(staticCacheName).then(cache => {
			console.log('caching shell assets');
			cache.addAll(assets);
		})
	)
});

self.addEventListener('activate', evt => {
	evt.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key != staticCacheName)
				.map(key => caches.delete(key))
			)
		})
	)
});

self.addEventListener('fetch', evt => {
	evt.respondWith(
		caches.match(evt.request).then(cacheRes => {
			if (cacheRes != undefined)
				return cacheRes
			else
				return fetch(evt.request)
		})
	)
})