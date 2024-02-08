import { JSX } from 'solid-js';

export interface DomWrapperProps {
    children: JSX.Element;
}

export default function DomWrapper(props: DomWrapperProps) {
    return <>{props.children}</>;
}
