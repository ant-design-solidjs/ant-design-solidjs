import { Button, Flex, Input, Space } from 'ant-design-solidjs';

export default function () {
    return (
        <div>
            {/*<Input type="text" placeholder="Basic usage" />*/}
            {/*<br />*/}
            {/*<br />*/}
            {/*<Input size="large" placeholder="large size" prefix={<UserOutlined />} />*/}
            {/*<br />*/}
            {/*<br />*/}
            {/*<Input placeholder="default size" prefix={<UserOutlined />} />*/}
            {/*<br />*/}
            {/*<br />*/}
            {/*<Input size="small" placeholder="small size" prefix={<UserOutlined />} />*/}

            <Flex vertical gap={'12px'}>
                {/*<Input placeholder="Outlined" />*/}
                {/*<Input placeholder="Filled" variant="filled" />*/}
                {/*<Input placeholder="Borderless" variant="borderless" />*/}

                {/*<Input addonBefore="http://" addonAfter=".com" value="mysite" />*/}
                {/*<Input addonBefore="http://" suffix=".com" value="mysite" />*/}
                {/*<Input value="mysite" />*/}

                <Space direction="vertical" size="middle">
                    {/*<Space.Compact>*/}
                    {/*    <Input value="26888888" />*/}
                    {/*</Space.Compact>*/}
                    <Space.Compact>
                        <Input style={{ width: '20%' }} value="0571" />
                        <Input style={{ width: '80%' }} value="26888888" />
                    </Space.Compact>
                    {/*<Space.Compact>*/}
                    {/*    <Search addonBefore="https://" placeholder="input search text" allowClear />*/}
                    {/*</Space.Compact>*/}
                    {/*<Space.Compact style={{ width: '100%' }}>*/}
                    {/*    <Input value="Combine input and button" />*/}
                    {/*    <Button type="primary">Submit</Button>*/}
                    {/*</Space.Compact>*/}
                    {/*<Space.Compact>*/}
                    {/*    <Select defaultValue="Zhejiang" options={options} />*/}
                    {/*    <Input value="Xihu District, Hangzhou" />*/}
                    {/*</Space.Compact>*/}
                    {/*<Space.Compact size="large">*/}
                    {/*    <Input addonBefore={<SearchOutlined />} placeholder="large size" />*/}
                    {/*    <Input placeholder="another input" />*/}
                    {/*</Space.Compact>*/}
                </Space>
            </Flex>
        </div>
    );
}
