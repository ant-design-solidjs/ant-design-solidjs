import type { Demo } from "../../content"
import { Button, Card, Divider, Flex } from "@ant-design-solidjs/core"
import { CheckOutlined, CodeOutlined, CopyOutlined } from "@ant-design-solidjs/icons"
import { writeClipboard } from "@solid-primitives/clipboard"
import { createResource, createSignal, onMount, Show } from "solid-js"
import { highlightCode } from "./highlighter.ts"

export interface PreviewSourceProps {
    demo: Demo
}
export function PreviewSource({ demo }: PreviewSourceProps) {
    const [comp] = createResource(demo.component)
    const [markdown] = createResource(demo.markdown)

    const [rawCode, setRawCode] = createSignal("")
    const [code, setCode] = createSignal("")

    onMount(() => {
        demo.rawComponent().then((code) => {
            if (!code.default)
                return

            setRawCode(code.default)
            highlightCode(code?.default || "", "jsx").then((res) => {
                setCode(res)
            })
        })
    })

    const [showCode, setShowCode] = createSignal(false)

    const handleShowCode = (): void => {
        setShowCode(prev => !prev)
    }

    const [copied, setCopied] = createSignal(false)
    const handleCopyCode = (): void => {
        writeClipboard(rawCode()).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <Card>
            {comp()?.default}

            <Divider orientation="start">{markdown()?.attributes.title}</Divider>

            <article style={{ "font-size": `${14}px`, "color": "#000", "font-weight": 500 }} innerHTML={markdown()?.html} />

            <Divider />

            <Flex justify="center">
                <Button icon={<CodeOutlined style={{ "font-size": "16px" }} />} variant="text" onClick={handleShowCode} />
            </Flex>

            <Show when={showCode()}>
                <div style={{ position: "relative" }}>
                    <Divider variant="dashed" />

                    <Button
                        onClick={handleCopyCode}
                        icon={(
                            <Show when={copied()} fallback={<CopyOutlined />}>
                                <CheckOutlined style={{ color: "green" }} />
                            </Show>
                        )}
                        variant="text"
                        style={{ position: "absolute", top: "10px", right: 0 }}
                    />

                    <div style={{ "overflow-x": "auto", "width": "100%" }}>
                        <div innerHTML={code()} style={{ "font-size": "15px", "font-weight": 600 }} />
                    </div>
                </div>
            </Show>
        </Card>
    )
}
