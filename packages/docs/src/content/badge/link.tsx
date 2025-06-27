import { Avatar, Badge } from "@ant-design-solidjs/core"

function App() {
    return (
        <a href="#">
            <Badge count={5}>
                <Avatar shape="square" size="large" />
            </Badge>
        </a>
    )
}

export default App
