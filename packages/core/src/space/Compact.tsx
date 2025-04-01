import type { ParentProps } from "solid-js"
import type { SpaceProps } from "./Space"
import { children as Children } from "solid-js"
import { xBtnSlug } from "../button"
import { Space } from "./Space"
import { compactItem } from "./styles/compact.css"

export function Compact({ children, direction = "horizontal" }: ParentProps<Pick<SpaceProps, "direction">>) {
    const elements = Children(() => children).toArray()

    const child = elements.map((child, index) => {
        if (child instanceof HTMLElement) {
            child.classList.add(compactItem)
            // 仅支持button组件
            if (direction === "vertical" && child.hasAttribute(xBtnSlug)) {
                if (index === 0) {
                    child.style.borderBottomRightRadius = "0"
                    child.style.borderBottomLeftRadius = "0"
                }
                else if (index === elements.length - 1) {
                    child.style.borderTopLeftRadius = "0"
                    child.style.borderTopRightRadius = "0"
                }
                else {
                    child.style.borderRadius = "0"
                }

                if (index < elements.length - 1) {
                    child.style.marginBottom = "-1px"
                }

                return child
            }

            if (index === 0) {
                child.style.borderTopRightRadius = "0"
                child.style.borderBottomRightRadius = "0"
            }
            else if (index === elements.length - 1) {
                child.style.borderTopLeftRadius = "0"
                child.style.borderBottomLeftRadius = "0"
            }
            else {
                child.style.borderRadius = "0"
            }

            if (index < elements.length - 1) {
                child.style.marginInlineEnd = "-1px"
            }
        }
        return child
    })

    return <Space size={0} direction={direction}>{child}</Space>
}
