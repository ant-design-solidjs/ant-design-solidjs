import { spread as g, insert as f, template as d } from "../node_modules/.pnpm/solid-js@1.8.15/node_modules/solid-js/web/dist/web.mjs";
import { clsx as T } from "../node_modules/.pnpm/clsx@2.1.0/node_modules/clsx/dist/clsx.mjs";
import { blue as x } from "../node_modules/.pnpm/@ant-design_colors@7.0.2/node_modules/@ant-design/colors/es/index.mjs";
import I from "./Context.mjs";
import b from "./IconBase.mjs";
import { setTwoToneColor as n, getTwoToneColor as w } from "./twoTonePrimaryColor.mjs";
import { normalizeTwoToneColors as $ } from "../utils.mjs";
import { splitProps as v, useContext as y, createMemo as e, mergeProps as k, createComponent as P } from "solid-js";
var S = /* @__PURE__ */ d("<span role=img>");
n(x.primary);
const s = (a) => {
  const [o, i] = v(a, ["class", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"]), {
    prefixCls: r = "anticon",
    rootClass: l
  } = y(I), m = e(() => o.tabIndex === void 0 && o.onClick ? -1 : o.tabIndex), c = e(() => T(l, r, {
    [`${r}-${o.icon.name}`]: !!o.icon.name,
    [`${r}-spin`]: !!o.spin || o.icon.name === "loading"
  }, o.class)), p = e(() => o.rotate ? {
    "-ms-transform": `rotate(${o.rotate}deg)`,
    transform: `rotate(${o.rotate}deg)`
  } : void 0), [C, u] = $(o.twoToneColor);
  return (() => {
    var t = S();
    return g(t, k({
      get "aria-label"() {
        return o.icon.name;
      }
    }, i, {
      get tabIndex() {
        return m();
      },
      get onClick() {
        return o.onClick;
      },
      get class() {
        return c();
      }
    }), !1, !0), f(t, P(b, {
      get icon() {
        return o.icon;
      },
      primaryColor: C,
      secondaryColor: u,
      get style() {
        return p();
      }
    })), t;
  })();
};
s.getTwoToneColor = w;
s.setTwoToneColor = n;
export {
  s as default
};
