var u = Object.defineProperty;
var d = (o, t, i) => t in o ? u(o, t, {enumerable: !0, configurable: !0, writable: !0, value: i}) : o[t] = i;
var c = (o, t, i) => (d(o, typeof t != "symbol" ? t + "" : t, i), i);
const m = function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
    new MutationObserver(e => {
        for (const s of e) if (s.type === "childList") for (const a of s.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && n(a)
    }).observe(document, {childList: !0, subtree: !0});

    function i(e) {
        const s = {};
        return e.integrity && (s.integrity = e.integrity), e.referrerpolicy && (s.referrerPolicy = e.referrerpolicy), e.crossorigin === "use-credentials" ? s.credentials = "include" : e.crossorigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s
    }

    function n(e) {
        if (e.ep) return;
        e.ep = !0;
        const s = i(e);
        fetch(e.href, s)
    }
};
m();

function f(o, t, i) {
    return Math.max(t, Math.min(o, i))
}

function p(o) {
    return f(-.2 * Math.pow(o, 2) + 1.05, 0, 1)
}

var l;
(function (o) {
    o.Left = "right", o.Right = "left", o.Up = "bottom", o.Down = "top", o.None = "center"
})(l || (l = {}));
var r;
(function (o) {
    o.Top = "top", o.Bottom = "bottom", o.Left = "left", o.Right = "right"
})(r || (r = {}));

class h {
    constructor(t, {position: i = r.Left}) {
        c(this, "root");
        c(this, "icons");
        c(this, "iconSize");
        c(this, "mousePosition", 0);
        c(this, "scale", .5);
        c(this, "position");
        this.root = t, this.position = i, this.icons = Array.from(t.children), this.iconSize = this.icons[0].offsetWidth, t.addEventListener("mousemove", this.handleMouseMove.bind(this)), t.addEventListener("mouseenter", this.handleMouseEnter.bind(this)), t.addEventListener("mouseleave", this.handleMouseLeave.bind(this))
    }

    get isVertical() {
        return [r.Left, r.Right].includes(this.position)
    }

    handleMouseMove(t) {
        this.mousePosition = f(this.isVertical ? (t.clientY - this.root.offsetTop) / this.iconSize : (t.clientX - this.root.offsetLeft) / this.iconSize, 0, this.icons.length), this.scaleIcons()
    }

    scaleIcons() {
        const t = Math.floor(Math.abs(this.mousePosition)), i = this.mousePosition - t - .5,
            n = this.scaleFromDirection(t, l.None, -i * this.iconSize * this.scale);
        let e = n * (.5 - i);
        for (let s = t + 1; s < this.icons.length; s++) e += this.scaleFromDirection(s, this.isVertical ? l.Down : l.Right, e);
        e = n * (.5 + i);
        for (let s = t - 1; s >= 0; s--) e += this.scaleFromDirection(s, this.isVertical ? l.Up : l.Left, -e)
    }

    scaleFromDirection(t, i, n) {
        const e = this.icons[t], s = this.mousePosition - t - .5, a = p(s) * this.scale;
        return e.style.setProperty("transform", `translate${this.isVertical ? "Y" : "X"}(${n}px) scale(${a + 1})`), e.style.setProperty("transform-origin", `${i} ${this.position}`), a * this.iconSize
    }

    handleMouseLeave() {
        this.icons.forEach(t => {
            t.style.removeProperty("transform"), t.style.setProperty("transition", "transform .1s")
        })
    }

    handleMouseEnter() {
        this.icons.forEach(t => {
            t.style.setProperty("transition", "transform .1s")
        }), window.setTimeout(() => {
            this.icons.forEach(t => {
                t.style.removeProperty("transition")
            })
        }, 100)
    }
}

new h(document.querySelector(".dock__wrapper--bottom .dock"), {position: r.Bottom});
new h(document.querySelector(".dock__wrapper--top .dock"), {position: r.Top});
new h(document.querySelector(".dock__wrapper--left .dock"), {position: r.Left});
new h(document.querySelector(".dock__wrapper--right .dock"), {position: r.Right});