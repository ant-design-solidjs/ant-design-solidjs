import type { MenuKey, MenuProps } from "@ant-design-solidjs/core"
import { Menu } from "@ant-design-solidjs/core"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design-solidjs/icons"
import { createSignal } from "solid-js"

type MenuItem = Required<MenuProps>["items"][number]

const items: MenuItem[] = [
    {
        key: "1",
        icon: <MailOutlined />,
        label: "Navigation One",
        children: [
            { key: "11", label: "Option 1" },
            { key: "12", label: "Option 2" },
            { key: "13", label: "Option 3" },
            { key: "14", label: "Option 4" },
        ],
    },
    {
        key: "2",
        icon: <AppstoreOutlined />,
        label: "Navigation Two",
        children: [
            { key: "21", label: "Option 1" },
            { key: "22", label: "Option 2" },
            {
                key: "23",
                label: "Submenu",
                children: [
                    { key: "231", label: "Option 1" },
                    { key: "232", label: "Option 2" },
                    { key: "233", label: "Option 3" },
                ],
            },
            {
                key: "24",
                label: "Submenu 2",
                children: [
                    { key: "241", label: "Option 1" },
                    { key: "242", label: "Option 2" },
                    { key: "243", label: "Option 3" },
                ],
            },
        ],
    },
    {
        key: "3",
        icon: <SettingOutlined />,
        label: "Navigation Three",
        children: [
            { key: "31", label: "Option 1" },
            { key: "32", label: "Option 2" },
            { key: "33", label: "Option 3" },
            { key: "34", label: "Option 4" },
        ],
    },
]

interface LevelKeysProps {
    key?: string
    children?: LevelKeysProps[]
}

function getLevelKeys(items1: LevelKeysProps[]) {
    const key: Record<string, number> = {}
    const func = (items2: LevelKeysProps[], level = 1) => {
        items2.forEach((item) => {
            if (item.key) {
                key[item.key] = level
            }
            if (item.children) {
                func(item.children, level + 1)
            }
        })
    }
    func(items1)
    return key
}

const levelKeys = getLevelKeys(items as LevelKeysProps[])

function App() {
    const [stateOpenKeys, setStateOpenKeys] = createSignal<MenuKey[]>(["2", "23"])

    const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
        const currentOpenKey = openKeys.find(key => !stateOpenKeys().includes(key))
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter(key => key !== currentOpenKey)
                .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey])

            setStateOpenKeys(
                openKeys
                // remove repeat key
                    .filter((_, index) => index !== repeatIndex)
                // remove current level all child
                    .filter(key => levelKeys[key] <= levelKeys[currentOpenKey]),
            )
        }
        else {
            // close
            setStateOpenKeys(openKeys)
        }
    }

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={["231"]}
            openKeys={stateOpenKeys()}
            onOpenChange={onOpenChange}
            style={{ width: `${256}px` }}
            items={items}
        />
    )
}

export default App
