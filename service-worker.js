if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return n[e]||(i=new Promise((async i=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},i=(i,n)=>{Promise.all(i.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(i)};self.define=(i,c,a)=>{n[i]||(n[i]=Promise.resolve().then((()=>{let n={};const r={uri:location.origin+i.slice(1)};return Promise.all(c.map((i=>{switch(i){case"exports":return n;case"module":return r;default:return e(i)}}))).then((e=>{const i=a(...e);return n.default||(n.default=i),n}))})))}}define("./service-worker.js",["./workbox-d8fabd81"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"9130f0969edd1f9aa26eeeec38dc4114"},{url:"android-chrome-512x512.png",revision:"3dc2ad291db4d5b7038fb80ffadb0d62"},{url:"apple-touch-icon.png",revision:"99b67cec9afba75fa70f3a48359e1ff5"},{url:"asset-manifest.json",revision:"550c44334ba93d38f75e341d52d316db"},{url:"favicon-16x16.png",revision:"c96d5f33ad3a5bc810f6404842a0ead3"},{url:"favicon-32x32.png",revision:"210d3957b8ad94554876623a8baba39f"},{url:"favicon.ico",revision:"3124e0a9e8dfa4ad8f19b5b80c19ea11"},{url:"fonts/bpg_glaho_sylfaen.ttf",revision:"f467dcd29bd71b09e6c7f6eef54ce9bc"},{url:"fonts/SourceCodePro-Medium.ttf",revision:"f621c504d70317ff13774e27d643ba21"},{url:"icons/android-icon-144x144.png",revision:"a014e96d8b7a50e224459cecb9dbbf27"},{url:"icons/android-icon-192x192.png",revision:"44d2ff00218ef0b6c692a30191ccf4f7"},{url:"icons/android-icon-36x36.png",revision:"a046e5255c3afdbf0c429bf8bd81373e"},{url:"icons/android-icon-48x48.png",revision:"cda5e5972961ad71469b6023f24d8245"},{url:"icons/android-icon-72x72.png",revision:"8763a91fb1fde442da47fdc1795a9a56"},{url:"icons/android-icon-96x96.png",revision:"4e3a511036e6ebe79ee8f928df73d330"},{url:"icons/apple-icon-114x114.png",revision:"8b6b090651fd7054b06f0634e2d1037f"},{url:"icons/apple-icon-120x120.png",revision:"7aa21aac2bddb53044e5d69d791c7569"},{url:"icons/apple-icon-152x152.png",revision:"78335585697a63c0e91695c92e226059"},{url:"icons/apple-icon-180x180.png",revision:"2f51227f0aad4025bc5283ea4e119dd8"},{url:"icons/apple-icon-57x57.png",revision:"11b7e0b815c8607b939c0dac977db2b1"},{url:"icons/apple-icon-60x60.png",revision:"8df1923833d9fdac5015842b6b12650b"},{url:"icons/apple-icon-72x72.png",revision:"8763a91fb1fde442da47fdc1795a9a56"},{url:"icons/apple-icon-76x76.png",revision:"0fb38c7e79582bfad16adfa987ed4cc7"},{url:"icons/apple-icon-precomposed.png",revision:"ab57a1f069ea1a453c11c34fc9237671"},{url:"icons/apple-icon.png",revision:"ab57a1f069ea1a453c11c34fc9237671"},{url:"icons/banner.jpg",revision:"f71f0ec924a9256ef813f1295f466d3d"},{url:"icons/cxr-128x128.png",revision:"e1511ffe397a44ecaeaaae698bf55feb"},{url:"icons/cxr-144x144.png",revision:"a014e96d8b7a50e224459cecb9dbbf27"},{url:"icons/cxr-160x160.png",revision:"fbb8afe120571442927441fb9142486e"},{url:"icons/cxr-32x32.png",revision:"e7705af728e9f6b1b9c8d3b35a8fa6d0"},{url:"icons/cxr-48x48.png",revision:"3f1ffc232652603951b798a0e13be684"},{url:"icons/cxr-512x512.png",revision:"5ad989e6ef2c1d6f9918a4aeb8774da5"},{url:"icons/cxr-64x64.png",revision:"804869eb6e9ece072bc0bf616232f317"},{url:"icons/cxr-96x96.png",revision:"0651a6d9f3dc9199754becf593b7695c"},{url:"icons/favicon-16x16.png",revision:"7ff2127e502d8eb688c9b304d02328f4"},{url:"icons/favicon-32x32.png",revision:"6ddbaf2eb611735b02df66afb37757d3"},{url:"icons/favicon-96x96.png",revision:"4e3a511036e6ebe79ee8f928df73d330"},{url:"icons/ms-icon-144x144.png",revision:"a014e96d8b7a50e224459cecb9dbbf27"},{url:"icons/ms-icon-150x150.png",revision:"bbd2e75538ba3dc974a75fa331ba863f"},{url:"icons/ms-icon-310x310.png",revision:"5ea5c4902d87a7b813e2c9949da3a42b"},{url:"icons/ms-icon-70x70.png",revision:"bfce1c7aaff01e2fe5bce8e4e6d044a0"},{url:"index.html",revision:"c7df32174788de7c917b5cec488f0519"},{url:"info.json",revision:"21e7c95df28400da978b5a268f0a8ecd"},{url:"manifest.json",revision:"67992310f702b925a2115daa7b999a41"},{url:"mstile-150x150.png",revision:"524ff9e19215044fb7142267efbc4e20"},{url:"robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"},{url:"static/css/main.82492f9f.chunk.css",revision:"adf08610a4fbd1659f1f54842eb4f534"},{url:"static/js/2.fab3fc74.chunk.js",revision:"1e993cae59e32a6473274aa824fa055e"},{url:"static/js/2.fab3fc74.chunk.js.LICENSE.txt",revision:"1d56bbb5889c91322a3a626fd99122a4"},{url:"static/js/main.7875e218.chunk.js",revision:"5f234e10d5b07cd96a1ab0679cb031c8"},{url:"static/js/runtime-main.da597fb8.js",revision:"731f47f7540c0e2ba02acc4109232b02"},{url:"sw.js",revision:"cef3fa0899993e9de724f2a5e99dca91"},{url:"timetable/11g.json",revision:"ae621ff220b8760b4386493d19abcd9d"},{url:"timetable/tables.json",revision:"59f26f5156ebe126669f6edf852f70f1"}],{}),e.registerRoute(/https:\/\/d-t-666\.github\.io\/cxrili/,new e.NetworkFirst,"GET")}));
//# sourceMappingURL=service-worker.js.map
