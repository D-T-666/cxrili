(this.webpackJsonpcxrili=this.webpackJsonpcxrili||[]).push([[0],{31:function(t,e,n){},32:function(t,e,n){},33:function(t,e,n){},34:function(t,e,n){},35:function(t,e,n){},46:function(t,e,n){},47:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),s=n(24),r=n.n(s),c=(n(31),n(32),n(33),n(34),n(35),n(2)),o=n(3),h=n(11),l=n(4),u=n(5),p=n(1),b=(i.Component,n(19)),d=n.n(b),f=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={isToggleOn:!1},i.handleClick=i.handleClick.bind(Object(h.a)(i)),i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var t=d.a.get("colorTheme");this.props.onThemeSwitch(t),this.setState({isToggleOn:"dark-theme"===t})}},{key:"handleClick",value:function(){var t=this;this.setState((function(e){var n=e.isToggleOn?"light-theme":"dark-theme";return t.props.onThemeSwitch(n),d.a.set("colorTheme",n),{isToggleOn:!e.isToggleOn}}))}},{key:"render",value:function(){return Object(p.jsx)("button",{className:"nogrow",onClick:this.handleClick,children:this.state.isToggleOn?"\ud83c\udf19":"\ud83d\udd06"})}}]),n}(i.Component),j=n(15),v=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"render",value:function(){return Object(p.jsx)(j.b,{to:"/cxrili/week",children:Object(p.jsx)("button",{className:"home",children:"\u10ea\u10ee\u10e0\u10d8\u10da\u10d8"})})}}]),n}(i.Component),m=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"handleClick",value:function(){alert("no alerts pls")}},{key:"render",value:function(){return Object(p.jsx)("button",{className:"nogrow",onClick:this.handleClick.bind(this),children:"\u24d8"})}}]),n}(i.Component),g=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("div",{className:"nav-bar",children:[Object(p.jsx)(f,{onThemeSwitch:this.props.onThemeSwitch}),Object(p.jsx)(v,{}),Object(p.jsx)(m,{})]})}}]),n}(i.Component),O=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"render",value:function(){var t=this;return Object(p.jsx)("button",{onClick:function(){return t.props.onClick(t.props.name)},className:this.props.className?this.props.className+" ":"",children:this.props.children})}}]),n}(i.Component),k=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={},i.dayNames=["\u10dd\u10e0\u10e8","\u10e1\u10d0\u10db","\u10dd\u10d7\u10ee","\u10ee\u10e3\u10d7","\u10de\u10d0\u10e0"],i}return Object(o.a)(n,[{key:"render",value:function(){var t=this;return Object(p.jsx)("div",{className:"nav-bar",children:this.dayNames.map((function(e,n){return Object(p.jsx)(O,{onClick:t.props.onDayChange,name:n,className:n===t.props.currentDay?"active":"",children:e},e)}))})}}]),n}(i.Component),y=n(22),x=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={left:"00:00",active:!1,previousPercentageThrough:0,timerStage:0},i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var t=this;if(this.props.shouldUpdate){var e=new Date,n=60*e.getHours()+e.getMinutes();this.props.int_finish-n>=0?(this.timerID=setInterval((function(){return t.tick()}),this.props.int_start-n<2?1e3:6e4),this.tick(),this.setState({timerStage:this.props.int_start-n<2?2:1})):this.tick()}}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"tick",value:function(){var t=this,e=new Date,n="0:00",i=!1,a=0,s=60*e.getHours()+e.getMinutes();if(this.props.int_start-s<2&&1===this.state.timerStage&&(clearInterval(this.timerID),this.timerID=setInterval(this.tick,1e3),this.setState({timerStage:2})),s>=this.props.int_start)if((a=(s-this.props.int_start+e.getSeconds()/60)/(this.props.int_finish-this.props.int_start))>=1&&(a=1),s<this.props.int_finish){i=!0;var r=this.props.int_finish-s,c=String(Math.floor(r/60)).padStart(2,"0"),o=String(Math.floor(r%60-1)).padStart(2,"0"),h=String(60-e.getSeconds()).padStart(2,"0");n=c>0?"".concat(c,":").concat(o,":").concat(h):"".concat(o,":").concat(h),this.props.updatePercentageThrough(a)}else clearInterval(this.timerID),this.setState({timerStage:2}),a!==this.state.previousPercentageThrough&&this.props.updatePercentageThrough(1);this.setState((function(e){return t.props.changeActive(i),{left:n,active:i,previousPercentageThrough:a}}))}},{key:"render",value:function(){return Object(p.jsxs)("ul",{className:"block-timers",children:[this.props.showStartAndFinish&&Object(p.jsxs)("li",{className:"block-timer start",children:[" ",this.props.start," "]}),this.state.active&&Object(p.jsxs)("li",{className:"block-timer left",children:[" ",this.state.left," "]}),this.props.showStartAndFinish&&Object(p.jsxs)("li",{className:"block-timer finish",children:[" ",this.props.finish," "]})]})}}]),n}(i.Component),w=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={active:!1,percentageThrough:0},i.changeActive=i.changeActive.bind(Object(h.a)(i)),i.updatePercentageThrough=i.updatePercentageThrough.bind(Object(h.a)(i)),i}return Object(o.a)(n,[{key:"changeActive",value:function(t){var e=this;this.setState((function(n){return{active:t&&e.props.isToday}}))}},{key:"updatePercentageThrough",value:function(t){this.setState((function(e){return{percentageThrough:t}}))}},{key:"render",value:function(){return Object(p.jsxs)("li",{className:"short time-line-block"+("break"===this.props.name?" break":" class")+(this.state.active?" active":""),children:[this.state.percentageThrough>0&&Object(p.jsx)("div",{className:"time-line",style:{height:"".concat(100*this.state.percentageThrough,"%")}}),Object(p.jsxs)("div",{className:"class-description",children:["break"!==this.props.name&&Object(p.jsxs)("h2",{className:"class-name",children:[" ",this.props.name," "]}),Object(p.jsx)(x,{start:this.props.start,finish:this.props.finish,int_start:this.props.int_start,int_finish:this.props.int_finish,showStartAndFinish:"break"!==this.props.name,shouldUpdate:this.props.isToday,changeActive:this.changeActive,updatePercentageThrough:this.updatePercentageThrough})]})]})}}]),n}(i.Component),T=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={tables:[],day:i.props.day},i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){var t=this;fetch("timetable/11g.json").then((function(t){return t.json()})).then((function(e){t.setState({tables:e.tables.map((function(t){for(var e=t.split(/[\r|\n]+/).map((function(t){return{name:t.split(",")[0],start:t.split(",")[1],finish:t.split(",")[2]}})),n=e.length,i=0;i<n-1;i++)e[i].finish!==e[i+1].start&&e.push({name:"break",start:e[i].finish,finish:e[i+1].start});return e=e.map((function(t){return Object(y.a)(Object(y.a)({},t),{},{int_start:60*parseInt(t.start.split(":")[0])+parseInt(t.start.split(":")[1]),int_finish:60*parseInt(t.finish.split(":")[0])+parseInt(t.finish.split(":")[1])})})),console.log(),e.sort((function(t,e){return t.int_start-e.int_start}))}))})}))}},{key:"render",value:function(){var t=this;return Object(p.jsx)("ul",{className:"time-table-timeline content-box",children:this.state.tables.length>0&&this.state.tables[this.props.day].map((function(e,n){return Object(p.jsx)(w,{name:e.name,start:e.start,finish:e.finish,int_start:e.int_start,int_finish:e.int_finish,isToday:t.props.today===t.props.day},n)}))})}}]),n}(i.Component),S=(n(46),function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={},i}return Object(o.a)(n,[{key:"render",value:function(){return Object(p.jsxs)("li",{className:"day-table-block",children:[Object(p.jsx)("h1",{className:"title",children:this.props.name}),Object(p.jsx)("ul",{children:this.props.table.map((function(t,e){return Object(p.jsx)("li",{children:t})}))})]})}}]),n}(i.Component)),D=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;return Object(c.a)(this,n),(i=e.call(this,t)).state={tables:[],day:i.props.day},i.weekdays=["\u10dd\u10e0\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8","\u10e1\u10d0\u10db\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8","\u10dd\u10d7\u10ee\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8","\u10ee\u10e3\u10d7\u10e8\u10d0\u10d1\u10d0\u10d7\u10d8","\u10de\u10d0\u10e0\u10d0\u10e1\u10d9\u10d4\u10d5\u10d8"],i}return Object(o.a)(n,[{key:"componentDidMount",value:function(){this.fetchData()}},{key:"fetchData",value:function(){var t=this;fetch("timetable/11g.json").then((function(t){return t.json()})).then((function(e){t.setState({tables:e.tables.map((function(t){return t.split(/[\r|\n]+/).map((function(t){return t.split(",")[0]})).sort((function(t,e){return t.int_start-e.int_start}))}))}),console.log(t.state.tables)}))}},{key:"render",value:function(){var t=this;return Object(p.jsx)("ul",{className:"week-table content-box",children:this.state.tables.map((function(e,n){return Object(p.jsx)(S,{name:t.weekdays[n],table:e,isToday:t.props.today===n},n)}))})}}]),n}(i.Component),C=n(6),N=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var i;Object(c.a)(this,n),i=e.call(this,t);var a=(new Date).getDay();return i.state={colorTheme:"light-theme",currentDay:a<1||a>5?0:a-1,today:!(a<1||a>5)&&a-1},i.switchTheme=i.switchTheme.bind(Object(h.a)(i)),i.changeDay=i.changeDay.bind(Object(h.a)(i)),i}return Object(o.a)(n,[{key:"switchTheme",value:function(t){console.log(t),this.setState((function(e){return document.body.classList.remove(e.colorTheme),document.body.classList.add(t),{colorTheme:t}}))}},{key:"changeDay",value:function(t){this.setState({currentDay:t})}},{key:"render",value:function(){return Object(p.jsx)(j.a,{children:Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)(k,{onDayChange:this.changeDay,currentDay:this.state.currentDay}),Object(p.jsxs)(C.c,{children:[Object(p.jsx)(C.a,{path:"/cxrili/day",children:Object(p.jsx)(T,{day:this.state.currentDay,today:this.state.today})}),Object(p.jsx)(C.a,{path:"/cxrili/week",children:Object(p.jsx)(D,{today:this.state.today})})]}),Object(p.jsx)(g,{onThemeSwitch:this.switchTheme})]})})}}]),n}(i.Component),_=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function I(t,e){navigator.serviceWorker.register(t).then((function(t){t.onupdatefound=function(){var n=t.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),e&&e.onUpdate&&e.onUpdate(t)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(t)))})}})).catch((function(t){console.error("Error during service worker registration:",t)}))}r.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(N,{})}),document.getElementById("root")),function(t){if("serviceWorker"in navigator){if(new URL("/cxrili",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/cxrili","/service-worker.js");_?(!function(t,e){fetch(t,{headers:{"Service-Worker":"script"}}).then((function(n){var i=n.headers.get("content-type");404===n.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then((function(t){t.unregister().then((function(){window.location.reload()}))})):I(t,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,t),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):I(e,t)}))}}()}},[[47,1,2]]]);
//# sourceMappingURL=main.ff552c58.chunk.js.map