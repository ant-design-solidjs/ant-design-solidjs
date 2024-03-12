import { createContext, useContext } from 'solid-js';

export interface WatermarkContextProps {
    add: (ele: HTMLElement) => void;
    remove: (ele: HTMLElement) => void;
}

function voidFunc() {}

const WatermarkContext = createContext<WatermarkContextProps>({
    add: voidFunc,
    remove: voidFunc,
});

export function usePanelRef(panelSelector?: string) {
    const watermark = useContext(WatermarkContext);

    let panelEleRef: HTMLElement;

    return (ele: HTMLElement | null) => {
        if (ele) {
            const innerContentEle = panelSelector ? ele.querySelector<HTMLElement>(panelSelector)! : ele;
            watermark.add(innerContentEle);
            panelEleRef = innerContentEle;
        } else {
            watermark.remove(panelEleRef!);
        }
    };
}

export default WatermarkContext;
