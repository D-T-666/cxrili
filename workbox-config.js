module.exports = {
	globDirectory: "build/",
	globPatterns: ["**/*.{json,ico,ttf,png,jpg,html,txt,js,css,csv}"],
	swDest: "build/service-worker.js",
	runtimeCaching: [
		{
			urlPattern: /https:\/\/d-t-666\.github\.io\/cxrili/,
			handler: "NetworkFirst",
		},
	],
};
