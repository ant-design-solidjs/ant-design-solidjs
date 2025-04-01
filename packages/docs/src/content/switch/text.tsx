import { Space, Switch } from "@ant-design-solidjs/core"
import { CheckOutlined, CloseOutlined } from "@ant-design-solidjs/icons"

function App() {
    return (
        <Space direction="vertical">
            <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
            <Switch checkedChildren="1" unCheckedChildren="0" />
            <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
            />
        </Space>
    )
}

export default App
