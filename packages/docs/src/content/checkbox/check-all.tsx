import type { CheckboxProps } from "@ant-design-solidjs/core"
import { Checkbox, Divider } from "@ant-design-solidjs/core"
import { createSignal } from "solid-js"

const CheckboxGroup = Checkbox.Group

const plainOptions = ["Apple", "Pear", "Orange"]
const defaultCheckedList = ["Apple", "Orange"]

function App() {
    const [checkedList, setCheckedList] = createSignal<string[]>(defaultCheckedList)

    const checkAll = () => plainOptions.length === checkedList().length
    const indeterminate = () => checkedList().length > 0 && checkedList().length < plainOptions.length

    const onChange = (list: string[]) => {
        setCheckedList(list)
    }

    const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
        setCheckedList(e.target.checked ? plainOptions : [])
    }

    return (
        <>
            <Checkbox indeterminate={indeterminate()} onChange={onCheckAllChange} checked={checkAll()}>
                Check all
            </Checkbox>
            <Divider />
            <CheckboxGroup options={plainOptions} value={checkedList()} onChange={onChange} />
        </>
    )
}

export default App
