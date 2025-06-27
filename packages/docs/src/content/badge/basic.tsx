import { Avatar, Badge, Space } from "@ant-design-solidjs/core"
import { ClockCircleOutlined } from "@ant-design-solidjs/icons"

function App() {
    return (
        <Space size="middle">
            <Badge count={5}>
                <Avatar shape="square" size="large" />
            </Badge>
            <Badge count={0} showZero>
                <Avatar shape="square" size="large" />
            </Badge>
            <Badge count={<ClockCircleOutlined style={{ color: "#f5222d" }} />}>
                <Avatar shape="square" size="large" />
            </Badge>
        </Space>
    )
}

export default App
