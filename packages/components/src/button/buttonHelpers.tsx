import { JSX, children as Children, ResolvedJSXElement } from 'solid-js';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
export const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

export function isString(str: any): str is string {
    return typeof str === 'string';
}

export function isUnBorderedButtonType(type?: ButtonType) {
    return type === 'text' || type === 'link';
}

function splitCNCharsBySpace(child: ResolvedJSXElement, needInserted: boolean) {
    if (child === null || child === undefined) {
        return;
    }

    const SPACE = needInserted ? ' ' : '';

    if (isString(child)) {
        return isTwoCNChar(child) ? <span>{child.split('').join(SPACE)}</span> : <span>{child}</span>;
    }
    // console.log(child);
    // if (
    //     typeof child !== 'string' &&
    //     typeof child !== 'number' &&
    //     isString(child.type) &&
    //     isTwoCNChar(child.props.children)
    // ) {
    //     return cloneElement(child, {
    //         children: child.props.children.split('').join(SPACE),
    //     });
    // }
    //
    // if (isFragment(child)) {
    //     return <span>{child}</span>;
    // }

    return child;
}

export function spaceChildren(children: JSX.Element, needInserted: boolean) {
    let isPrevChildPure: boolean = false;
    const childList: JSX.Element[] = [];

    const resolvedElements = Children(() => children).toArray();
    resolvedElements.forEach(child => {
        const type = typeof child;
        const isCurrentChildPure = type === 'string' || type === 'number';
        if (isPrevChildPure && isCurrentChildPure) {
            const lastIndex = childList.length - 1;
            const lastChild = childList[lastIndex];
            childList[lastIndex] = `${lastChild}${child}`;
        } else {
            childList.push(child);
        }

        isPrevChildPure = isCurrentChildPure;
    });

    return resolvedElements.map(child => splitCNCharsBySpace(child, needInserted));
}

const ButtonTypes = ['default', 'primary', 'dashed', 'link', 'text'] as const;
export type ButtonType = (typeof ButtonTypes)[number];

const ButtonShapes = ['default', 'circle', 'round'] as const;
export type ButtonShape = (typeof ButtonShapes)[number];

const ButtonHTMLTypes = ['submit', 'button', 'reset'] as const;
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];
