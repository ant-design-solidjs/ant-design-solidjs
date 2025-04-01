import { Button, Space, Switch } from "@ant-design-solidjs/core"
import { createSignal } from "solid-js"

function App() {
    const [disabled, setDisabled] = createSignal(true)

    const toggle = () => {
        setDisabled(prev => !prev)
    }

    return (
        <Space direction="vertical">
            <Switch disabled={disabled()} defaultChecked />
            <Button onClick={toggle}>
                Toggle disabled
            </Button>
        </Space>
    )
}

export default App
