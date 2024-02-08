import { Button, Flex } from 'ant-design-solidjs';
import { For } from 'solid-js';
export default function () {
    return (
        <div class="p-12">
            <Flex vertical>
                <For each={Array.from({ length: 4 })}>
                    {(_, idx) => (
                        <div
                            style={{
                                height: `60px`,
                                'background-color': idx() % 2 ? '#1677ff' : '#1677ffbf',
                            }}
                        />
                    )}
                </For>
            </Flex>
            <Flex style={{ 'margin-top': `20px` }}>
                <For each={Array.from({ length: 4 })}>
                    {(_, idx) => (
                        <div
                            style={{
                                width: '25%',
                                height: idx() % 2 ? `60` : `40`,
                                'background-color': idx() % 2 ? '#1677ff' : '#1677ffbf',
                            }}
                        />
                    )}
                </For>
            </Flex>

            <Flex gap="middle" vertical>
                <Flex gap={`20px`}>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="link">Link</Button>
                </Flex>
            </Flex>

            <Flex wrap="wrap" gap="small">
                <For each={Array.from({ length: 24 })}>{() => <Button type="primary">Button</Button>}</For>
            </Flex>
        </div>
    );
}
