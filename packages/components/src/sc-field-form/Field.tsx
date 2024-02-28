import { isEqual, warning } from '@ant-design-solidjs/util';
import FieldContext, { HOOK_MARK } from './FieldContext.ts';
import type {
    EventArgs,
    FieldEntity,
    FormInstance,
    InternalFormInstance,
    InternalNamePath,
    InternalValidateOptions,
    Meta,
    NamePath,
    NotifyInfo,
    Rule,
    RuleError,
    RuleObject,
    Store,
    StoreValue,
} from './interface.ts';
import ListContext from './ListContext.ts';
import { toArray } from './utils/typeUtil.ts';
import { containsNamePath, defaultGetValueFromEvent, getNamePath, getValue } from './utils/valueUtil.ts';
import { createSignal, JSX, mergeProps, onMount, Show, splitProps, useContext } from 'solid-js';
import { validateRules } from './utils/validateUtil.ts';

const EMPTY_ERRORS: any[] = [];

export type ShouldUpdate<Values = any> =
    | boolean
    | ((prevValues: Values, nextValues: Values, info: { source?: string }) => boolean);

function requireUpdate(
    shouldUpdate: ShouldUpdate,
    prev: StoreValue,
    next: StoreValue,
    prevValue: StoreValue,
    nextValue: StoreValue,
    info: NotifyInfo,
): boolean {
    if (typeof shouldUpdate === 'function') {
        return shouldUpdate(prev, next, 'source' in info ? { source: info.source } : {});
    }
    return prevValue !== nextValue;
}

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

