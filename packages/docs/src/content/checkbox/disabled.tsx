import { Checkbox } from "@ant-design-solidjs/core"

function App() {
    return (
        <>
            <Checkbox defaultChecked={false} disabled />
            <br />
            <Checkbox indeterminate disabled />
            <br />
            <Checkbox defaultChecked disabled />
        </>
    )
}

export default App
