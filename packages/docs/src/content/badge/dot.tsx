import { Badge, Space } from "@ant-design-solidjs/core"
import { NotificationOutlined } from "@ant-design-solidjs/icons"

function App() {
    return (
        <Space>
            <Badge dot>
                <NotificationOutlined style={{ "font-size": `${16}px` }} />
            </Badge>
            <Badge dot>
                <a href="#">Link something</a>
            </Badge>
        </Space>
    )
}

export default App
