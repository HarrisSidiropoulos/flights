var __wpo = {"assets":{"main":["./f4769f9bdb7466be65088239c12046d1.eot","./89889688147bd7575d6327160d64e760.svg","./e18bbf611f2a2e43afc071aa2f4e1512.ttf","./fa2772327f55d8198301fdb8bcfc8158.woff","./448c34a56d699c29117adc64c43affeb.woff2","./bundle.app.0f98b90362a87f27443f.js","./bundle.vendor.a74fc8e75174882c6aa0.js","./bundle.app-916e705872140677dde8.min.css","./favicon.png","./../"],"additional":[],"optional":[]},"hashesMap":{"f4769f9bdb7466be65088239c12046d1":"./f4769f9bdb7466be65088239c12046d1.eot","89889688147bd7575d6327160d64e760":"./89889688147bd7575d6327160d64e760.svg","e18bbf611f2a2e43afc071aa2f4e1512":"./e18bbf611f2a2e43afc071aa2f4e1512.ttf","fa2772327f55d8198301fdb8bcfc8158":"./fa2772327f55d8198301fdb8bcfc8158.woff","448c34a56d699c29117adc64c43affeb":"./448c34a56d699c29117adc64c43affeb.woff2","0f98b90362a87f27443fe7f305b17c55":"./bundle.app.0f98b90362a87f27443f.js","a74fc8e75174882c6aa0fd4d1c06dc55":"./bundle.vendor.a74fc8e75174882c6aa0.js","f5081eabd0aa4798431cf62cbed3f2b7":"./bundle.app-916e705872140677dde8.min.css","c4e72a0f7819161a0b826b5c01041284":"./favicon.png","d98d1d83e16c3721f2eb2a46f00ab329":"./../"},"strategy":"all","version":"2016-09-12 12:47:20","name":"webpack-offline","relativePaths":true};

