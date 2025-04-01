import type { Accessor, ComponentProps, JSX } from "solid-js"
import type { RowVariants } from "./styles/row.css"
import { destructure } from "@solid-primitives/destructure"
import { combineStyle } from "@solid-primitives/props"
import { clsx } from "clsx"
import { createContext, createMemo, splitProps } from "solid-js"
import { rowCss } from "./styles/row.css"

// 定义 Gutter 类型
export type Gutter = number | undefined

// 定义 Row 组件的属性接口
export interface RowProps extends ComponentProps<"div"> {
    wrap?: boolean
    align?: RowVariants["align"]
    justify?: RowVariants["justify"]
    gutter?: Gutter | [Gutter, Gutter]
}

// 创建 RowContext 上下文
export const RowContext = createContext<{ colGap: Accessor<Gutter> }>({
    colGap: () => 0,
})

// 定义 Row 组件
export function Row(_props: RowProps) {
    // 拆分属性
    const [local, rest] = splitProps(_props, ["children", "align", "justify", "gutter"])
    const { align, justify, children, gutter } = destructure(local, { lazy: true })

    // 创建 colGap 计算属性
    const colGap = createMemo(() => {
        const value = gutter()
        // 处理 gutter 为数组或单个值的情况
        return Array.isArray(value) ? value[0] : value
    })

    // 创建 styles 计算属性
    const styles = createMemo<JSX.CSSProperties>(() => {
        const value = gutter()
        // 处理 gutter 为数组或单个值的情况
        const gutterValue = Array.isArray(value) ? value[0] : value
        // 确保 gutterValue 是有效的数字
        const rowGapValue = (typeof gutterValue === "number" ? gutterValue : 0)
        return {
            "row-gap": `${rowGapValue}px`,
        }
    })

    return (
        <RowContext.Provider value={{ colGap }}>
            <div
                {...rest}
                class={clsx(rowCss({
                    align: align(),
                    justify: justify(),
                }), rest.class)}
                style={combineStyle(styles(), rest.style)}
            >
                {children()}
            </div>
        </RowContext.Provider>
    )
}
