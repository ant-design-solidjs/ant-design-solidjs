function e() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
export {
  e as canUseDom
};