!function(n){function e(r){if(t[r])return t[r].e;var o=t[r]={e:{},i:r,l:!1};return n[r].call(o.e,o,o.e,e),o.l=!0,o.e}var t={};return e.m=n,e.c=t,e.p="assets/",e(e.s=2)}([function(n,e){"use strict"},function(n,e){},function(n,e,t){"use strict";function r(n){function e(){if(!g.additional.length)return Promise.resolve();u&&console.log("[SW]:","Caching additional");var n=void 0;return n="changed"===v?r("additional"):t("additional"),n.catch(function(n){console.error("[SW]:","Cache section `additional` failed to load")})}function t(e){var t=g[e];return caches.open(W).then(function(e){return o(e,t,{bust:n.version})}).then(function(){s("Cached assets: "+e,t)}).catch(function(n){throw console.error(n),n})}function r(e){return f().then(function(r){if(!r)return t(e);var i=r[0],a=r[1],c=r[2],u=c.hashmap,f=c.version;if(!c.hashmap||f===n.version)return t(e);var l=Object.keys(u).map(function(n){return u[n]}),h=a.map(function(n){var e=new URL(n.url);return e.search="",e.toString()}),d=g[e],v=[],m=d.filter(function(n){return h.indexOf(n)===-1||l.indexOf(n)===-1});Object.keys(p).forEach(function(n){var e=p[n];if(d.indexOf(e)!==-1&&m.indexOf(e)===-1&&v.indexOf(e)===-1){var t=u[n];t&&h.indexOf(t)!==-1?v.push([t,e]):m.push(e)}}),s("Changed assets: "+e,m),s("Moved assets: "+e,v);var O=Promise.all(v.map(function(n){return i.match(n[0]).then(function(e){return[n[1],e]})}));return caches.open(W).then(function(e){var t=O.then(function(n){return Promise.all(n.map(function(n){return e.put(n[0],n[1])}))});return Promise.all([t,o(e,m,{bust:n.version})])})})}function a(){return caches.keys().then(function(n){var e=n.map(function(n){if(0===n.indexOf(O)&&0!==n.indexOf(W))return console.log("[SW]:","Delete cache:",n),caches.delete(n)});return Promise.all(e)})}function f(){return caches.keys().then(function(n){for(var e=n.length,t=void 0;e--&&(t=n[e],0!==t.indexOf(O)););if(t){var r=void 0;return caches.open(t).then(function(n){return r=n,n.match(new URL(k,location).toString())}).then(function(n){if(n)return Promise.all([r,r.keys(),n.json()])})}})}function l(){return caches.open(W).then(function(e){var t=new Response(JSON.stringify({version:n.version,hashmap:p}));return e.put(new URL(k,location).toString(),t)})}function h(n){return n.catch(function(){}).then(function(n){return n&&n.ok?n:(u&&console.log("[SW]:","Loading navigation fallback ["+x+"] from cache"),i(x,W))})}function d(){Object.keys(g).forEach(function(n){g[n]=g[n].map(function(n){var e=new URL(n,location);return e.search="",e.toString()})}),p=Object.keys(p).reduce(function(n,e){var t=new URL(p[e],location);return t.search="",n[e]=t.toString(),n},{})}var v=n.strategy,g=n.assets,p=n.hashesMap,m={all:n.version,changed:n.version},O=n.name,S=m[v],W=O+":"+S,k="__offline_webpack__data";d();var w=[].concat(g.main,g.additional,g.optional),x=n.navigateFallbackURL;self.addEventListener("install",function(n){console.log("[SW]:","Install event");var e=void 0;e="changed"===v?r("main"):t("main"),n.waitUntil(e)}),self.addEventListener("activate",function(n){console.log("[SW]:","Activate event");var t=e();t=t.then(l),t=t.then(a),t=t.then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),n.waitUntil(t)}),self.addEventListener("fetch",function(n){var e=new URL(n.request.url);e.search="";var t=e.toString();if("GET"!==n.request.method||w.indexOf(t)===-1)return x&&c(n.request)?void n.respondWith(h(fetch(n.request))):void(e.origin!==location.origin&&navigator.userAgent.indexOf("Firefox/44.")!==-1&&n.respondWith(fetch(n.request)));var r=i(t,W).then(function(e){if(e)return u&&console.log("[SW]:","URL ["+t+"] from cache"),e;var r=fetch(n.request).then(function(n){if(!n||!n.ok)return u&&console.log("[SW]:","URL ["+t+"] wrong response: ["+n.status+"] "+n.type),n;u&&console.log("[SW]:","URL ["+t+"] fetched");var e=n.clone();return caches.open(W).then(function(n){return n.put(t,e)}).then(function(){console.log("[SW]:","Cache asset: "+t)}),n});return x&&c(n.request)?h(r):r});n.respondWith(r)}),self.addEventListener("message",function(n){var e=n.data;if(e)switch(e.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}})}function o(n,e,t){var r=t&&t.bust;return Promise.all(e.map(function(n){return r&&(n=a(n,r)),fetch(n)})).then(function(t){if(t.some(function(n){return!n.ok}))return Promise.reject(new Error("Wrong response status"));var r=t.map(function(t,r){return n.put(e[r],t)});return Promise.all(r)})}function i(n,e){return caches.match(n,{cacheName:e}).catch(function(){})}function a(n,e){var t=n.indexOf("?")!==-1;return n+(t?"&":"?")+"__uncache="+encodeURIComponent(e)}function c(n){return"navigate"===n.mode||n.headers.get("Upgrade-Insecure-Requests")||(n.headers.get("Accept")||"").indexOf("text/html")!==-1}function s(n,e){console.groupCollapsed("[SW]:",n),e.forEach(function(n){console.log("Asset:",n)}),console.groupEnd()}if("undefined"==typeof u)var u=!1;t(0),r(__wpo),n.e=t(1)}]);