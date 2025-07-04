import { Avatar, Badge, Space } from "@ant-design-solidjs/core"
import { NotificationOutlined } from "@ant-design-solidjs/icons"

/** Test usage. Do not use in your production. */
export default () => (
    // <ConfigProvider
    //     theme={{
    //         components: {
    //             Badge: {
    //                 indicatorHeight: 24,
    //                 indicatorHeightSM: 18,
    //                 dotSize: 4,
    //                 textFontWeight: "bold",
    //                 statusSize: 8,
    //             },
    //         },
    //     }}
    // >
    <Space direction="vertical">
        <Badge count={5}>
            <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={26} />
        <Badge dot>
            <NotificationOutlined />
        </Badge>
        <Badge status="success" text="Success" />
        <Badge size="small" count={0} showZero />
    </Space>
    // </ConfigProvider>
)
