import { Badge, Card, Space } from "@ant-design-solidjs/core"

function App() {
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Badge.Ribbon text="啦啦啦啦">
                <Card>推开窗户举起望远镜</Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="啦啦啦啦" color="purple">
                <Card>推开窗户举起望远镜</Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="啦啦啦啦" color="#2db7f5">
                <Card>推开窗户举起望远镜</Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="啦啦啦啦" color="#2db7f5" placement="start">
                <Card>推开窗户举起望远镜</Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="啦啦啦啦" color="#2db7f5" placement="end">
                <Card>推开窗户举起望远镜</Card>
            </Badge.Ribbon>
        </Space>
    )
}

export default App
