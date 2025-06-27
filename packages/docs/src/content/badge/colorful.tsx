import { Badge, Divider, Space } from "@ant-design-solidjs/core"
import { For } from "solid-js"

const colors = [
    "pink",
    "red",
    "yellow",
    "orange",
    "cyan",
    "green",
    "blue",
    "purple",
    "geekblue",
    "magenta",
    "volcano",
    "gold",
    "lime",
]

function App() {
    return (
        <>
            <Divider orientation="left">Presets</Divider>
            <Space direction="vertical">
                <For each={colors}>
                    {color => (
                        <Badge color={color} text={color} />
                    )}
                </For>
            </Space>
            <Divider orientation="left">Custom</Divider>
            <Space direction="vertical">
                <Badge color="#f50" text="#f50" />
                <Badge color="rgb(45, 183, 245)" text="rgb(45, 183, 245)" />
                <Badge color="hsl(102, 53%, 61%)" text="hsl(102, 53%, 61%)" />
                <Badge color="hwb(205 6% 9%)" text="hwb(205 6% 9%)" />
            </Space>
        </>
    )
}

export default App
