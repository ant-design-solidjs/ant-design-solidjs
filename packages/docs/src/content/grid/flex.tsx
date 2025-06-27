import { Col, Divider, Row } from "@ant-design-solidjs/core"

function App() {
    return (
        <>
            <Divider orientation="left">sub-element align left</Divider>
            <Row justify="start">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>

            <Divider orientation="left">sub-element align center</Divider>
            <Row justify="center">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>

            <Divider orientation="left">sub-element align right</Divider>
            <Row justify="end">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>

            <Divider orientation="left">sub-element monospaced arrangement</Divider>
            <Row justify="space-between">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>

            <Divider orientation="left">sub-element align full</Divider>
            <Row justify="space-around">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>

            <Divider orientation="left">sub-element align evenly</Divider>
            <Row justify="space-evenly">
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
                <Col span={4}>col-4</Col>
            </Row>
        </>
    )
}

export default App
