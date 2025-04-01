import { Col, Row } from "@ant-design-solidjs/core"

function App() {
    return (
        <Row>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                Col
            </Col>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                Col
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                Col
            </Col>
        </Row>
    )
}

export default App
