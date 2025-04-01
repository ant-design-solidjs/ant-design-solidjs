import { Flex } from "@ant-design-solidjs/core"
import { useParams } from "@solidjs/router"
import { createMemo } from "solid-js"
import { Page } from "../../components/page"
import { demos } from "../../content"

export default function () {
    const params = useParams()

    const components = createMemo(() => {
        return demos.get(params.id) || []
    })

    return (
        <Flex vertical>
            <Page demos={components()} />
        </Flex>
    )
}
