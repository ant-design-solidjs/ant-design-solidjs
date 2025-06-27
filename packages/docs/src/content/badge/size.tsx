import { Avatar, Badge, Space } from "@ant-design-solidjs/core"

function App() {
    return (
        <Space size="middle">
            <Badge size="default" count={5}>
                <Avatar shape="square" size="large" />
            </Badge>
            <Badge size="small" count={5}>
                <Avatar shape="square" size="large" />
            </Badge>
        </Space>
    )
}

export default App
