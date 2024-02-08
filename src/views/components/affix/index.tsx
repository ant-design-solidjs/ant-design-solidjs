import { Button, Affix } from 'ant-design-solidjs';
import { createSignal } from 'solid-js';
export default function () {
    const [top, setTop] = createSignal<number>(100);
    const [bottom, setBottom] = createSignal<number>(100);

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
        </div>
    );
}
