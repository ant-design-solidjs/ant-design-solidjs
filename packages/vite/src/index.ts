import type { SeedToken } from "@ant-design-solidjs/theme"
import type { Plugin } from "vite"
import { genVars } from "@ant-design-solidjs/theme"
import { transformCss } from "@vanilla-extract/css/transformCss"

export interface Option {
    token?: Partial<SeedToken>
}
// let isCssInjected = false
export default function ({
    token = {},
}: Option = {}): Plugin {
    const css = transformCss({
        localClassNames: [],
        cssObjs: [
            {
                type: "local",
                selector: ":root",
                rule: {
                    vars: genVars(token || {}),
                },
            },
        ],
        composedClassLists: [],
    })
    const style = css[0]
    // 添加一个唯一的标识
    // const uniqueIdentifier = "/* ANT_DESIGN_VARS_INJECTED */";
    // const styleWithIdentifier = `${uniqueIdentifier}${style}`;

    return {
        name: "vite-plugin-xonic",
        // transform: async (code, id) => {
        //     if (id.endsWith(".css") && !isCssInjected) {
        //         isCssInjected = true;
        //         return  `${styleWithIdentifier}\n${code}`;
        //     }
        //     return code;
        // },
        // handleHotUpdate() {
        //     isCssInjected = false;
        //     return [];
        // },
        transformIndexHtml(html) {
            return html.replace("</head>", `<style>${style}</style></head>`)
        },
    }
}
