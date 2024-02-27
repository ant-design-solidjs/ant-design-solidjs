import { isEqual, warning } from '@ant-design-solidjs/util';
import FieldContext, { HOOK_MARK } from './FieldContext';
import type {
    EventArgs,
    FormInstance,
    InternalFormInstance,
    InternalNamePath,
    Meta,
    NamePath,
    Rule,
    Store,
    StoreValue,
} from './interface';
import ListContext from './ListContext';
import { toArray } from './utils/typeUtil';
import { defaultGetValueFromEvent, getNamePath, getValue } from './utils/valueUtil';
import { JSX, onMount, splitProps, useContext } from 'solid-js';

const EMPTY_ERRORS: any[] = [];

export type ShouldUpdate<Values = any> =
    | boolean
    | ((prevValues: Values, nextValues: Values, info: { source?: string }) => boolean);

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface ChildProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
}

export type MetaEvent = Meta & { destroy?: boolean };

export interface InternalFieldProps<Values = any> {
    children?: (control: ChildProps, meta: Meta, form: FormInstance<Values>) => JSX.Element;
    /**
     * Set up `dependencies` field.
     * When dependencies field update and current field is touched,
     * will trigger validate rules and render.
     */
    dependencies?: NamePath[];
    getValueFromEvent?: (...args: EventArgs) => StoreValue;
    name?: InternalNamePath;
    normalize?: (value: StoreValue, prevValue: StoreValue, allValues: Store) => StoreValue;
    rules?: Rule[];
    shouldUpdate?: ShouldUpdate<Values>;
    trigger?: string;
    validateTrigger?: string | string[] | false;
    /**
     * Trigger will after configured milliseconds.
     */
    validateDebounce?: number;
    validateFirst?: boolean | 'parallel';
    valuePropName?: string;
    getValueProps?: (value: StoreValue) => Record<string, unknown>;
    messageVariables?: Record<string, string>;
    initialValue?: any;
    onReset?: () => void;
    onMetaChange?: (meta: MetaEvent) => void;
    preserve?: boolean;

    /** @private Passed by Form.List props. Do not use since it will break by path check. */
    isListField?: boolean;

    /** @private Passed by Form.List props. Do not use since it will break by path check. */
    isList?: boolean;

    /** @private Pass context as prop instead of context api
     *  since class component can not get context in constructor */
    fieldContext?: InternalFormInstance;
}

export interface FieldProps<Values = any> extends Omit<InternalFieldProps<Values>, 'name' | 'fieldContext'> {
    name?: NamePath<Values>;
}

export interface FieldState {
    resetCount: number;
}

function Field(props: InternalFieldProps) {
    onMount(() => {
        if (props.fieldContext) {
            const { getInternalHooks }: InternalFormInstance = props.fieldContext;
            const { initEntityValue } = getInternalHooks(HOOK_MARK);
            initEntityValue(this);
        }
    });

    /**
     * Follow state should not management in State since it will async update by React.
     * This makes first render of form can not get correct state value.
     */
    let touched: boolean = false;

    let validatePromise: Promise<string[]> | null;

    let prevValidating: boolean;

    let errors: string[] = EMPTY_ERRORS;
    let warnings: string[] = EMPTY_ERRORS;

    const getNamePath = (): InternalNamePath => {
        const { prefixName = [] }: InternalFormInstance = props.fieldContext;

        return props.name !== undefined ? [...prefixName, ...props.name] : [];
    };

    // Event should only trigger when meta changed
    let metaCache: MetaEvent = null;

    const triggerMetaEvent = (destroy?: boolean) => {
        if (props.onMetaChange) {
            const meta = { ...getMeta(), destroy };

            if (!isEqual(metaCache, meta)) {
                props.onMetaChange(meta);
            }

            metaCache = meta;
        } else {
            metaCache = null;
        }
    };

    const isFieldValidating = () => !!validatePromise;

    const isFieldTouched = () => touched;

    const getMeta = (): Meta => {
        // Make error & validating in cache to save perf
        prevValidating = isFieldValidating();

        return {
            touched: isFieldTouched(),
            validating: prevValidating,
            errors: errors,
            warnings: warnings,
            name: getNamePath(),
            validated: validatePromise === null,
        };
    };
    const getInternalValue = (store?: Store) => {
        const { getFieldsValue }: FormInstance = props.fieldContext;
        const namePath = getNamePath();
        return getValue(store || getFieldsValue(true), namePath);
    };

    const getControlled = (childProps: ChildProps = {}) => {
        const { trigger, validateTrigger, getValueFromEvent, normalize, valuePropName, getValueProps, fieldContext } =
            props;

        const mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : fieldContext.validateTrigger;

        const namePath = getNamePath();
        const { getInternalHooks, getFieldsValue }: InternalFormInstance = fieldContext;
        const { dispatch } = getInternalHooks(HOOK_MARK);
        const value = getInternalValue();
        const mergedGetValueProps = getValueProps || ((val: StoreValue) => ({ [valuePropName]: val }));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const originTriggerFunc: any = childProps[trigger];

        const valueProps = mergedGetValueProps(value);

        // warning when prop value is function
        if (process.env.NODE_ENV !== 'production') {
            Object.keys(valueProps).forEach(key => {
                warning(
                    typeof valueProps[key] !== 'function',
                    `It's not recommended to generate dynamic function prop by \`getValueProps\`. Please pass it to child component directly (prop: ${key})`,
                );
            });
        }

        const control = {
            ...childProps,
            ...valueProps,
        };

        // Add trigger
        control[trigger] = (...args: EventArgs) => {
            // Mark as touched
            touched = true;

            triggerMetaEvent();

            let newValue: StoreValue;
            if (getValueFromEvent) {
                newValue = getValueFromEvent(...args);
            } else {
                newValue = defaultGetValueFromEvent(valuePropName, ...args);
            }

            if (normalize) {
                newValue = normalize(newValue, value, getFieldsValue(true));
            }

            dispatch({
                type: 'updateValue',
                namePath,
                value: newValue,
            });

            if (originTriggerFunc) {
                originTriggerFunc(...args);
            }
        };

        // Add validateTrigger
        const validateTriggerList: string[] = toArray(mergedValidateTrigger || []);

        validateTriggerList.forEach((triggerName: string) => {
            // Wrap additional function of component, so that we can get latest value from store
            const originTrigger = control[triggerName];
            control[triggerName] = (...args: EventArgs) => {
                if (originTrigger) {
                    originTrigger(...args);
                }

                // Always use latest rules
                const { rules } = props;
                if (rules && rules.length) {
                    // We dispatch validate to root,
                    // since it will update related data with other field with same name
                    dispatch({
                        type: 'validateField',
                        namePath,
                        triggerName,
                    });
                }
            };
        });

        return control;
    };

    return <>{props.children(getControlled(), getMeta(), props.fieldContext)}</>;
}

function WrapperField<Values = any>(_props: FieldProps<Values>) {
    const [props, restProps] = splitProps(_props, ['name']);
    const fieldContext = useContext(FieldContext);
    const listContext = useContext(ListContext);
    const namePath = props.name !== undefined ? getNamePath(props.name) : undefined;

    // Warning if it's a directly list field.
    // We can still support multiple level field preserve.
    if (
        process.env.NODE_ENV !== 'production' &&
        restProps.preserve === false &&
        restProps.isListField &&
        namePath.length <= 1
    ) {
        warning(false, '`preserve` should not apply on Form.List fields.');
    }

    return <Field name={namePath} isListField={!!listContext} {...restProps} fieldContext={fieldContext} />;
}

export default WrapperField;
