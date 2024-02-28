import { use as h, spread as a, insert as l, template as d, Dynamic as B } from "../node_modules/.pnpm/solid-js@1.8.15/node_modules/solid-js/web/dist/web.mjs";
import { clsx as p } from "../node_modules/.pnpm/clsx@2.1.0/node_modules/clsx/dist/clsx.mjs";
import { composeRef as w } from "@ant-design-solidjs/util";
import C from "./Context.mjs";
import { warning as m, useInsertStyles as I, svgBaseProps as y } from "../utils.mjs";
import { splitProps as $, useContext as k, mergeProps as n, createComponent as P, children as S } from "solid-js";
var b = /* @__PURE__ */ d("<svg>"), _ = /* @__PURE__ */ d("<span role=img>");
const N = (u) => {
  const [e, s] = $(u, ["class", "component", "viewBox", "spin", "rotate", "tabIndex", "onClick", "children"]);
  let i;
  const v = w(i, s.ref);
  m(!!(e.component || e.component), "Should have `component` prop or `children`."), I(i);
  const {
    prefixCls: c = "anticon",
    rootClass: f
  } = k(C), g = () => {
    const o = p({
      [`${c}-spin`]: !!e.spin
    }), x = e.rotate ? {
      msTransform: `rotate(${e.rotate}deg)`,
      transform: `rotate(${e.rotate}deg)`
    } : void 0, r = {
      ...y,
      className: o,
      style: x,
      viewBox: e.viewBox
    };
    return e.viewBox || delete r.viewBox, e.component ? P(B, n({
      get component() {
        return e.component;
      }
    }, r, {
      get children() {
        return e.children;
      }
    })) : e.children ? (m(!!e.viewBox || S(() => e.children).toArray().length === 1 && !!e.component, "Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon."), (() => {
      var t = b();
      return a(t, n(r, {
        get viewBox() {
          return e.viewBox;
        }
      }), !0, !0), l(t, () => e.children), t;
    })()) : null;
  };
  return (() => {
    var o = _();
    return h(v, o), a(o, n(s, {
      get tabIndex() {
        return e.tabIndex === void 0 && e.onClick ? -1 : e.tabIndex;
      },
      get onClick() {
        return e.onClick;
      },
      get class() {
        return p(f, c, e.class);
      }
    }), !1, !0), l(o, g), o;
  })();
};
N.displayName = "AntdIcon";
export {
  N as default
};
