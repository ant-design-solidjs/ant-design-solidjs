import { getSecondaryColor as s, useInsertStyles as g, warning as m, isIconDefinition as c, generate as T } from "../utils.mjs";
const n = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function p({
  primaryColor: r,
  secondaryColor: e
}) {
  n.primaryColor = r, n.secondaryColor = e || s(r), n.calculated = !!e;
}
function w() {
  return {
    ...n
  };
}
const a = (r) => {
  const {
    icon: e,
    className: f,
    onClick: u,
    style: C,
    primaryColor: t,
    secondaryColor: d,
    ...y
  } = r;
  let i, l = n;
  if (t && (l = {
    primaryColor: t,
    secondaryColor: d || s(t)
  }), g(i), m(c(e), `icon should be icon definiton, but got ${e}`), !c(e))
    return null;
  let o = e;
  return o && typeof o.icon == "function" && (o = {
    ...o,
    icon: o.icon(l.primaryColor, l.secondaryColor)
  }), T(o.icon, `svg-${o.name}`, {
    className: f,
    onClick: u,
    style: C,
    "data-icon": o.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true",
    ...y,
    ref: i
  });
};
a.getTwoToneColors = w;
a.setTwoToneColors = p;
export {
  a as default
};
