(this.webpackJsonpcxrili=this.webpackJsonpcxrili||[]).push([[0],[,,,,,,,,,,,,,,,function(t,e,n){},function(t,e,n){},,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);var i=n(1),a=n.n(i),r=n(9),c=n.n(r),s=(n(15),n(2)),o=n(3),l=n(6),h=n(5),u=n(4),f=(n(16),n(0)),p=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"render",value:function(){return Object(f.jsx)("button",{className:this.props.className?this.props.className+" ":"",children:this.props.children})}}]),n}(i.Component),b=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={isToggleOn:!1},i.handleClick=i.handleClick.bind(Object(l.a)(i)),i}return Object(o.a)(n,[{key:"handleClick",value:function(){this.props.onThemeSwitch(),this.setState((function(t){return{isToggleOn:!t.isToggleOn}}))}},{key:"render",value:function(){return Object(f.jsx)("button",{className:"nogrow",onClick:this.handleClick,children:this.state.isToggleOn?"\ud83c\udf19":"\ud83d\udd06"})}}]),n}(i.Component),d=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"render",value:function(){return Object(f.jsx)("button",{className:"home",children:"\u10ea\u10ee\u10e0\u10d8\u10da\u10d8"})}}]),n}(i.Component),j=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"handleClick",value:function(){alert("no alerts pls")}},{key:"render",value:function(){return Object(f.jsx)("button",{className:"nogrow",onClick:this.handleClick.bind(this),children:"\u24d8"})}}]),n}(i.Component),v=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return Object(f.jsxs)("div",{className:"nav-bar",children:[Object(f.jsx)(b,{onThemeSwitch:this.props.onThemeSwitch}),Object(f.jsx)(d,{}),Object(f.jsx)(p,{className:"nogrow",children:"\ud83c\udfe0"}),Object(f.jsx)(j,{})]})}}]),n}(i.Component),m=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"render",value:function(){var t=this;return Object(f.jsx)("button",{onClick:function(){return t.props.onClick(t.props.name)},className:this.props.className?this.props.className+" ":"",children:this.props.children})}}]),n}(i.Component),O=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"render",value:function(){var t=this;return Object(f.jsx)("div",{className:"nav-bar",children:[["mon","\u10dd\u10e0\u10e8"],["tue","\u10e1\u10d0\u10db"],["wed","\u10dd\u10d7\u10ee"],["thu","\u10ee\u10e3\u10d7"],["fri","\u10de\u10d0\u10e0"]].map((function(e){return Object(f.jsx)(m,{onClick:t.props.onDayChange,name:e[0],className:e[0]===t.props.currentDay?"active":"",children:e[1]},e)}))})}}]),n}(i.Component),k=n(8),g=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={left:"00:00",active:!1},i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var t=this;this.timerID=setInterval((function(){return t.tick()}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"tick",value:function(){var t=this,e=new Date,n="0:00",i=!1,a=60*e.getHours()+e.getMinutes()-5;if(a<=this.props.int_finish&&a>this.props.int_start){i=!0;var r=this.props.int_finish-a,c=String(Math.floor(r/60)).padStart(2,"0"),s=String(Math.floor(r%60)).padStart(2,"0"),o=String(60-e.getSeconds()).padStart(2,"0");n=c>0?"".concat(c,":").concat(s,":").concat(o):"".concat(s,":").concat(o)}this.setState((function(e){return t.props.changeActive(i),{left:n,active:i}}))}},{key:"render",value:function(){return Object(f.jsxs)("ul",{className:"block-timers",children:[this.props.showStartAndFinish&&Object(f.jsxs)("li",{className:"block-timer start",children:[" ",this.props.start," "]}),this.state.active&&Object(f.jsxs)("li",{className:"block-timer left",children:[" ",this.state.left," "]}),this.props.showStartAndFinish&&Object(f.jsxs)("li",{className:"block-timer finish",children:[" ",this.props.finish," "]})]})}}]),n}(i.Component),y=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={active:!1},i.changeActive=i.changeActive.bind(Object(l.a)(i)),i}return Object(o.a)(n,[{key:"changeActive",value:function(t){this.setState((function(e){return{active:t}}))}},{key:"render",value:function(){return Object(f.jsx)("li",{className:"short time-line-block"+("break"===this.props.name?" break":" class")+(this.state.active?" active":""),children:Object(f.jsxs)("div",{className:"class-description",children:["break"!==this.props.name&&Object(f.jsxs)("h2",{className:"class-name",children:[" ",this.props.name," "]}),Object(f.jsx)(g,{start:this.props.start,finish:this.props.finish,int_start:this.props.int_start,int_finish:this.props.int_finish,showStartAndFinish:"break"!==this.props.name,changeActive:this.changeActive})]})})}}]),n}(i.Component),w=function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={blocks:[],day:i.props.day},i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){var t=this;fetch("/cxrili/timetable/11 - \u10d2/".concat(this.state.day,".csv")).then((function(t){return t.text()})).then((function(e){for(var n=e.split(/[\r|\n]+/).map((function(t){return{name:t.split(",")[0],start:t.split(",")[1],finish:t.split(",")[2]}})),i=n.length,a=0;a<i-1;a++)n[a].finish!==n[a+1].start&&n.push({name:"break",start:n[a].finish,finish:n[a+1].start});n=(n=n.map((function(t){return Object(k.a)(Object(k.a)({},t),{},{int_start:60*parseInt(t.start.split(":")[0])+parseInt(t.start.split(":")[1]),int_finish:60*parseInt(t.finish.split(":")[0])+parseInt(t.finish.split(":")[1])})}))).sort((function(t,e){return t.int_start-e.int_start})),t.setState({blocks:n})}))}},{key:"render",value:function(){return Object(f.jsx)("ul",{className:"time-table-timeline"+(this.state.day===this.props.currentDay?"":" invisible"),children:this.state.blocks.map((function(t){return Object(f.jsx)(y,{name:t.name,start:t.start,finish:t.finish,int_start:t.int_start,int_finish:t.int_finish},t.name+t.start)}))})}}]),n}(i.Component),x=(n(18),n(19),n(20),function(t){Object(h.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(s.a)(this,n),(i=e.call(this,t)).state={colorTheme:"light-theme",currentDay:"mon"},i.switchTheme=i.switchTheme.bind(Object(l.a)(i)),i.changeDay=i.changeDay.bind(Object(l.a)(i)),i}return Object(o.a)(n,[{key:"switchTheme",value:function(){var t=this;this.setState((function(t){return{colorTheme:"dark-theme"===t.colorTheme?"light-theme":"dark-theme"}}),(function(){"dark-theme"===t.state.colorTheme?document.body.classList.add("dark-theme"):document.body.classList.remove("dark-theme")}))}},{key:"changeDay",value:function(t){console.log(t),this.setState((function(e){return{currentDay:t}}))}},{key:"render",value:function(){var t=this;return Object(f.jsxs)("div",{className:"App",children:[Object(f.jsx)(O,{onDayChange:this.changeDay,currentDay:this.state.currentDay}),[["mon","\u10dd\u10e0\u10e8"],["tue","\u10e1\u10d0\u10db"],["wed","\u10dd\u10d7\u10ee"],["thu","\u10ee\u10e3\u10d7"],["fri","\u10de\u10d0\u10e0"]].map((function(e){return Object(f.jsx)(w,{day:e[0],currentDay:t.state.currentDay},e[0]+e[1])})),Object(f.jsx)(v,{onThemeSwitch:this.switchTheme})]})}}]),n}(i.Component)),C=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function S(t,e){navigator.serviceWorker.register(t).then((function(t){t.onupdatefound=function(){var n=t.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),e&&e.onUpdate&&e.onUpdate(t)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(t)))})}})).catch((function(t){console.error("Error during service worker registration:",t)}))}c.a.render(Object(f.jsx)(a.a.StrictMode,{children:Object(f.jsx)(x,{})}),document.getElementById("root")),function(t){if("serviceWorker"in navigator){if(new URL("/cxrili",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/cxrili","/service-worker.js");C?(!function(t,e){fetch(t,{headers:{"Service-Worker":"script"}}).then((function(n){var i=n.headers.get("content-type");404===n.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then((function(t){t.unregister().then((function(){window.location.reload()}))})):S(t,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,t),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):S(e,t)}))}}()}],[[21,1,2]]]);
//# sourceMappingURL=main.49d989c5.chunk.js.map