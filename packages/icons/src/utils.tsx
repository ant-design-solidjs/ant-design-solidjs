import { generate as generateColor } from '@ant-design/colors';
import type { AbstractNode, IconDefinition } from '@ant-design/icons-svg/lib/types';
import { updateCSS, warning as warn, getShadowRoot, extractRef } from '@ant-design-solidjs/util';
import { useContext, JSX, Ref, onMount, For, createMemo } from 'solid-js';
import IconContext from './components/Context';
import { Dynamic } from 'solid-js/web';

function camelCase(input: string) {
    return input.replace(/-(.)/g, (_, g) => g.toUpperCase());
}

export function warning(valid: boolean, message: string) {
    warn(valid, `[@ant-design/icons] ${message}`);
}

export function isIconDefinition(target: any): target is IconDefinition {
    return (
        typeof target === 'object' &&
        typeof target.name === 'string' &&
        typeof target.theme === 'string' &&
        (typeof target.icon === 'object' || typeof target.icon === 'function')
    );
}

export function normalizeAttrs(attrs: Attrs = {}): Attrs {
    return Object.keys(attrs).reduce((acc: Attrs, key) => {
        const val = attrs[key];
        switch (key) {
            case 'class':
                acc.className = val;
                delete acc.class;
                break;
            default:
                delete acc[key];
                acc[camelCase(key)] = val;
        }
        return acc;
    }, {});
}

export type Attrs = Record<string, string>;
interface RootProps {
    onClick: JSX.EventHandler<Element, MouseEvent>;
    style: JSX.CSSProperties;
    ref: Ref<any>;
    [props: string]:
        | string
        | number
        | JSX.Element
        | JSX.EventHandler<Element, MouseEvent>
        | JSX.CSSProperties
        | Ref<any>;
}

export function generate(node: AbstractNode, key: string, rootProps?: RootProps | false): any {
    const props = createMemo(() =>
        !rootProps
            ? { key, ...normalizeAttrs(node.attrs) }
            : {
                  key,
                  ...normalizeAttrs(node.attrs),
                  ...rootProps,
              },
    );

    return (
        <Dynamic component={node.tag} {...props()}>
            <For each={node.children || []}>{(child, index) => generate(child, `${key}-${node.tag}-${index()}`)}</For>
        </Dynamic>
    );
}

export function getSecondaryColor(primaryColor: string): string {
    // choose the second color
    return generateColor(primaryColor)[0];
}

export function normalizeTwoToneColors(twoToneColor: string | [string, string] | undefined): string[] {
    if (!twoToneColor) {
        return [];
    }

    return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}

// These props make sure that the SVG behaviours like general text.
// Reference: https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
export const svgBaseProps = {
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true',
    focusable: 'false',
};

export const iconStyles = `
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
`;

export const useInsertStyles = (eleRef: Ref<HTMLElement>) => {
    const { csp, prefixCls } = useContext(IconContext);
    let mergedStyleStr = iconStyles;

    if (prefixCls) {
        mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
    }

    onMount(() => {
        const ele = extractRef(eleRef);
        const shadowRoot = getShadowRoot(ele);

        updateCSS(mergedStyleStr, '@ant-design-icons', {
            prepend: true,
            csp,
            attachTo: shadowRoot,
        });
    });
};
