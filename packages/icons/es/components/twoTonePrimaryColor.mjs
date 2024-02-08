import r from "./IconBase.mjs";
import { normalizeTwoToneColors as t } from "../utils.mjs";
function c(o) {
  const [e, n] = t(o);
  return r.setTwoToneColors({
    primaryColor: e,
    secondaryColor: n
  });
}
function C() {
  const o = r.getTwoToneColors();
  return o.calculated ? [o.primaryColor, o.secondaryColor] : o.primaryColor;
}
export {
  C as getTwoToneColor,
  c as setTwoToneColor
};
