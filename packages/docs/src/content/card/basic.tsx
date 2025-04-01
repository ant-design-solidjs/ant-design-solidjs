import { Card, Space } from "@ant-design-solidjs/core"

export default function App() {
    return (
        <Space direction="vertical" size={16}>
            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: `${300}px` }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>

            <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: `${300}px` }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        </Space>
    )
}
