"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const g=require("./node_modules/solid-js/web/dist/web.js");require("./node_modules/@ant-design/colors/es/index.js");const o=require("@ant-design-solidjs/util"),r=require("solid-js"),f=require("./components/Context.js"),d=require("./node_modules/@ant-design/colors/es/generate.js");function m(e){return e.replace(/-(.)/g,(n,t)=>t.toUpperCase())}function p(e,n){o.warning(e,`[@ant-design/icons] ${n}`)}function y(e){return typeof e=="object"&&typeof e.name=="string"&&typeof e.theme=="string"&&(typeof e.icon=="object"||typeof e.icon=="function")}function c(e={}){return Object.keys(e).reduce((n,t)=>{const i=e[t];switch(t){case"class":n.className=i,delete n.class;break;default:delete n[t],n[m(t)]=i}return n},{})}function l(e,n,t){const i=r.createMemo(()=>t?{key:n,...c(e.attrs),...t}:{key:n,...c(e.attrs)});return r.createComponent(g.Dynamic,r.mergeProps({get component(){return e.tag}},i,{get children(){return r.createComponent(r.For,{get each(){return e.children||[]},children:(a,s)=>l(a,`${n}-${e.tag}-${s()}`)})}}))}function b(e){return d.default(e)[0]}function h(e){return e?Array.isArray(e)?e:[e]:[]}const C={width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",focusable:"false"},u=`
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
`,S=e=>{const{csp:n,prefixCls:t}=r.useContext(f.default);let i=u;t&&(i=i.replace(/anticon/g,t)),r.onMount(()=>{const a=o.extractRef(e),s=o.getShadowRoot(a);o.updateCSS(i,"@ant-design-icons",{prepend:!0,csp:n,attachTo:s})})};exports.generate=l;exports.getSecondaryColor=b;exports.iconStyles=u;exports.isIconDefinition=y;exports.normalizeAttrs=c;exports.normalizeTwoToneColors=h;exports.svgBaseProps=C;exports.useInsertStyles=S;exports.warning=p;
