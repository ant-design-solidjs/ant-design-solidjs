import { warning } from '@ant-design-solidjs/util';
import type { InternalFormInstance } from './interface';
import { createContext } from 'solid-js';

export const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS';

const warningFunc: any = () => {
    warning(false, 'Can not find FormContext. Please make sure you wrap Field under Form.');
};

const Context = createContext<InternalFormInstance>({
    getFieldValue: warningFunc,
    getFieldsValue: warningFunc,
    getFieldError: warningFunc,
    getFieldWarning: warningFunc,
    getFieldsError: warningFunc,
    isFieldsTouched: warningFunc,
    isFieldTouched: warningFunc,
    isFieldValidating: warningFunc,
    isFieldsValidating: warningFunc,
    resetFields: warningFunc,
    setFields: warningFunc,
    setFieldValue: warningFunc,
    setFieldsValue: warningFunc,
    validateFields: warningFunc,
    submit: warningFunc,

    getInternalHooks: () => {
        warningFunc();

        return {
            dispatch: warningFunc,
            initEntityValue: warningFunc,
            registerField: warningFunc,
            useSubscribe: warningFunc,
            setInitialValues: warningFunc,
            destroyForm: warningFunc,
            setCallbacks: warningFunc,
            registerWatch: warningFunc,
            getFields: warningFunc,
            setValidateMessages: warningFunc,
            setPreserve: warningFunc,
            getInitialValue: warningFunc,
        };
    },
});

export default Context;
