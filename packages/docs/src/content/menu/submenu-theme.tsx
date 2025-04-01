import type { MenuProps, MenuTheme } from "@ant-design-solidjs/core"
import { Menu, Switch } from "@ant-design-solidjs/core"
import { MailOutlined } from "@ant-design-solidjs/icons"
import { createSignal } from "solid-js"

type MenuItem = Required<MenuProps>["items"][number]

function App() {
    const [menuTheme, setMenuTheme] = createSignal<MenuTheme>("light")
    const [current, setCurrent] = createSignal("1")

    const changeTheme = (value: boolean) => {
        setMenuTheme(value ? "dark" : "light")
    }

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key)
    }

    const items: MenuItem[] = [
        {
            key: "sub1",
            icon: <MailOutlined />,
            label: "Navigation One",
            theme: menuTheme(),
            children: [
                { key: "1", label: "Option 1" },
                { key: "2", label: "Option 2" },
                { key: "3", label: "Option 3" },
            ],
        },
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
    ]

    return (
        <>
            <Switch
                checked={menuTheme() === "dark"}
                onChange={changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />
            <br />
            <br />
            <Menu
                onClick={onClick}
                style={{ width: `${256}px` }}
                openKeys={["sub1"]}
                selectedKeys={[current()]}
                mode="vertical"
                theme="dark"
                items={items}
                getPopupContainer={node => node.parentNode as HTMLElement}
            />
        </>
    )
}

export default App
