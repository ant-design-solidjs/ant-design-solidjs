import { Badge, Space } from "@ant-design-solidjs/core"

function App() {
    return (
        <>
            <Space>
                <Badge status="success" />
                <Badge status="error" />
                <Badge status="default" />
                <Badge status="processing" />
                <Badge status="warning" />
            </Space>
            <br />
            <Space direction="vertical">
                <Badge status="success" text="Success" />
                <Badge status="error" text="Error" />
                <Badge status="default" text="Default" />
                <Badge status="processing" text="Processing" />
                <Badge status="warning" text="Warning" />
            </Space>
        </>
    )
}

export default App
