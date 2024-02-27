import { setAttribute as d, template as f } from "../node_modules/.pnpm/solid-js@1.8.15/node_modules/solid-js/web/dist/web.mjs";
import l from "./Icon.mjs";
import { splitProps as m, createComponent as c, mergeProps as h, Switch as g, Match as a, createRenderEffect as y } from "solid-js";
var w = /* @__PURE__ */ f("<svg><use></svg>", !1, !0);
const s = /* @__PURE__ */ new Set();
function v(e) {
  return !!(typeof e == "string" && e.length && !s.has(e));
}
function i(e, t = 0) {
  const n = e[t];
  if (v(n)) {
    const r = document.createElement("script");
    r.setAttribute("src", n), r.setAttribute("data-namespace", n), e.length > t + 1 && (r.onload = () => {
      i(e, t + 1);
    }, r.onerror = () => {
      i(e, t + 1);
    }), s.add(n), document.body.appendChild(r);
  }
}
function b(e = {}) {
  const {
    scriptUrl: t,
    extraCommonProps: n = {}
  } = e;
  return t && typeof document < "u" && typeof window < "u" && typeof document.createElement == "function" && (Array.isArray(t) ? i(t.reverse()) : i([t])), (r) => {
    const [o, p] = m(r, ["type", "children"]);
    return c(l, h(n, p, {
      get children() {
        return c(g, {
          get children() {
            return [c(a, {
              get when() {
                return o.type;
              },
              get children() {
                return [(() => {
                  var u = w();
                  return y(() => d(u, "href", `#${o.type}`)), u;
                })(), ";"];
              }
            }), c(a, {
              get when() {
                return o.children;
              },
              get children() {
                return o.children;
              }
            })];
          }
        });
      }
    }));
  };
}
export {
  b as default
};
