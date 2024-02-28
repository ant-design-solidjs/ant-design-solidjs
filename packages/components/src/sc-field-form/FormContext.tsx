import type { ValidateMessages, FormInstance, FieldData, Store } from './interface.ts';
import { Component, createContext, JSX, useContext } from 'solid-js';

export type Forms = Record<string, FormInstance>;

export interface FormChangeInfo {
    changedFields: FieldData[];
    forms: Forms;
}

export interface FormFinishInfo {
    values: Store;
    forms: Forms;
}

export interface FormProviderProps {
    validateMessages?: ValidateMessages;
    onFormChange?: (name: string, info: FormChangeInfo) => void;
    onFormFinish?: (name: string, info: FormFinishInfo) => void;
    children?: JSX.Element;
}

export interface FormContextProps extends FormProviderProps {
    triggerFormChange: (name: string, changedFields: FieldData[]) => void;
    triggerFormFinish: (name: string, values: Store) => void;
    registerForm: (name: string, form: FormInstance) => void;
    unregisterForm: (name: string) => void;
}

const FormContext = createContext<FormContextProps>({
    triggerFormChange: () => {},
    triggerFormFinish: () => {},
    registerForm: () => {},
    unregisterForm: () => {},
});

const FormProvider: Component<FormProviderProps> = props => {
    const formContext = useContext(FormContext);

    let formsRef: Forms = {};

    return (
        <FormContext.Provider
            value={{
                ...formContext,
                validateMessages: {
                    ...formContext.validateMessages,
                    ...props.validateMessages,
                },

                // =========================================================
                // =                  Global Form Control                  =
                // =========================================================
                triggerFormChange: (name, changedFields) => {
                    if (props.onFormChange) {
                        props.onFormChange(name, {
                            changedFields,
                            forms: formsRef,
                        });
                    }

                    formContext.triggerFormChange(name, changedFields);
                },
                triggerFormFinish: (name, values) => {
                    if (props.onFormFinish) {
                        props.onFormFinish(name, {
                            values,
                            forms: formsRef,
                        });
                    }

                    formContext.triggerFormFinish(name, values);
                },
                registerForm: (name, form) => {
                    if (name) {
                        formsRef = {
                            ...formsRef,
                            [name]: form,
                        };
                    }

                    formContext.registerForm(name, form);
                },
                unregisterForm: name => {
                    const newForms = { ...formsRef };
                    delete newForms[name];
                    formsRef = newForms;

                    formContext.unregisterForm(name);
                },
            }}
        >
            {props.children}
        </FormContext.Provider>
    );
};

export { FormProvider };

export default FormContext;
