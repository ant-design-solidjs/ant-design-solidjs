function n(o) {
  var t;
  return (t = o == null ? void 0 : o.getRootNode) == null ? void 0 : t.call(o);
}
function r(o) {
  return n(o) instanceof ShadowRoot;
}
function u(o) {
  return r(o) ? n(o) : null;
}
export {
  u as getShadowRoot,
  r as inShadow
};
