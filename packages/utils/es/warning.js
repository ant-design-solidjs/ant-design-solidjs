let i = {};
const t = [];
function f(n) {
  t.push(n);
}
function u(n, e) {
  if (process.env.NODE_ENV !== "production" && !n && console !== void 0) {
    const o = t.reduce(
      (r, c) => c(r ?? "", "warning"),
      e
    );
    o && console.error(`Warning: ${o}`);
  }
}
function l(n, e) {
  if (process.env.NODE_ENV !== "production" && !n && console !== void 0) {
    const o = t.reduce(
      (r, c) => c(r ?? "", "note"),
      e
    );
    o && console.warn(`Note: ${o}`);
  }
}
function d() {
  i = {};
}
function a(n, e, o) {
  !e && !i[o] && (n(!1, o), i[o] = !0);
}
function s(n, e) {
  a(u, n, e);
}
function p(n, e) {
  a(l, n, e);
}
s.preMessage = f;
s.resetWarned = d;
s.noteOnce = p;
export {
  a as call,
  l as note,
  p as noteOnce,
  f as preMessage,
  d as resetWarned,
  u as warning,
  s as warningOnce
};
