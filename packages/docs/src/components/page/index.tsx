import type { Demo } from "../../content"
import { Col, Row } from "@ant-design-solidjs/core"
import { For } from "solid-js"
import { PreviewSource } from "../preview-source"

export function Page({ demos }: { demos: Array<Demo> }) {
    return (
        <Row gutter={16}>
            <For each={demos}>
                {
                    demo => (
                        <Col span={12}>
                            <PreviewSource demo={demo} />
                        </Col>
                    )
                }
            </For>
        </Row>
    )
}
