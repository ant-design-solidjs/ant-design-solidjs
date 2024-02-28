import { createContext, useContext, createMemo, JSX, Component } from 'solid-js';
import { FormProvider as RcFormProvider } from '../sc-field-form';
import type { FormProviderProps as RcFormProviderProps } from '../sc-field-form/FormContext';
import type { Meta } from '../sc-field-form/interface';
import { omit } from '@ant-design-solidjs/util';

import type { ColProps } from '../grid';
import type { FormInstance, RequiredMark } from './Form';
import type { ValidateStatus, FeedbackIcons } from './FormItem';
import type { FormLabelAlign } from './interface';
import type { Variant } from './hooks/useVariants';

/** Form Context. Set top form style and pass to Form Item usage. */
export interface FormContextProps {
    vertical: boolean;
    name?: string;
    colon?: boolean;
    labelAlign?: FormLabelAlign;
    labelWrap?: boolean;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
    requiredMark?: RequiredMark;
    itemRef: (name: (string | number)[]) => (node: JSX.Element) => void;
    form?: FormInstance;
    feedbackIcons?: FeedbackIcons;
}

export const FormContext = createContext<FormContextProps>({
    labelAlign: 'right',
    vertical: false,
    itemRef: (() => {}) as any,
});

/** `noStyle` Form Item Context. Used for error collection */
export type ReportMetaChange = (meta: Meta, uniqueKeys: JSX.Key[]) => void;
export const NoStyleItemContext = createContext<ReportMetaChange | null>(null);

/** Form Provider */
export interface FormProviderProps extends Omit<RcFormProviderProps, 'validateMessages'> {
    prefixCls?: string;
}

export const FormProvider: Component<FormProviderProps> = props => {
    const providerProps = omit(props, ['prefixCls']);
    return <RcFormProvider {...providerProps} />;
};

/** Used for ErrorList only */
export interface FormItemPrefixContextProps {
    prefixCls: string;
    status?: ValidateStatus;
}

export const FormItemPrefixContext = createContext<FormItemPrefixContextProps>({
    prefixCls: '',
});

export interface FormItemStatusContextProps {
    isFormItemInput?: boolean;
    status?: ValidateStatus;
    errors?: JSX.Element[];
    warnings?: JSX.Element[];
    hasFeedback?: boolean;
    feedbackIcon?: JSX.Element;
}

export const FormItemInputContext = createContext<FormItemStatusContextProps>({});

export type NoFormStyleProps = {
    status?: boolean;
    override?: boolean;
    children?: JSX.Element;
};

export const NoFormStyle: Component<NoFormStyleProps> = props => {
    const formItemInputContext = useContext(FormItemInputContext);

    const newFormItemInputContext = createMemo(() => {
        const newContext = { ...formItemInputContext };
        if (props.override) {
            delete newContext.isFormItemInput;
        }
        if (props.status) {
            delete newContext.status;
            delete newContext.hasFeedback;
            delete newContext.feedbackIcon;
        }
        return newContext;
    });

    return (
        <FormItemInputContext.Provider value={newFormItemInputContext()}>
            {props.children}
        </FormItemInputContext.Provider>
    );
};

export const VariantContext = createContext<Variant | undefined>(undefined);
