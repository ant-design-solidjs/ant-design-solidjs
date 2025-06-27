import type { CheckboxProps } from "@ant-design-solidjs/core"
import { Button, Checkbox } from "@ant-design-solidjs/core"
import { createSignal } from "solid-js"

function App() {
    const [checked, setChecked] = createSignal(true)
    const [disabled, setDisabled] = createSignal(false)

    const toggleChecked = () => {
        setChecked(!checked())
    }

    const toggleDisable = () => {
        setDisabled(!disabled())
    }

    const onChange: CheckboxProps["onChange"] = (e) => {
        console.log("checked = ", e.target.checked)
        setChecked(e.target.checked)
    }

    const label = () => `${checked() ? "Checked" : "Unchecked"}-${disabled() ? "Disabled" : "Enabled"}`

    return (
        <>
            <p style={{ "margin-bottom": "20px" }}>
                <Checkbox checked={checked()} disabled={disabled()} onChange={onChange}>{label()}</Checkbox>
            </p>
            <p>
                <Button size="small" onClick={toggleChecked}>
                    {!checked() ? "Check" : "Uncheck"}
                </Button>

                <Button style={{ margin: "0 10px" }} size="small" onClick={toggleDisable}>
                    {!disabled() ? "Disable" : "Enable"}
                </Button>
            </p>
        </>
    )
}

export default App
