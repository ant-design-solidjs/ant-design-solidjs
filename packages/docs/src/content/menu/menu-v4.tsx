import type { MenuProps } from "@ant-design-solidjs/core"
import { Menu, Switch, Typography } from "@ant-design-solidjs/core"
import {
    AppstoreOutlined,
    CalendarOutlined,
    LinkOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design-solidjs/icons"
import { createSignal } from "solid-js"

type MenuItem = Required<MenuProps>["items"][number]

function App() {
    const [mode, setMode] = createSignal<"vertical" | "inline">("inline")

    const changeMode = (value: boolean) => {
        setMode(value ? "vertical" : "inline")
    }

    const items: MenuItem[] = [
        {
            key: "1",
            icon: <MailOutlined />,
            label: "Navigation One",
        },
        {
            key: "2",
            icon: <CalendarOutlined />,
            label: "Navigation Two",
        },
        {
            key: "sub1",
            icon: <AppstoreOutlined />,
            label: "Navigation Two",
            children: [
                {
                    key: "3",
                    label: (
                        <Typography.Text ellipsis>
                            Ant Design, a design language for background applications, is refined by Ant UED Team
                        </Typography.Text>
                    ),
                },
                {
                    key: "4",
                    label: "Option 4",
                },
                {
                    key: "sub1-2",
                    label: "Submenu",
                    children: [
                        { key: "5", label: "Option 5" },
                        { key: "6", label: "Option 6" },
                    ],
                },
            ],
        },
        {
            key: "sub2",
            label: "Navigation Three",
            icon: <SettingOutlined />,
            children: [
                { label: "Option 7", key: "7" },
                { label: "Option 8", key: "8" },
                { label: "Option 9", key: "9" },
                { label: "Option 10", key: "10" },
            ],
        },
        {
            key: "link",
            icon: <LinkOutlined />,
            label: (
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    Ant Design
                </a>
            ),
        },
    ]

    return (
        <>
            <Switch onChange={changeMode} />
            {" "}
            Change Mode
            <br />
            <br />
            {/* <ConfigProvider */}
            {/*    theme={{ */}
            {/*        components: { */}
            {/*            Menu: { */}
            {/*                itemBorderRadius: 0, */}
            {/*                subMenuItemBorderRadius: 0, */}
            {/*                itemHoverColor: "#1890ff", */}
            {/*                itemSelectedColor: "#1890ff", */}
            {/*                itemSelectedBg: "#e6f7ff", */}
            {/*                activeBarWidth: 3, */}
            {/*                itemMarginInline: 0, */}
            {/*                itemHoverBg: "transparent", */}
            {/*            }, */}
            {/*        }, */}
            {/*    }} */}
            {/* > */}
            <Menu
                style={{ width: `${256}px` }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode={mode()}
                items={items}
            />
            {/* </ConfigProvider> */}
        </>
    )
}

export default App
