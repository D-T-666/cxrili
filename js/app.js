if('serviceWorker' in navigator){
	navigator.serviceWorker.register('/cxrili/sw.js')
		.then((reg) => console.log('service worker registered', reg))
		.catch((err) => console.log('service worker could not be registered', err))
}