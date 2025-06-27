import type { MenuProps } from "@ant-design-solidjs/core"
import { Menu } from "@ant-design-solidjs/core"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design-solidjs/icons"
import { createSignal } from "solid-js"

type MenuItem = Required<MenuProps>["items"][number]

function App() {
    const [current, setCurrent] = createSignal("mail")

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e)
        setCurrent(e.key)
    }
    const items: MenuItem[] = [
        {
            label: "Navigation One",
            key: "mail",
            icon: <MailOutlined />,
        },
        {
            label: "Navigation Two",
            key: "app",
            icon: <AppstoreOutlined />,
            disabled: true,
        },
        {
            label: "Navigation Three - Submenu",
            key: "SubMenu",
            icon: <SettingOutlined />,
            children: [
                {
                    type: "group",
                    label: "Item 1",
                    children: [
                        { label: "Option 1", key: "setting:1" },
                        { label: "Option 2", key: "setting:2" },
                    ],
                },
                {
                    type: "group",
                    label: "Item 2",
                    children: [
                        { label: "Option 3", key: "setting:3" },
                        { label: "Option 4", key: "setting:4" },
                    ],
                },
            ],
        },
        {
            key: "alipay",
            label: (
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    Navigation Four - Link
                </a>
            ),
        },
    ]

    return <Menu onClick={onClick} selectedKeys={[current()]} mode="horizontal" items={items} />
}

export default App
