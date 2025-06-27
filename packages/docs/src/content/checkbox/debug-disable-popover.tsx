import { Checkbox, Popover } from "@ant-design-solidjs/core"

function App() {
    return (
        <div style={{ padding: `${56}px` }}>
            <Popover content="xxxx" trigger="hover">
                <Checkbox disabled checked />
            </Popover>
        </div>
    )
}

export default App
