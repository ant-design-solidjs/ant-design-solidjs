import { Switch } from "@ant-design-solidjs/core"

function onChange(checked: boolean) {
    console.log(`switch to ${checked}`)
}

const App = () => <Switch defaultChecked onChange={onChange} />

export default App
