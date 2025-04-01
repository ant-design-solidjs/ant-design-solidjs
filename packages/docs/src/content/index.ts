// 定义正则表达式，用于从文件路径中提取组件名称
const regex = /(?:\.\/|\/)([^/]+)/

// 定义 import.meta.glob 返回类型的接口
type GlobImport<T> = Record<string, () => Promise<T>>

// 使用 import.meta.glob 动态导入所有 .tsx 文件
const components = import.meta.glob("./**/*.tsx") as GlobImport<{ default: any }>
// 使用 import.meta.glob 动态导入所有 .tsx 文件的原始内容
const rawComponents = import.meta.glob("./**/*.tsx", { query: "?raw" }) as GlobImport<{ default: string }>
// 使用 import.meta.glob 动态导入所有 .md 文件
const markdowns = import.meta.glob("./**/*.md") as GlobImport<{ html: string, attributes: Record<string, string> }>

// 定义 Demo 接口，描述每个演示组件的结构
export interface Demo {
    component: () => Promise<{ default: any }>
    markdown: () => Promise<{ html: string, attributes: Record<string, string> }>
    rawComponent: () => Promise<{ default: string }>
}

// 创建一个 Map 用于存储每个组件名称对应的演示组件数组
export const demos = new Map<string, Array<Demo>>()

// 遍历所有导入的组件
Object.keys(components).forEach((componentPath) => {
    // 使用正则表达式匹配组件名称
    const matchResult = componentPath.match(regex)

    // 如果匹配失败或结果不符合预期，跳过当前组件
    if (!matchResult || matchResult.length !== 2) {
        return
    }

    // 提取组件名称
    const componentName = matchResult[1]

    // 获取该组件名称对应的演示组件数组，如果不存在则创建一个新数组
    const demoItems = demos.get(componentName) ?? []

    const markdown = markdowns[componentPath.replace(".tsx", ".md")]

    // 将当前组件添加到演示组件数组中，并关联对应的 Markdown 文件和原始组件内容
    demoItems.push({
        component: components[componentPath],
        markdown: markdown || (() => Promise.resolve({ html: "" })),
        rawComponent: rawComponents[componentPath],
    })

    // 更新 Map 中该组件名称对应的演示组件数组
    demos.set(componentName, demoItems)
})
