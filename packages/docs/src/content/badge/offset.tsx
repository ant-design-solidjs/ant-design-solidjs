import { Avatar, Badge } from "@ant-design-solidjs/core"

function App() {
    return (
        <Badge count={5} offset={[10, 10]}>
            <Avatar shape="square" size="large" />
        </Badge>
    )
}

export default App
