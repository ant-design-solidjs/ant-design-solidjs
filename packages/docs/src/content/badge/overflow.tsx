import { Avatar, Badge, Space } from "@ant-design-solidjs/core"

function App() {
    return (
        <Space size="large">
            <Badge count={99}>
                <Avatar shape="square" size="large" />
            </Badge>
            <Badge count={100}>
                <Avatar shape="square" size="large" />
            </Badge>
            <Badge count={99} overflowCount={10}>
                <Avatar shape="square" size="large" />
            </Badge>
            <Badge count={1000} overflowCount={999}>
                <Avatar shape="square" size="large" />
            </Badge>
        </Space>
    )
}

export default App
