(()=>{"use strict";var e={963:(e,t,d)=>{e.exports=d.p+"build/images/add.png"},733:(e,t,d)=>{e.exports=d.p+"build/images/bg.jpg"},831:(e,t,d)=>{e.exports=d.p+"build/images/default.png"}},t={};function d(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,d),o.exports}d.p="/",(()=>{d(831),d(963),d(733);const e=()=>{let e=document.createElement("div");e.id="dockContainer",document.body.append(e);let t=document.createElement("div");t.className="dockElement",t.id="addButton",t.style.backgroundImage="url('build/images/add.png')",e.append(t)},t=e=>{const t=document.querySelector("#dockContainer");let d=document.createElement("div");d.className="dockElement",d.id=e,d.style.backgroundImage="url('build/images/default.png')",t.insertBefore(d,t.lastChild)};document.body.style.backgroundImage="build/images/bg.jpg",e(),t("test1"),t("test2"),t("test3"),t("test4")})()})();