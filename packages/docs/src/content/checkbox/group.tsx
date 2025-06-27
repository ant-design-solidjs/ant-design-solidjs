import type { GetProp } from "@ant-design-solidjs/core"
import { Checkbox } from "@ant-design-solidjs/core"

const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (checkedValues) => {
    console.log("checked = ", checkedValues)
}

const plainOptions = ["Apple", "Pear", "Orange"]

const options = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
]

const optionsWithDisabled = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange", disabled: false },
]

function App() {
    return (
        <>
            <Checkbox.Group options={plainOptions} defaultValue={["Apple"]} onChange={onChange} />
            <br />
            <br />
            <Checkbox.Group options={options} defaultValue={["Pear"]} onChange={onChange} />
            <br />
            <br />
            <Checkbox.Group
                options={optionsWithDisabled}
                disabled
                defaultValue={["Apple"]}
                onChange={onChange}
            />
        </>
    )
}

export default App
