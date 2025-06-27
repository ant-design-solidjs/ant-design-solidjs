import type { CheckboxProps } from "@ant-design-solidjs/core"
import { Checkbox } from "@ant-design-solidjs/core"

const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`)
}

const App = () => <Checkbox onChange={onChange}>Checkbox</Checkbox>

export default App
