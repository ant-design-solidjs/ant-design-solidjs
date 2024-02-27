import { Dynamic as s } from "./node_modules/.pnpm/solid-js@1.8.15/node_modules/solid-js/web/dist/web.mjs";
import "./node_modules/.pnpm/@ant-design_colors@7.0.2/node_modules/@ant-design/colors/es/index.mjs";
import { warning as l, extractRef as f, getShadowRoot as m, updateCSS as g } from "@ant-design-solidjs/util";
import { useContext as p, onMount as u, createMemo as d, createComponent as a, mergeProps as h, For as y } from "solid-js";
import b from "./components/Context.mjs";
import C from "./node_modules/.pnpm/@ant-design_colors@7.0.2/node_modules/@ant-design/colors/es/generate.mjs";
function w(n) {
  return n.replace(/-(.)/g, (e, t) => t.toUpperCase());
}
function I(n, e) {
  l(n, `[@ant-design/icons] ${e}`);
}
function R(n) {
  return typeof n == "object" && typeof n.name == "string" && typeof n.theme == "string" && (typeof n.icon == "object" || typeof n.icon == "function");
}
function c(n = {}) {
  return Object.keys(n).reduce((e, t) => {
    const i = n[t];
    switch (t) {
      default:
        delete e[t], e[w(t)] = i;
    }
    return e;
  }, {});
}
function x(n, e, t) {
  const i = d(() => t ? {
    key: e,
    ...c(n.attrs),
    ...t
  } : {
    key: e,
    ...c(n.attrs)
  });
  return a(s, h({
    get component() {
      return n.tag;
    }
  }, i, {
    get children() {
      return a(y, {
        get each() {
          return n.children || [];
        },
        children: (o, r) => x(o, `${e}-${n.tag}-${r()}`)
      });
    }
  }));
}
function D(n) {
  return C(n)[0];
}
function M(n) {
  return n ? Array.isArray(n) ? n : [n] : [];
}
const B = {
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  focusable: "false"
}, S = `
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
`, F = (n) => {
  const {
    csp: e,
    prefixCls: t
  } = p(b);
  let i = S;
  t && (i = i.replace(/anticon/g, t)), u(() => {
    const o = f(n), r = m(o);
    g(i, "@ant-design-icons", {
      prepend: !0,
      csp: e,
      attachTo: r
    });
  });
};
export {
  x as generate,
  D as getSecondaryColor,
  S as iconStyles,
  R as isIconDefinition,
  c as normalizeAttrs,
  M as normalizeTwoToneColors,
  B as svgBaseProps,
  F as useInsertStyles,
  I as warning
};
