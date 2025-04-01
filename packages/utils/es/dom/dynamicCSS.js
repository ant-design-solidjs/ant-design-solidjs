import { canUseDom as N } from "./canUseDom.js";
import { contains as b } from "./contains.js";
const y = "data-rc-order", m = "data-rc-priority", E = "rc-util-key", f = /* @__PURE__ */ new Map();
function C({ mark: e } = {}) {
  return e ? e.startsWith("data-") ? e : `data-${e}` : E;
}
function l(e) {
  return e.attachTo ? e.attachTo : document.querySelector("head") || document.body;
}
function P(e) {
  return e === "queue" ? "prependQueue" : e ? "prepend" : "append";
}
function p(e) {
  return Array.from(
    (f.get(e) || e).children
  ).filter((t) => t.tagName === "STYLE");
}
function g(e, t = {}) {
  if (!N())
    return null;
  const { csp: n, prepend: o, priority: s = 0 } = t, c = P(o), i = c === "prependQueue", r = document.createElement("style");
  r.setAttribute(y, c), i && s && r.setAttribute(m, `${s}`), n != null && n.nonce && (r.nonce = n == null ? void 0 : n.nonce), r.innerHTML = e;
  const u = l(t), { firstChild: a } = u;
  if (o) {
    if (i) {
      const d = (t.styles || p(u)).filter(
        (h) => {
          if (!["prepend", "prependQueue"].includes(
            h.getAttribute(y)
          ))
            return !1;
          const A = Number(h.getAttribute(m) || 0);
          return s >= A;
        }
      );
      if (d.length)
        return u.insertBefore(
          r,
          d[d.length - 1].nextSibling
        ), r;
    }
    u.insertBefore(r, a);
  } else
    u.appendChild(r);
  return r;
}
function S(e, t = {}) {
  let { styles: n } = t;
  return n || (n = p(l(t))), n.find((o) => o.getAttribute(C(t)) === e);
}
function M(e, t = {}) {
  const n = S(e, t);
  n && l(t).removeChild(n);
}
function R(e, t) {
  const n = f.get(e);
  if (!n || !b(document, n)) {
    const o = g("", t), { parentNode: s } = o;
    f.set(e, s), e.removeChild(o);
  }
}
function D() {
  f.clear();
}
function L(e, t, n = {}) {
  var u, a, d;
  const o = l(n), s = p(o), c = { ...n, styles: s };
  R(o, c);
  const i = S(t, c);
  if (i)
    return (u = c.csp) != null && u.nonce && i.nonce !== ((a = c.csp) == null ? void 0 : a.nonce) && (i.nonce = (d = c.csp) == null ? void 0 : d.nonce), i.innerHTML !== e && (i.innerHTML = e), i;
  const r = g(e, c);
  return r.setAttribute(C(c), t), r;
}
export {
  D as clearContainerCache,
  g as injectCSS,
  M as removeCSS,
  L as updateCSS
};
