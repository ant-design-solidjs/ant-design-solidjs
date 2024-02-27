// import { Input } from 'ant-design-solidjs';

import { children, JSX, onMount } from 'solid-js';

export default function () {
    onMount(() => {
        const kid = children(() => <Button>11</Button>);
        const k = kid() as HTMLElement;
    });
    return <div>{/*<Input type="text" onChange={e => console.log(e)} />*/}</div>;
}

function Button(props) {
    return <div>{props.children}</div>;
}
