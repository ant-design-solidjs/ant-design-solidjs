import { Button, notification, NotificationArgsProps } from 'ant-design-solidjs';
import { createContext } from 'solid-js';
import {
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
} from '@ant-design-solidjs/icons';

type NotificationPlacement = NotificationArgsProps['placement'];
const Context = createContext({ name: 'Default' });
export default function () {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: `Notification ${placement}`,
            // description: <Context.Provider>{({ name }) => `Hello, ${name}!`}</Context.Provider>,
            placement,
        });
    };

    return (
        <Context.Provider value={{ name: 'Ant Design' }}>
            {contextHolder}
            <Button type="primary" onClick={() => openNotification('topLeft')} icon={<RadiusUpleftOutlined />}>
                topLeft
            </Button>
            <Button type="primary" onClick={() => openNotification('topRight')} icon={<RadiusUprightOutlined />}>
                topRight
            </Button>
            <Button type="primary" onClick={() => openNotification('bottomLeft')} icon={<RadiusBottomleftOutlined />}>
                bottomLeft
            </Button>
            <Button type="primary" onClick={() => openNotification('bottomRight')} icon={<RadiusBottomrightOutlined />}>
                bottomRight
            </Button>
        </Context.Provider>
    );
}
