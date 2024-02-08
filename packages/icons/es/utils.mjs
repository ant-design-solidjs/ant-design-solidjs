import { Dynamic as c } from "./node_modules/solid-js/web/dist/web.mjs";
import "./node_modules/@ant-design/colors/es/index.mjs";
import { warning as l, extractRef as f, getShadowRoot as m, updateCSS as g } from "@ant-design-solidjs/util";
import { useContext as p, onMount as d, createMemo as u, createComponent as a, mergeProps as h, For as b } from "solid-js";
import y from "./components/Context.mjs";
import C from "./node_modules/@ant-design/colors/es/generate.mjs";
function w(e) {
  return e.replace(/-(.)/g, (n, t) => t.toUpperCase());
}
function I(e, n) {
  l(e, `[@ant-design/icons] ${n}`);
}
function R(e) {
  return typeof e == "object" && typeof e.name == "string" && typeof e.theme == "string" && (typeof e.icon == "object" || typeof e.icon == "function");
}
function s(e = {}) {
  return Object.keys(e).reduce((n, t) => {
    const i = e[t];
    switch (t) {
      case "class":
        n.className = i, delete n.class;
        break;
      default:
        delete n[t], n[w(t)] = i;
    }
    return n;
  }, {});
}
function x(e, n, t) {
  const i = u(() => t ? {
    key: n,
    ...s(e.attrs),
    ...t
  } : {
    key: n,
    ...s(e.attrs)
  });
  return a(c, h({
    get component() {
      return e.tag;
    }
  }, i, {
    get children() {
      return a(b, {
        get each() {
          return e.children || [];
        },
        children: (o, r) => x(o, `${n}-${e.tag}-${r()}`)
      });
    }
  }));
}
function D(e) {
  return C(e)[0];
}
function M(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
const B = {
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  focusable: "false"
}, k = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`, F = (e) => {
  const {
    csp: n,
    prefixCls: t
  } = p(y);
  let i = k;
  t && (i = i.replace(/anticon/g, t)), d(() => {
    const o = f(e), r = m(o);
    g(i, "@ant-design-icons", {
      prepend: !0,
      csp: n,
      attachTo: r
    });
  });
};
export {
  x as generate,
  D as getSecondaryColor,
  k as iconStyles,
  R as isIconDefinition,
  s as normalizeAttrs,
  M as normalizeTwoToneColors,
  B as svgBaseProps,
  F as useInsertStyles,
  I as warning
};
