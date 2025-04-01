import { Col, Row, Slider } from "@ant-design-solidjs/core"
import { createSignal } from "solid-js"

const gutters: Record<PropertyKey, number> = {}
const vgutters: Record<PropertyKey, number> = {}
const colCounts: Record<PropertyKey, number> = {};

[8, 16, 24, 32, 40, 48].forEach((value, i) => {
    gutters[i] = value
});
[8, 16, 24, 32, 40, 48].forEach((value, i) => {
    vgutters[i] = value
});
[2, 3, 4, 6, 8, 12].forEach((value, i) => {
    colCounts[i] = value
})

function App() {
    const [gutterKey, setGutterKey] = createSignal(1)
    const [vgutterKey, setVgutterKey] = createSignal(1)
    const [colCountKey, setColCountKey] = createSignal(2)

    const cols = []
    const colCount = colCounts[colCountKey]
    let colCode = ""
    for (let i = 0; i < colCount; i++) {
        cols.push(
            <Col span={24 / colCount}>
                <div>Column</div>
            </Col>,
        )
        colCode += `  <Col span={${24 / colCount}} />\n`
    }

    return (
        <>
            <span>Horizontal Gutter (px): </span>
            <div style={{ width: "50%" }}>
                <Slider
                    min={0}
                    max={Object.keys(gutters).length - 1}
                    value={gutterKey()}
                    onChange={setGutterKey}
                    marks={gutters}
                    step={null}
                    tooltip={{ formatter: value => gutters[value as number] }}
                />
            </div>
            <span>Vertical Gutter (px): </span>
            <div style={{ width: "50%" }}>
                <Slider
                    min={0}
                    max={Object.keys(vgutters).length - 1}
                    value={vgutterKey()}
                    onChange={setVgutterKey()}
                    marks={vgutters}
                    step={null}
                    tooltip={{ formatter: value => vgutters[value as number] }}
                />
            </div>
            <span>Column Count:</span>
            <div style={{ "width": "50%", "margin-bottom": `${48}px` }}>
                <Slider
                    min={0}
                    max={Object.keys(colCounts).length - 1}
                    value={colCountKey}
                    onChange={setColCountKey}
                    marks={colCounts}
                    step={null}
                    tooltip={{ formatter: value => colCounts[value as number] }}
                />
            </div>
            <Row gutter={[gutters[gutterKey()], vgutters[vgutterKey()]]}>
                {cols}
                {cols}
            </Row>
            Another Row:
            <Row gutter={[gutters[gutterKey()], vgutters[vgutterKey()]]}>{cols}</Row>
            <pre class="demo-code">{`<Row gutter={[${gutters[gutterKey()]}, ${vgutters[vgutterKey()]}]}>\n${colCode}\n${colCode}</Row>`}</pre>
            <pre class="demo-code">{`<Row gutter={[${gutters[gutterKey()]}, ${vgutters[vgutterKey()]}]}>\n${colCode}</Row>`}</pre>
        </>
    )
}

export default App
