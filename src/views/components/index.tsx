import { RouteSectionProps } from '@solidjs/router';

export default function (props: RouteSectionProps) {
    return <main>{props.children}</main>;
}
