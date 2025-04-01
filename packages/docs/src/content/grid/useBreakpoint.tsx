import { Grid, Tag } from "@ant-design-solidjs/core"
import { For } from "solid-js"

const { useBreakpoint } = Grid

function App() {
    const screens = useBreakpoint()

    return (
        <>
            Current break point:
            <For each={Object.entries(screens)
                .filter(screen => !!screen[1])}
            >
                {screen => (
                    <Tag color="blue" key={screen[0]}>
                        {screen[0]}
                    </Tag>
                )}
            </For>
        </>
    )
}

export default App
