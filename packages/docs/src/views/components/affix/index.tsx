import { Button, Affix } from 'ant-design-solidjs';
import { createSignal, JSX } from 'solid-js';

const containerStyle: JSX.CSSProperties = {
    width: '100%',
    height: '100px',
    overflow: 'auto',
    border: '1px solid #40a9ff',
    'margin-top': '200px',
};

const style: JSX.CSSProperties = {
    width: '100%',
    height: '1000px',
};
export default function () {
    const [top, setTop] = createSignal<number>(100);
    const [bottom, setBottom] = createSignal<number>(100);
    const [container, setContainer] = createSignal<HTMLDivElement | null>(null);
    return (
        <div class="p-12">
            <Affix offsetTop={top()}>
                <Button type="primary" onClick={() => setTop(top() + 10)}>
                    Affix top
                </Button>
            </Affix>
            <br />
            <Affix offsetBottom={bottom()}>
                <Button type="primary" onClick={() => setBottom(bottom() + 10)}>
                    Affix bottom
                </Button>
            </Affix>

            <Affix offsetTop={120} onChange={affixed => console.log(affixed)}>
                <Button>120px to affix top</Button>
            </Affix>

            <div style={containerStyle} ref={setContainer}>
                <div style={style}>
                    <Affix target={() => container()}>
                        <Button type="primary">Fixed at the top of container</Button>
                    </Affix>
                </div>
            </div>
        </div>
    );
}
