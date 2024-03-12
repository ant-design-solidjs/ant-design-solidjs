import { Watermark } from 'ant-design-solidjs';

export default function () {
    return (
        <>
            <Watermark content="Ant Design">
                <div style={{ height: '500px' }} />
            </Watermark>

            <Watermark
                height={30}
                width={130}
                image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original"
            >
                <div style={{ height: '500px' }} />
            </Watermark>

            <Watermark content={['Ant Design', 'Happy Working']}>
                <div style={{ height: '500px' }} />
            </Watermark>
        </>
    );
}
