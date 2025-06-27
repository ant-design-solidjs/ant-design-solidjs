import type { JSX } from "solid-js"
import { Checkbox, ConfigProvider, Radio, Space } from "@ant-design-solidjs/core"

const sharedStyle: JSX.CSSProperties = {
    "border": "1px solid red",
    "margin-bottom": `${16}px`,
}

function App() {
    return (
        <div>
            <Space style={sharedStyle} align="center">
                <Checkbox value="light" />
                <div>Bamboo</div>
                <Checkbox value="little">Little</Checkbox>
            </Space>

            <Space style={sharedStyle} align="center">
                <Radio value="light" />
                <div>Bamboo</div>
                <Radio value="little">Little</Radio>
            </Space>

            <div
                style={{
                    ...sharedStyle,
                    "display": "flex",
                    "align-items": "center",
                }}
            >
                <Checkbox value="light" />
                <div>Bamboo</div>
                <Checkbox value="little">Little</Checkbox>
            </div>

            <div
                style={{
                    ...sharedStyle,
                    "display": "flex",
                    "align-items": "center",
                }}
            >
                <Radio value="light" />
                <div>Bamboo</div>
                <Radio value="little">Little</Radio>
            </div>

            <div>
                <ConfigProvider
                    theme={{
                        token: {
                            controlHeight: 48,
                        },
                    }}
                >
                    <Checkbox>Aligned</Checkbox>
                </ConfigProvider>
            </div>

            <div>
                <Checkbox>
                    <span style={{ "font-size": `${32}px` }}>Aligned</span>
                </Checkbox>
            </div>
        </div>
    )
}

export default App
