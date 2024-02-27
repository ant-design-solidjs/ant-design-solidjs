import { use as w, spread as a, insert as l, template as d, Dynamic as C } from "../node_modules/.pnpm/solid-js@1.8.15/node_modules/solid-js/web/dist/web.mjs";
import { clsx as p } from "../node_modules/.pnpm/clsx@2.1.0/node_modules/clsx/dist/clsx.mjs";
import { composeRef as I } from "@ant-design-solidjs/util";
import y from "./Context.mjs";
import { warning as m, useInsertStyles as $, svgBaseProps as S } from "../utils.mjs";
import { splitProps as k, useContext as P, mergeProps as n, createComponent as b, children as N } from "solid-js";
var _ = /* @__PURE__ */ d("<svg>"), R = /* @__PURE__ */ d("<span role=img>");
const A = (u) => {
  const [e, s] = k(u, ["class", "component", "viewBox", "spin", "rotate", "tabIndex", "onClick", "children"]);
  let i;
  const v = I(i, s.ref);
  m(!!(e.component || e.component), "Should have `component` prop or `children`."), $(i);
  const {
    prefixCls: c = "anticon",
    rootClassName: f
  } = P(y), g = p(f, c, e.class), x = p({
    [`${c}-spin`]: !!e.spin
  }), h = e.rotate ? {
    msTransform: `rotate(${e.rotate}deg)`,
    transform: `rotate(${e.rotate}deg)`
  } : void 0, t = {
    ...S,
    className: x,
    style: h,
    viewBox: e.viewBox
  };
  e.viewBox || delete t.viewBox;
  const B = () => e.component ? b(C, n({
    get component() {
      return e.component;
    }
  }, t, {
    get children() {
      return e.children;
    }
  })) : e.children ? (m(!!e.viewBox || N(() => e.children).toArray().length === 1 && !!e.component, "Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon."), (() => {
    var o = _();
    return a(o, n(t, {
      get viewBox() {
        return e.viewBox;
      }
    }), !0, !0), l(o, () => e.children), o;
  })()) : null;
  let r = e.tabIndex;
  return r === void 0 && e.onClick && (r = -1), (() => {
    var o = R();
    return w(v, o), a(o, n(s, {
      tabIndex: r,
      get onClick() {
        return e.onClick;
      },
      class: g
    }), !1, !0), l(o, B), o;
  })();
};
A.displayName = "AntdIcon";
export {
  A as default
};
