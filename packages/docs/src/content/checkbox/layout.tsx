import type { GetProp } from "@ant-design-solidjs/core"
import { Checkbox, Col, Row } from "@ant-design-solidjs/core"

const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (checkedValues) => {
    console.log("checked = ", checkedValues)
}

function App() {
    return (
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
            <Row>
                <Col span={8}>
                    <Checkbox value="A">A</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="B">B</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="C">C</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="D">D</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="E">E</Checkbox>
                </Col>
            </Row>
        </Checkbox.Group>
    )
}

export default App
