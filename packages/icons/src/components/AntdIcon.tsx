import type { IconDefinition } from "@ant-design/icons-svg/es/types"
import type { Component } from "solid-js"
import type { IconBaseProps } from "./Icon"
import type { TwoToneColor } from "./twoTonePrimaryColor"
import { blue } from "@ant-design/colors"

import classNames from "clsx"
import { splitProps, useContext } from "solid-js"
import { normalizeTwoToneColors } from "../utils"
import Context from "./Context"
import ReactIcon from "./IconBase"
import { getTwoToneColor, setTwoToneColor } from "./twoTonePrimaryColor"

export interface AntdIconProps extends IconBaseProps {
    twoToneColor?: TwoToneColor
    ref?: HTMLSpanElement
}

export interface IconComponentProps extends AntdIconProps {
    icon: IconDefinition
}

// Initial setting
// should move it to antd main repo?
setTwoToneColor(blue.primary)

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34757#issuecomment-488848720
interface IconBaseComponent<Props> extends Component<Props> {
    getTwoToneColor: typeof getTwoToneColor
    setTwoToneColor: typeof setTwoToneColor
}

const Icon = ((props: IconComponentProps) => {
    const [local, restProps] = splitProps(props, ["class", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"])

    const { prefixCls = "anticon", rootClassName } = useContext(Context)

    const classString = () => classNames(
        rootClassName,
        prefixCls,
        {
            [`${prefixCls}-${local.icon.name}`]: !!local.icon.name,
            [`${prefixCls}-spin`]: !!local.spin || local.icon.name === "loading",
        },
        local.class,
    )

    const iconTabIndex = () => {
        let iconTabIndex = local.tabIndex
        if (iconTabIndex === undefined && local.onClick) {
            iconTabIndex = -1
        }
        return iconTabIndex
    }

    const svgStyle = () => local.rotate
        ? {
            msTransform: `rotate(${local.rotate}deg)`,
            transform: `rotate(${local.rotate}deg)`,
        }
        : undefined

    const [primaryColor, secondaryColor] = normalizeTwoToneColors(local.twoToneColor)

    return (
        <span
            role="img"
            aria-label={local.icon.name}
            {...restProps}
            tabIndex={iconTabIndex()}
            onClick={local.onClick}
            class={classString()}
        >
            <ReactIcon
                icon={local.icon}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                style={svgStyle()}
            />
        </span>
    )
}) as IconBaseComponent<IconComponentProps>

Icon.getTwoToneColor = getTwoToneColor
Icon.setTwoToneColor = setTwoToneColor

export default Icon
