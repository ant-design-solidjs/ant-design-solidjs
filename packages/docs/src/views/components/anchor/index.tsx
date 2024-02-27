import { Anchor, Row, Col } from 'ant-design-solidjs';

export default function () {
    return (
        <Row>
            <Col span={16}>
                <div id="part-1" style={{ height: '100vh', background: 'rgba(255,0,0,0.02)' }} />
                <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.02)' }} />
                <div id="part-3" style={{ height: '100vh', background: 'rgba(0,0,255,0.02)' }} />
            </Col>
            <Col span={8}>
                <Anchor
                    affix
                    items={[
                        {
                            href: '#part-1',
                            title: 'Part 1',
                        },
                        {
                            href: '#part-2',
                            title: 'Part 2',
                        },
                        {
                            href: '#part-3',
                            title: 'Part 3',
                        },
                    ]}
                />
            </Col>
        </Row>
    );
}
