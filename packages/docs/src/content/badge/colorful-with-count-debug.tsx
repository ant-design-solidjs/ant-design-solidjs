import { Badge, Space } from "@ant-design-solidjs/core"
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

function AvatarItem({ color }: { color: string }) {
    return (
        <div
            style={{
                "width": `${90}px`,
                "height": `${90}px`,
                "line-height": "90px",
                "background": "#ccc",
                "text-align": "center",
            }}
        >
            {color}
        </div>
    )
}

function App() {
    return (
        <>
            <Space wrap size={["large", "middle"]}>
                <For each={colors}>
                    {color => (
                        <Badge color={color} count={44}>
                            <AvatarItem color={color} />
                        </Badge>
                    )}
                </For>
            </Space>
            <Space wrap size={["large", "middle"]}>
                <For each={colors}>
                    {color => (
                        <Badge status="processing" color={color} text="loading" />
                    )}
                </For>
            </Space>
        </>
    )
}

export default App
