import { Button, Divider, GetProps } from 'ant-design-solidjs';
import { Component, createSignal } from 'solid-js';
import { DownloadOutlined } from '@ant-design-solidjs/icons';

export default function () {
    const [loadings, setLoadings] = createSignal<boolean[]>([]);

    const enterLoading = (index: number) => {
        setLoadings(prevLoadings => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings(prevLoadings => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    return (
        <div class="p-12">
            <h1>TYPE</h1>
            <div class="flex items-center gap-3">
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                <Button type="text">Text Button</Button>
                <Button type="link">Link Button</Button>
            </div>
            <h1>SIZE</h1>
            <div class="flex items-center gap-3">
                <Button size="large">Primary Button</Button>
                <Button>Default Button</Button>
                <Button size="small">Dashed Button</Button>
            </div>

            <h1>DISABLED</h1>
            <div class="flex flex-col flex-wrap gap-4">
                <div class="flex gap-4">
                    <Button type="primary">Primary</Button>
                    <Button type="primary" disabled>
                        Primary(disabled)
                    </Button>
                </div>
                <div class="flex gap-4">
                    <Button>Default</Button>
                    <Button disabled>Default(disabled)</Button>
                </div>
                <div class="flex gap-4">
                    <Button type="dashed">Dashed</Button>
                    <Button type="dashed" disabled>
                        Dashed(disabled)
                    </Button>
                </div>
                <div class="flex gap-4">
                    <Button type="text">Text</Button>
                    <Button type="text" disabled>
                        Text(disabled)
                    </Button>
                </div>
                <div class="flex gap-4">
                    <Button type="link">Link</Button>
                    <Button type="link" disabled>
                        Link(disabled)
                    </Button>
                </div>
                <div class="flex gap-4">
                    <Button type="primary" target="_blank" href="https://ant.design/index-cn">
                        Href Primary
                    </Button>
                    <Button type="primary" href="https://ant.design/index-cn" disabled>
                        Href Primary(disabled)
                    </Button>
                </div>
                <div class="flex gap-4">
                    <Button danger>Danger Default</Button>
                    <Button danger disabled>
                        Danger Default(disabled)
                    </Button>
                </div>
                <div class="flex gap-4">
                    <Button danger type="text">
                        Danger Text
                    </Button>
                    <Button danger type="text" disabled>
                        Danger Text(disabled)
                    </Button>
                </div>
                <div class="flex gap-4">
                    <Button type="link" danger>
                        Danger Link
                    </Button>
                    <Button type="link" danger disabled>
                        Danger Link(disabled)
                    </Button>
                </div>
                <div class="flex gap-4 bg-zinc-400 p-3">
                    <Button ghost>Ghost</Button>
                    <Button ghost disabled>
                        Ghost(disabled)
                    </Button>
                </div>
            </div>

            <h1>GHOST</h1>
            <div class="flex bg-zinc-400 p-3 gap-3">
                <Button type="primary" ghost>
                    Primary
                </Button>
                <Button ghost>Default</Button>
                <Button type="dashed" ghost>
                    Dashed
                </Button>
                <Button type="primary" danger ghost>
                    Danger
                </Button>
            </div>

            <h1>DANGER</h1>
            <div class="flex gap-3">
                <Button type="primary" danger>
                    Primary
                </Button>
                <Button danger>Default</Button>
                <Button type="dashed" danger>
                    Dashed
                </Button>
                <Button type="text" danger>
                    Text
                </Button>
                <Button type="link" danger>
                    Link
                </Button>
            </div>

            <h1>BLOCK</h1>
            <div class="flex flex-col gap-3 w-full">
                <Button type="primary" block>
                    Primary
                </Button>
                <Button block>Default</Button>
                <Button type="dashed" block>
                    Dashed
                </Button>
                <Button disabled block>
                    disabled
                </Button>
                <Button type="text" block>
                    text
                </Button>
                <Button type="link" block>
                    Link
                </Button>
            </div>

            <h1>LOADING</h1>
            <div class="flex flex-col gap-4">
                <div class="flex items-center flex-wrap gap-4">
                    <Button type="primary" loading>
                        Loading
                    </Button>
                    <Button type="primary" size="small" loading>
                        Loading
                    </Button>
                    <Button type="primary" icon={<IconAntDesignPoweroffOutlined />} loading />
                </div>
                <div class="flex flex-wrap gap-4">
                    <Button type="primary" loading={loadings()[0]} onClick={() => enterLoading(0)}>
                        Click me!
                    </Button>
                    <Button
                        type="primary"
                        icon={<IconAntDesignPoweroffOutlined />}
                        loading={loadings()[1]}
                        onClick={() => enterLoading(1)}
                    >
                        Click me!
                    </Button>
                    <Button
                        type="primary"
                        icon={<IconAntDesignPoweroffOutlined />}
                        loading={loadings()[2]}
                        onClick={() => enterLoading(2)}
                    />
                </div>
            </div>

            <h1>ICON</h1>
            <div class="flex flex-col gap-4">
                <div class="flex flex-wrap gap-4">
                    <Button type="primary" shape="circle" icon={<IconAntDesignSearchOutlined />} />
                    <Button shape="circle" icon={<IconAntDesignSearchOutlined />} />
                    <Button type="primary" shape="circle">
                        A
                    </Button>
                    <Button type="primary" icon={<IconAntDesignSearchOutlined />}>
                        Search
                    </Button>
                    <Button icon={<IconAntDesignSearchOutlined />}>Search</Button>
                </div>
                <div class="flex flex-wrap gap-4">
                    <Button shape="circle" icon={<IconAntDesignSearchOutlined />} />
                    <Button icon={<IconAntDesignSearchOutlined />}>Search</Button>
                    <Button type="dashed" shape="circle" icon={<IconAntDesignSearchOutlined />} />
                    <Button type="dashed" icon={<IconAntDesignSearchOutlined />}>
                        Search
                    </Button>
                    <Button icon={<IconAntDesignSearchOutlined />} href="https://www.google.com" />
                </div>
            </div>

            <CustomGroup size="small" />
            <br />
            <CustomGroup />
            <br />
            <CustomGroup size="large" />

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
                quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
                quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider dashed />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
                quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
                quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider>Text</Divider>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
                quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider orientation="left">Left Text</Divider>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
                quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider orientation="right">Right Text</Divider>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
                quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider orientation="left" orientationMargin="0">
                Left Text with 0 orientationMargin
            </Divider>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
                quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Divider orientation="right" orientationMargin={50}>
                Right Text with 50px orientationMargin
            </Divider>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
                quae sunt a te dicta? Refert tamen, quo modo.
            </p>
        </div>
    );
}

type ButtonGroupProps = GetProps<typeof Button.Group>;

const CustomGroup: Component<ButtonGroupProps> = props => (
    <Button.Group {...props}>
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
        {/*<Tooltip title="Tooltip">*/}
        <Button type="primary" icon={<DownloadOutlined />} disabled />
        {/*</Tooltip>*/}
        {/*<Tooltip title="Tooltip">*/}
        <Button type="primary" icon={<DownloadOutlined />} />
        {/*</Tooltip>*/}
    </Button.Group>
);
