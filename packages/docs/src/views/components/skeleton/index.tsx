import { Button, ConfigProvider, Flex, Skeleton, Space } from 'ant-design-solidjs';
import { createSignal } from 'solid-js';

export default function () {
    const [loading, setLoading] = createSignal<boolean>(false);

    const showSkeleton = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <Flex vertical>
            <h1>显示动画效果。</h1>
            <Skeleton active />
            <h1>最简单的占位效果。</h1>
            <Skeleton />

            <Space direction="vertical" style={{ width: '100%' }} size={16}>
                <Skeleton loading={loading()}>
                    <h4 style={{ 'margin-bottom': `16` }}>Ant Design, a design language</h4>
                    <p>
                        We supply a series of design principles, practical patterns and high quality design resources
                        (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.
                    </p>
                </Skeleton>
                <Button onClick={showSkeleton} disabled={loading()}>
                    Show Skeleton
                </Button>
            </Space>

            <h1>更复杂的组合。</h1>
            <Skeleton avatar paragraph={{ rows: 4 }} />

            <ConfigProvider
                theme={{
                    components: {
                        Skeleton: {
                            blockRadius: 30,
                            titleHeight: 50,
                            gradientFromColor: '#222',
                            gradientToColor: '#444',
                            paragraphMarginTop: 30,
                            paragraphLiHeight: 30,
                        },
                    },
                }}
            >
                <Skeleton loading active />
            </ConfigProvider>
        </Flex>
    );
}
