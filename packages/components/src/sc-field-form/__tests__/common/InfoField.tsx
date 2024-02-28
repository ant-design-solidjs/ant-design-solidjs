import { Field } from '../../';
import { FieldProps } from '../../Field';
import { Component, For, JSX, mergeProps, splitProps } from 'solid-js';

interface InfoFieldProps extends Omit<FieldProps, 'children'> {
    children?: (control: any) => JSX.Element;
}

export const Input: Component<any> = _props => {
    const mergedProps = mergeProps({ value: '' }, _props);
    const [props, other] = splitProps(mergedProps, ['value']);
    return <input {...other} value={props.value} />;
};

/**
 * Return a wrapped Field with meta info
 */
const InfoField: Component<InfoFieldProps> = _props => {
    const [props, restProps] = splitProps(_props, ['children']);
    return (
        <Field {...restProps}>
            {(control, info) => {
                const { errors, warnings, validating } = info;

                return (
                    <div class="field">
                        {props.children ? props.children(control) : <Input {...control} />}
                        <ul class="errors">
                            <For each={errors}>{err => <li>{err}</li>}</For>
                        </ul>
                        <ul class="warnings">
                            <For each={warnings}>{warn => <li>{warn}</li>}</For>
                        </ul>
                        {validating && <span class="validating" />}
                    </div>
                );
            }}
        </Field>
    );
};
export default InfoField;
