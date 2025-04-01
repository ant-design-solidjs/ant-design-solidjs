import type { ParentProps } from "solid-js"
import { Col, Divider, Row } from "@ant-design-solidjs/core"

function DemoBox(props: ParentProps<{ value: number }>) {
    return <p class={`height-${props.value}`}>{props.children}</p>
}

export default function App() {
    return (
        <>
            <Divider orientation="left">Align Top</Divider>
            <Row justify="center" align="top">
                <Col span={4}>
                    <DemoBox value={100}>col-4</DemoBox>
                </Col>
                <Col span={4}>
                    <DemoBox value={50}>col-4</DemoBox>
                </Col>
                <Col span={4}>
                    <DemoBox value={120}>col-4</DemoBox>
                </Col>
                <Col span={4}>
                    <DemoBox value={80}>col-4</DemoBox>
                </Col>
            </Row>

            <Divider orientation="left">Align Middle</Divider>
            <Row justify="space-around" align="middle">
                <Col span={4}>
                    <DemoBox value={100}>col-4</DemoBox>
                </Col>
                <Col span={4}>
                    <DemoBox value={50}>col-4</DemoBox>
                </Col>
                <Col span={4}>
                    <DemoBox value={120}>col-4</DemoBox>
                </Col>
                <Col span={4}>
                    <DemoBox value={80}>col-4</DemoBox>
                </Col>
            </Row>

            <Divider orientation="left">Align Bottom</Divider>
            <Row justify="space-between" align="bottom">
                <Col span={4}>
                    <DemoBox value={100}>col-4</DemoBox>
                </Col>
                <Col span={4}>
                    <DemoBox value={50}>col-4</DemoBox>
                </Col>
                <Col span={4}>
                    <DemoBox value={120}>col-4</DemoBox>
                </Col>
                <Col span={4}>
                    <DemoBox value={80}>col-4</DemoBox>
                </Col>
            </Row>
        </>
    )
}
