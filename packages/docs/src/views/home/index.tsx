import { A } from '@solidjs/router';

export default function () {
    return (
        <div>
            <A href={'/'}>Home</A>
            <A href={'/components/button'}>Components</A>
        </div>
    );
}
