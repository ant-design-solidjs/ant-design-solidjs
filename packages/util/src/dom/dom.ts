export function canUseDom() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function contains(root: Node | null | undefined, n?: Node) {
    if (!root) {
        return false;
    }

    // Use native if support
    if (root.contains) {
        return root.contains(n);
    }

    // `document.contains` not support with IE11
    let node = n;
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
}

export function isVisible(element: Element): boolean {
    if (!element) {
        return false;
    }

    if (element instanceof Element) {
        if ((element as HTMLElement).offsetParent) {
            return true;
        }

        if ((element as SVGGraphicsElement).getBBox) {
            const { width, height } = (element as SVGGraphicsElement).getBBox();
            if (width || height) {
                return true;
            }
        }

        if (element.getBoundingClientRect) {
            const { width, height } = element.getBoundingClientRect();
            if (width || height) {
                return true;
            }
        }
    }

    return false;
}
