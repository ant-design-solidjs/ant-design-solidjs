import type { RecipeVariants } from "@vanilla-extract/recipes"
import { token } from "@ant-design-solidjs/theme"
import { globalStyle } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { recipe } from "@vanilla-extract/recipes"
import { resetStyle } from "../../styles"
import { itemSelectedCss, itemSubmenuSelectedCss, menuItemCss } from "./item.css"
import {
    activeBarBorderWidth,
    activeBarHeight,
    activeBarWidth,
    groupTitleColor,
    groupTitleFontSize,
    groupTitleLineHeight,
    horizontalItemBorderRadius,
    horizontalItemSelectedColor,
    horizontalLineHeight,
    iconMarginInlineEnd,
    itemBorderRadius,
    itemHeight,
    itemHoverBg,
    itemHoverColor,
    itemSelectedBgColor,
    itemSelectedColor,
    menuItemBg,
    menuItemColor,
    menuItemMarginBlock,
    menuItemMarginInline,
    menuItemPaddingInline,
    menuItemWidth,
} from "./var.css"

export const menuCss = recipe({
    base: [
        resetStyle,
        {
            vars: {
                [horizontalLineHeight]: calc(token.height.large).multiply(1.15).toString(),
                [menuItemColor]: token.colors.text.default,
                [menuItemBg]: token.colors.bg.container,
                [menuItemPaddingInline]: token.size.default,
                [activeBarBorderWidth]: token.line.width,
                [iconMarginInlineEnd]: calc(token.height.small).subtract(token.fontSize.default).toString(),
                [horizontalItemBorderRadius]: "0",
                [itemHoverColor]: token.colors.text.default,
                [horizontalItemSelectedColor]: token.colors.primary.default,
                [activeBarHeight]: token.line.widthBold,
                [itemSelectedColor]: token.colors.primary.default,
                [itemSelectedBgColor]: "transparent",
                [activeBarWidth]: "2px",
                [itemHeight]: token.height.large,
                [groupTitleFontSize]: token.fontSize.default,
                [groupTitleLineHeight]: token.lineHeight.default,
                [groupTitleColor]: token.colors.text.description,
                [menuItemMarginInline]: token.size.xxs,
                [menuItemMarginBlock]: token.size.xxs,
                [menuItemWidth]: calc("100%").subtract(calc(menuItemMarginInline).multiply(2)).toString(),
                [itemHoverBg]: token.colors.fill.secondary,
                [itemBorderRadius]: token.borderRadius.lg,
            },
            paddingInlineStart: 0,
            outline: "none",
            transition: `width ${token.motion.slow} cubic-bezier(0.2, 0, 0, 1) 0s`,
            selectors: {
                "&:before": {
                    display: "table",
                    content: "",
                },
                "&:after": {
                    display: "table",
                    clear: "both",
                    content: "",
                },
            },
        },
    ],
    variants: {
        mode: {
            vertical: {},
            horizontal: {
                lineHeight: horizontalLineHeight,
                border: 0,
                borderBottom: `${token.line.width} ${token.line.type} ${token.colors.split}`,
                boxShadow: "none",
                display: "flex",
                selectors: {
                    "&:after": {
                        display: "block",
                        clear: "both",
                        height: 0,
                        content: "\\20",
                    },
                },
            },
            inline: {
                boxShadow: "none",
            },
        },
        theme: {
            light: {
                color: menuItemColor,
                background: menuItemBg,
            },
            dark: {},
        },
    },
    defaultVariants: {
        mode: "vertical",
    },
})

export type MenuVariants = Exclude<RecipeVariants<typeof menuCss>, undefined>

globalStyle(`${menuCss.classNames.variants.mode.horizontal} ${menuItemCss}`, {
    flex: "none",
})

globalStyle(`${menuCss.classNames.variants.mode.horizontal} ${menuItemCss}`, {
    position: "relative",
    display: "inline-block",
    verticalAlign: "bottom",
    paddingInline: menuItemPaddingInline,
    transition: `border-color ${token.motion.slow},background ${token.motion.slow}`,
})

