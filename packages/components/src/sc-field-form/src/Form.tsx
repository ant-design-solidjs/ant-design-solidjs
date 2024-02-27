import type { Store, FormInstance, FieldData, ValidateMessages, Callbacks, InternalFormInstance } from './interface';
import useForm from './useForm';
import FieldContext, { HOOK_MARK } from './FieldContext';
import type { FormContextProps } from './FormContext';
import FormContext from './FormContext';
import { isSimilar } from './utils/valueUtil';
import ListContext from './ListContext';
import { Component, createEffect, JSX, mergeProps, onCleanup, onMount, Ref, splitProps, useContext } from 'solid-js';
import { fillRef } from '@ant-design-solidjs/util';
import { Dynamic } from 'solid-js/web';
import { callHandler } from '../../_util/event.ts';

type BaseFormProps = Omit<JSX.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children' | 'ref'>;

type RenderProps = (values: Store, form: FormInstance) => JSX.Element;

export interface FormProps<Values = any> extends BaseFormProps {
    initialValues?: Store;
    form?: FormInstance<Values>;
    children?: RenderProps | JSX.Element;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component?: false | string | ((props: any) => JSX.Element);
    fields?: FieldData[];
    name?: string;
    validateMessages?: ValidateMessages;
    onValuesChange?: Callbacks<Values>['onValuesChange'];
    onFieldsChange?: Callbacks<Values>['onFieldsChange'];
    onFinish?: Callbacks<Values>['onFinish'];
    onFinishFailed?: Callbacks<Values>['onFinishFailed'];
    validateTrigger?: string | string[] | false;
    preserve?: boolean;
    ref?: Ref<FormInstance>;
}

const Form: Component<FormProps> = (_props: FormProps) => {
    const mergedProps = mergeProps({ component: 'form', validateTrigger: 'onChange' }, _props);
    const [props, restProps] = splitProps(mergedProps, [
        'name',
        'initialValues',
        'fields',
        'form',
        'preserve',
        'children',
        'validateMessages',
        'validateTrigger',
        'onValuesChange',
        'onFieldsChange',
        'onFinish',
        'onFinishFailed',
        'component',
        'ref',
    ]);

    const formContext: FormContextProps = useContext(FormContext);

    // We customize handle event since Context will makes all the consumer re-render:
    // https://reactjs.org/docs/context.html#contextprovider
    const [formInstance] = useForm(props.form);
    const { useSubscribe, setInitialValues, setCallbacks, setValidateMessages, setPreserve, destroyForm } = (
        formInstance as InternalFormInstance
    ).getInternalHooks(HOOK_MARK);

    // Pass ref with form instance
    fillRef(props.ref, formInstance);

    // Register form into Context
    onMount(() => {
        formContext.registerForm(props.name, formInstance);
        onCleanup(() => {
            formContext.unregisterForm(props.name);
        });
    });

    // Pass props to store
    setValidateMessages({
        ...formContext.validateMessages,
        ...props.validateMessages,
    });
    setCallbacks({
        onValuesChange: props.onValuesChange,
        onFieldsChange: (changedFields: FieldData[], ...rest) => {
            formContext.triggerFormChange(props.name, changedFields);

            if (props.onFieldsChange) {
                props.onFieldsChange(changedFields, ...rest);
            }
        },
        onFinish: (values: Store) => {
            formContext.triggerFormFinish(props.name, values);

            if (props.onFinish) {
                props.onFinish(values);
            }
        },
        onFinishFailed: props.onFinishFailed,
    });
    setPreserve(props.preserve);

    // Set initial value, init store value when first mount
    let mountRef = null;
    setInitialValues(props.initialValues, !mountRef);
    if (!mountRef) {
        mountRef = true;
    }

    onMount(() => destroyForm());

    // Prepare children by `children` type
    const childrenRenderProps = typeof props.children === 'function';
    const childrenNode = () => {
        if (typeof props.children === 'function') {
            const values = formInstance.getFieldsValue(true);
            return props.children(values, formInstance);
        }
        return props.children;
    };

    // Not use subscribe when using render props
    useSubscribe(!childrenRenderProps);

    // Listen if fields provided. We use ref to save prev data here to avoid additional render
    let prevFieldsRef: FieldData[] | undefined;
    createEffect(() => {
        if (!isSimilar(prevFieldsRef || [], props.fields || [])) {
            formInstance.setFields(props.fields || []);
        }
        prevFieldsRef = props.fields;
    });

    const formContextValue = () => ({
        ...(formInstance as InternalFormInstance),
        validateTrigger: props.validateTrigger,
    });

    const wrapperNode = () => (
        <ListContext.Provider value={null}>
            <FieldContext.Provider value={formContextValue()}>{childrenNode()}</FieldContext.Provider>
        </ListContext.Provider>
    );

    const componentProps = () => ({
        ...restProps,
        onSubmit: event => {
            event.preventDefault();
            event.stopPropagation();

            formInstance.submit();
        },
        onReset: event => {
            event.preventDefault();

            formInstance.resetFields();
            callHandler(event, restProps.onReset);
        },
    });

    const component = () => {
        if (props.component === false) {
            return wrapperNode();
        }
        const ps = componentProps();
        if (typeof props.component === 'string') {
            return (
                <Dynamic component={props.component} {...ps}>
                    {wrapperNode()}
                </Dynamic>
            );
        }
        return props.component({ ...ps, children: wrapperNode() });
    };

    return <>{component()}</>;
};

export default Form;
