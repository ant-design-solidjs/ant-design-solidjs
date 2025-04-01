import { Col, Row } from "@ant-design-solidjs/core"

function App() {
    return (
        <Row>
            <Col span={18} push={6}>
                col-18 col-push-6
            </Col>
            <Col span={6} pull={18}>
                col-6 col-pull-18
            </Col>
        </Row>
    )
}

export default App
