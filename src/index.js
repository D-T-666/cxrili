import React from "react";
import ReactDOM from "react-dom";
import "css/index.css";
import "css/App.css";
import "css/main.css";
import "css/style.css";
import "css/root.css";
import App from "./components/App.jsx";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();