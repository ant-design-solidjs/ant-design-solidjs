import type { MenuProps } from "@ant-design-solidjs/core"
import { Flex, Menu, Space } from "@ant-design-solidjs/core"
import { DownOutlined, MailOutlined } from "@ant-design-solidjs/icons"

type MenuItem = Required<MenuProps>["items"][number]

const items1: MenuItem[] = [
    {
        key: "sub1",
        icon: <MailOutlined />,
        label: "Navigation One",
        children: [
            {
                key: "1",
                label: (
                    <Flex justify="space-between">
                        <span>Option 1</span>
                        <DownOutlined />
                    </Flex>
                ),
            },
            {
                key: "2",
                label: "Option 2",
                extra: "⌘P",
            },
            {
                key: "3",
                label: <a href="https://www.baidu.com">Link Option</a>,
                disabled: true,
            },
        ],
    },
]

const items2: MenuItem[] = [
    { key: "1", label: "Users", extra: "⌘U" },
    { key: "2", label: "Profile", extra: "⌘P" },
]

function App() {
    return (
        <Space direction="vertical">
            <Menu
                mode="inline"
                defaultOpenKeys={["sub1"]}
                defaultSelectedKeys={["1"]}
                style={{ width: `${256}px` }}
                items={items1}
            />
            <Menu theme="dark" style={{ width: `${256}px` }} items={items2} />
        </Space>
    )
}

export default App