// .ant-menu-light.ant-menu-horizontal >.ant-menu-item, .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-item,
// .ant-menu-light.ant-menu-horizontal >.ant-menu-submenu, .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-submenu
globalStyle(`${menuCss.classNames.variants.mode.horizontal} ${menuItemCss},`, {
    top: activeBarBorderWidth,
    marginTop: calc(activeBarBorderWidth).multiply(-1).toString(),
    marginBottom: 0,
    borderRadius: horizontalItemBorderRadius,
})

// .ant-menu-light .ant-menu-item:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected):hover,
// .ant-menu-light>.ant-menu .ant-menu-item:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected):hover,
// .ant-menu-light .ant-menu-item:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected) >.ant-menu-submenu-title:hover,
// .ant-menu-light>.ant-menu .ant-menu-item:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected) >.ant-menu-submenu-title:hover
globalStyle(`${menuItemCss}:not(${itemSelectedCss}):not(${itemSubmenuSelectedCss}):hover`, {
    color: itemHoverColor,
})

// .ant-menu-light.ant-menu-horizontal >.ant-menu-item:hover::after,
// .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-item:hover::after,
// .ant-menu-light.ant-menu-horizontal >.ant-menu-submenu:hover::after,
// .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-submenu:hover::after,
// .ant-menu-light.ant-menu-horizontal >.ant-menu-item-active::after,
// .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-item-active::after,
// .ant-menu-light.ant-menu-horizontal >.ant-menu-submenu-active::after,
// .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-submenu-active::after,
// .ant-menu-light.ant-menu-horizontal >.ant-menu-item-open::after,
// .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-item-open::after,
// .ant-menu-light.ant-menu-horizontal >.ant-menu-submenu-open::after,
// .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-submenu-open::after
globalStyle(`${menuCss.classNames.variants.mode.horizontal} >${menuItemCss}:hover::after, ${menuCss.classNames.variants.mode.horizontal} >${menuItemCss}${itemSelectedCss}::after`, {
    borderBlockWidth: activeBarWidth,
    borderBottomColor: horizontalItemSelectedColor,
})

// .ant-menu-light.ant-menu-horizontal >.ant-menu-item::after,
// .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-item::after,
// .ant-menu-light.ant-menu-horizontal >.ant-menu-submenu::after,
// .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-submenu::after
globalStyle(`${menuCss.classNames.variants.mode.horizontal} ${menuItemCss}::after`, {
    position: "absolute",
    insetInline: menuItemPaddingInline,
    bottom: 0,
    borderBottom: `${activeBarHeight} solid transparent`,
    content: "",
    transition: `border-color ${token.motion.slow} ${token.motion.easeInOut}`,
})

// .ant-menu-light.ant-menu-horizontal >.ant-menu-item-selected,
// .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-item-selected,
// .ant-menu-light.ant-menu-horizontal >.ant-menu-submenu-selected,
// .ant-menu-light>.ant-menu.ant-menu-horizontal >.ant-menu-submenu-selected
globalStyle(`${menuCss.classNames.variants.mode.horizontal} ${itemSelectedCss}`, {
    color: itemSelectedColor,
    background: itemSelectedBgColor,
})

globalStyle(`${menuCss.classNames.variants.mode.inline} ${menuItemCss}`, {
    height: itemHeight,
    lineHeight: itemHeight,
    listStylePosition: "inside",
    listStyleType: "disc",
})

globalStyle(`${menuCss.classNames.variants.mode.inline} ${menuItemCss}, ${menuCss.classNames.variants.mode.vertical} ${menuItemCss}`, {
    height: itemHeight,
    lineHeight: itemHeight,
    paddingInline: menuItemPaddingInline,
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginInline: menuItemMarginInline,
    marginBlock: menuItemMarginBlock,
    width: menuItemWidth,
})

// .ant-menu-light:not(.ant-menu-horizontal) .ant-menu-item:not(.ant-menu-item-selected):hover,
// .ant-menu-light>.ant-menu:not(.ant-menu-horizontal) .ant-menu-item:not(.ant-menu-item-selected):hover
globalStyle(`${menuCss.classNames.base}:not(${menuCss.classNames.variants.mode.horizontal}) ${menuItemCss}:not(${itemSelectedCss}):hover`, {
    backgroundColor: itemHoverBg,
})
