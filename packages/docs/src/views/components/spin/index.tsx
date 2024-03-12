import { Alert, Button, Flex, Spin } from 'ant-design-solidjs';
import { LoadingOutlined } from '@ant-design-solidjs/icons';
import { createSignal } from 'solid-js';

export default function () {
    const [spinning, setSpinning] = createSignal<boolean>(false);

    const showLoader = () => {
        setSpinning(true);
        setTimeout(() => {
            setSpinning(false);
        }, 3000);
    };

    return (
        <Flex vertical>
            <Spin />
            使用自定义指示符。
            <Spin indicator={(props: any) => <LoadingOutlined {...props} style={{ 'font-size': '24px' }} spin />} />
            <Button onClick={showLoader}>Show fullscreen for 3s</Button>
            <Spin spinning={spinning()} fullscreen />
            <div
                style={{
                    margin: '20px 0',
                    padding: '30px 50px',
                    'text-align': 'center',
                    background: 'rgba(0,0,0,0.05)',
                    'border-radius': '4px',
                }}
            >
                <Spin />
            </div>
            <h1>小的用于文本加载，默认用于卡片容器级加载，大的用于**页面级**加载。</h1>
            <Flex align="center" gap="middle">
                <Spin size="small" />
                <Spin />
                <Spin size="large" />
            </Flex>
            <h1>自定义描述文案。</h1>
            <Flex gap="small" vertical>
                <Flex gap="small">
                    <Spin tip="Loading" size="small">
                        <div style={{ padding: '50px', background: 'rgba(0,0,0,0.05)', 'border-radius': '4px' }} />
                    </Spin>
                    <Spin tip="Loading">
                        <div style={{ padding: '50px', background: 'rgba(0,0,0,0.05)', 'border-radius': '4px' }} />
                    </Spin>
                    <Spin tip="Loading" size="large">
                        <div style={{ padding: '50px', background: 'rgba(0,0,0,0.05)', 'border-radius': '4px' }} />
                    </Spin>
                </Flex>
                <Spin tip="Loading...">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin>
            </Flex>
        </Flex>
    );
}
