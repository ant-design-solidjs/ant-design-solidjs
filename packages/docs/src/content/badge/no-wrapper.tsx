import { Badge, Space, Switch } from "@ant-design-solidjs/core"
import { ClockCircleOutlined } from "@ant-design-solidjs/icons"
import { createSignal } from "solid-js"

function App() {
    const [show, setShow] = createSignal(true)

    return (
        <Space>
            <Switch checked={show()} onChange={() => setShow(!show())} />
            <Badge count={show() ? 11 : 0} showZero color="#faad14" />
            <Badge count={show() ? 25 : 0} />
            <Badge count={show() ? <ClockCircleOutlined style={{ color: "#f5222d" }} /> : 0} />
            <Badge
                class="site-badge-count-109"
                count={show() ? 109 : 0}
                style={{ "background-color": "#52c41a" }}
            />
        </Space>
    )
}

export default App
