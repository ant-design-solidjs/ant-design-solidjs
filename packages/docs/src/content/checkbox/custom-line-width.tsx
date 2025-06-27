import { Checkbox } from "@ant-design-solidjs/core"

function App() {
    return (
        <>
            {/* <ConfigProvider */}
            {/*    theme={{ */}
            {/*        components: { */}
            {/*            Checkbox: { */}
            {/*                lineWidth: 6, */}
            {/*            }, */}
            {/*        }, */}
            {/*    }} */}
            {/* > */}
            <Checkbox checked />
            <Checkbox />
            {/* </ConfigProvider> */}
            <Checkbox checked />
            <Checkbox />
        </>
    )
}

export default App