function Field(_props: InternalFieldProps) {
    const props = mergeProps({ trigger: 'onChange', valuePropName: 'value' }, _props);

    onMount(() => {
        if (props.fieldContext) {
            const { getInternalHooks }: InternalFormInstance = props.fieldContext;
            const { initEntityValue } = getInternalHooks(HOOK_MARK);
            initEntityValue({
                onStoreChange,
                props,
                getErrors,
                getMeta,
                isFieldDirty,
                isFieldValidating,
                isListField,
                isFieldTouched,
                getNamePath,
                getWarnings,
                isList,
                isPreserve,
                validateRules: internalValidateRules,
            });
        }
    });

    // let contextType = FieldContext;

    const [resetCount, setResetCount] = createSignal(0);

    let mounted = false;

    /**
     * Follow state should not management in State since it will async update by React.
     * This makes first render of form can not get correct state value.
     */
    let touched: boolean = false;

    let dirty: boolean = false;

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

    const reRender = () => {
        if (!mounted) return;
        // forceUpdate();
    };

    const refresh = () => {
        if (!mounted) return;
        /**
         * Clean up current node.
         */
        setResetCount(v => v + 1);
    };

    const onStoreChange: FieldEntity['onStoreChange'] = (prevStore, namePathList, info) => {
        const { shouldUpdate, dependencies = [], onReset } = props;
        const { store } = info;
        const namePath = getNamePath();
        const prevValue = getInternalValue(prevStore);
        const curValue = getInternalValue(store);

        const namePathMatch = namePathList && containsNamePath(namePathList, namePath);

        // `setFieldsValue` is quick access to update related status
        if (info.type === 'valueUpdate' && info.source === 'external' && prevValue !== curValue) {
            touched = true;
            dirty = true;
            validatePromise = null;
            errors = EMPTY_ERRORS;
            warnings = EMPTY_ERRORS;
            triggerMetaEvent();
        }

        switch (info.type) {
            case 'reset':
                if (!namePathList || namePathMatch) {
                    // Clean up state
                    touched = false;
                    dirty = false;
                    validatePromise = undefined;
                    errors = EMPTY_ERRORS;
                    warnings = EMPTY_ERRORS;
                    triggerMetaEvent();

                    onReset?.();

                    refresh();
                    return;
                }
                break;

            /**
             * In case field with `preserve = false` nest deps like:
             * - A = 1 => show B
             * - B = 1 => show C
             * - Reset A, need clean B, C
             */
            case 'remove': {
                if (shouldUpdate) {
                    reRender();
                    return;
                }
                break;
            }

            case 'setField': {
                const { data } = info;
                if (namePathMatch) {
                    if ('touched' in data) {
                        touched = data.touched;
                    }
                    if ('validating' in data && !('originRCField' in data)) {
                        validatePromise = data.validating ? Promise.resolve([]) : null;
                    }
                    if ('errors' in data) {
                        errors = data.errors || EMPTY_ERRORS;
                    }
                    if ('warnings' in data) {
                        warnings = data.warnings || EMPTY_ERRORS;
                    }
                    dirty = true;

                    triggerMetaEvent();

                    reRender();
                    return;
                } else if ('value' in data && containsNamePath(namePathList, namePath, true)) {
                    // Contains path with value should also check
                    reRender();
                    return;
                }

                // Handle update by `setField` with `shouldUpdate`
                if (
                    shouldUpdate &&
                    !namePath.length &&
                    requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)
                ) {
                    reRender();
                    return;
                }
                break;
            }

            case 'dependenciesUpdate': {
                /**
                 * Trigger when marked `dependencies` updated. Related fields will all update
                 */
                const dependencyList = dependencies.map(getNamePath);
                // No need for `namePathMath` check and `shouldUpdate` check, since `valueUpdate` will be
                // emitted earlier and they will work there
                // If set it may cause unnecessary twice rerendering
                if (dependencyList.some(dependency => containsNamePath(info.relatedFields, dependency))) {
                    reRender();
                    return;
                }
                break;
            }

            default:
                // 1. If `namePath` exists in `namePathList`, means it's related value and should update
                //      For example <List name="list"><Field name={['list', 0]}></List>
                //      If `namePathList` is [['list']] (List value update), Field should be updated
                //      If `namePathList` is [['list', 0]] (Field value update), List shouldn't be updated
                // 2.
                //   2.1 If `dependencies` is set, `name` is not set and `shouldUpdate` is not set,
                //       don't use `shouldUpdate`. `dependencies` is view as a shortcut if `shouldUpdate`
                //       is not provided
                //   2.2 If `shouldUpdate` provided, use customize logic to update the field
                //       else to check if value changed
                if (
                    namePathMatch ||
                    ((!dependencies.length || namePath.length || shouldUpdate) &&
                        requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info))
                ) {
                    reRender();
                    return;
                }
                break;
        }

        if (shouldUpdate === true) {
            reRender();
        }
    };
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

    const isFieldDirty = () => {
        // Touched or validate or has initialValue
        if (dirty || props.initialValue !== undefined) {
            return true;
        }

        // Form set initialValue
        const { getInitialValue } = props.fieldContext.getInternalHooks(HOOK_MARK);
        if (getInitialValue(getNamePath()) !== undefined) {
            return true;
        }

        return false;
    };

    const getErrors = () => errors;

    const getWarnings = () => warnings;

    const isListField = () => props.isListField;

    const isList = () => props.isList;

    const isPreserve = () => props.preserve;

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

    const getRules = (): RuleObject[] => {
        const { rules = [], fieldContext } = props;

        return rules.map((rule: Rule): RuleObject => {
            if (typeof rule === 'function') {
                return rule(fieldContext);
            }
            return rule;
        });
    };
    const internalValidateRules = (options?: InternalValidateOptions): Promise<RuleError[]> => {
        // We should fixed namePath & value to avoid developer change then by form function
        const namePath = getNamePath();
        const currentValue = getInternalValue();

        const { triggerName, validateOnly = false } = options || {};

        // Force change to async to avoid rule OOD under renderProps field
        const rootPromise = Promise.resolve().then(async (): Promise<any[]> => {
            if (!mounted) {
                return [];
            }

            const { validateFirst = false, messageVariables, validateDebounce } = props;

            // Start validate
            let filteredRules = getRules();
            if (triggerName) {
                filteredRules = filteredRules
                    .filter(rule => rule)
                    .filter((rule: RuleObject) => {
                        const { validateTrigger } = rule;
                        if (!validateTrigger) {
                            return true;
                        }
                        const triggerList = toArray(validateTrigger);
                        return triggerList.includes(triggerName);
                    });
            }

            // Wait for debounce. Skip if no `triggerName` since its from `validateFields / submit`
            if (validateDebounce && triggerName) {
                await new Promise(resolve => {
                    setTimeout(resolve, validateDebounce);
                });

                // Skip since out of date
                if (validatePromise !== rootPromise) {
                    return [];
                }
            }

            const promise = validateRules(
                namePath,
                currentValue,
                filteredRules,
                options,
                validateFirst,
                messageVariables,
            );

            promise
                .catch(e => e)
                .then((ruleErrors: RuleError[] = EMPTY_ERRORS) => {
                    if (validatePromise === rootPromise) {
                        validatePromise = null;

                        // Get errors & warnings
                        const nextErrors: string[] = [];
                        const nextWarnings: string[] = [];
                        ruleErrors.forEach?.(({ rule: { warningOnly }, errors = EMPTY_ERRORS }) => {
                            if (warningOnly) {
                                nextWarnings.push(...errors);
                            } else {
                                nextErrors.push(...errors);
                            }
                        });

                        errors = nextErrors;
                        warnings = nextWarnings;
                        triggerMetaEvent();

                        reRender();
                    }
                });

            return promise;
        });

        if (validateOnly) {
            return rootPromise;
        }

        validatePromise = rootPromise;
        dirty = true;
        errors = EMPTY_ERRORS;
        warnings = EMPTY_ERRORS;
        triggerMetaEvent();

        // Force trigger re-render since we need sync renderProps with new meta
        reRender();

        return rootPromise;
    };

    return <Show when={resetCount() >= 0}>{props.children(getControlled(), getMeta(), props.fieldContext)}</Show>;
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

    return (
        <Field
            name={props.name !== undefined ? getNamePath(props.name) : undefined}
            isListField={!!listContext}
            {...restProps}
            fieldContext={fieldContext}
        />
    );
}

export default WrapperField;
