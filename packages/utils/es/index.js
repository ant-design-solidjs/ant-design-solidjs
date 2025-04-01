import { canUseDom as r } from "./dom/canUseDom.js";
import { contains as t } from "./dom/contains.js";
import { clearContainerCache as c, injectCSS as S, removeCSS as m, updateCSS as p } from "./dom/dynamicCSS.js";
import { getShadowRoot as f, inShadow as s } from "./dom/shadow.js";
import { call as C, note as d, noteOnce as g, preMessage as w, resetWarned as h, warning as l, warningOnce as O } from "./warning.js";
export {
  C as call,
  r as canUseDom,
  c as clearContainerCache,
  t as contains,
  f as getShadowRoot,
  s as inShadow,
  S as injectCSS,
  d as note,
  g as noteOnce,
  w as preMessage,
  m as removeCSS,
  h as resetWarned,
  p as updateCSS,
  l as warning,
  O as warningOnce
};
