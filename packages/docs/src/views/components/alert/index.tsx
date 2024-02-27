import { Alert } from 'ant-design-solidjs';
import { SmileOutlined } from '@ant-design-solidjs/icons';
import { createSignal, Show } from 'solid-js';

export default function () {
    const [visible, setVisible] = createSignal(true);

    const handleClose = () => {
        console.log('closed');
        setVisible(false);
    };

    return (
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '10px' }}>
            <Alert message="Success Text" type="success" />

            <Alert message="Warning text" banner />
            <Alert message="Very long warning text warning text text text text text text text" banner closable />
            <Alert showIcon={false} message="Warning text without icon" banner />
            <Alert type="error" message="Error text" banner />

            <Alert
                message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
                type="warning"
                closable
            />
            <Alert
                message="Error Text"
                description="Error Description Error Description Error Description Error Description Error Description Error Description"
                type="error"
                closable
            />

            <Alert
                message="Success Tips"
                description="Detailed description and advices about successful copywriting."
                type="success"
                showIcon
            />

            <Alert icon={<SmileOutlined />} message="showIcon = false" type="success" />
            <Alert icon={<SmileOutlined />} message="Success Tips" type="success" showIcon />
            <Alert icon={<SmileOutlined />} message="Informational Notes" type="info" showIcon />
            <Alert icon={<SmileOutlined />} message="Warning" type="warning" showIcon />
            <Alert icon={<SmileOutlined />} message="Error" type="error" showIcon />
            <Alert
                icon={<SmileOutlined />}
                message="Success Tips"
                description="Detailed description and advices about successful copywriting."
                type="success"
                showIcon
            />
            <Alert
                icon={<SmileOutlined />}
                message="Informational Notes"
                description="Additional description and informations about copywriting."
                type="info"
                showIcon
            />
            <Alert
                icon={<SmileOutlined />}
                message="Warning"
                description="This is a warning notice about copywriting."
                type="warning"
                showIcon
            />
            <Alert
                icon={<SmileOutlined />}
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
            />

            <Alert
                message="Success Text"
                description="Success Description Success Description Success Description"
                type="success"
                showIcon
            />
            <Alert
                message="Info Text"
                description="Info Description Info Description Info Description Info Description"
                type="info"
            />
            <Alert
                message="Warning Text"
                description="Warning Description Warning Description Warning Description Warning Description"
                type="warning"
            />
            <Alert
                message="Error Text"
                description="Error Description Error Description Error Description Error Description"
                type="error"
            />
            <Show when={visible()}>
                <Alert message="Alert Message Text" type="success" closable afterClose={handleClose} />
            </Show>
            <p>click the close button to see the effect</p>
        </div>
    );
}
