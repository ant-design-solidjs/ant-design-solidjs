import { Avatar, Badge, Button, Space, Switch } from "@ant-design-solidjs/core"
import { MinusOutlined, PlusOutlined, QuestionOutlined } from "@ant-design-solidjs/icons"
import { createSignal } from "solid-js"

function App() {
    const [count, setCount] = createSignal(5)
    const [show, setShow] = createSignal(true)

    const increase = () => {
        setCount(prev => prev + 1)
    }

    const decline = () => {
        let newCount = count() - 1
        if (newCount < 0) {
            newCount = 0
        }
        setCount(newCount)
    }

    const random = () => {
        const newCount = Math.floor(Math.random() * 100)
        setCount(newCount)
    }

    const onChange = (checked: boolean) => {
        setShow(checked)
    }

    return (
        <Space direction="vertical">
            <Space size="large">
                <Badge count={count()}>
                    <Avatar shape="square" size="large" />
                </Badge>
                <Space.Compact>
                    <Button onClick={decline} icon={<MinusOutlined />} />
                    <Button onClick={increase} icon={<PlusOutlined />} />
                    <Button onClick={random} icon={<QuestionOutlined />} />
                </Space.Compact>
            </Space>
            <Space size="large">
                <Badge dot={show()}>
                    <Avatar shape="square" size="large" />
                </Badge>
                <Switch onChange={onChange} checked={show()} />
            </Space>
        </Space>
    )
}

export default App
