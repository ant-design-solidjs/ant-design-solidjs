import type { JSX } from "solid-js"
import { Col, Divider, Row } from "@ant-design-solidjs/core"

const style: JSX.CSSProperties = { background: "#0092ff", padding: "8px 0" }

function App() {
    return (
        <>
            <Divider orientation="left">Horizontal</Divider>
            <Row gutter={16}>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
            </Row>
            <Divider orientation="left">Responsive</Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
            </Row>
            <Divider orientation="left">Vertical</Divider>
            <Row gutter={[16, 24]}>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
                <Col class="gutter-row" span={6}>
                    <div style={style}>col-6</div>
                </Col>
            </Row>
        </>
    )
}

export default App
