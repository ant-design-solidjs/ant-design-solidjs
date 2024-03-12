import { createTheme } from '@ant-design-solidjs/cssinjs';
import IconContext from '@ant-design-solidjs/icons/es/components/Context';
// import useMemo from 'rc-util/lib/hooks/useMemo';
// import { merge } from '@ant-design-solidjs/util';

import warning, { WarningContext } from '../_util/warning';
// import type { WarningContextProps } from '../_util/warning';
// import type { FormProps } from '../form/Form';
// import ValidateMessagesContext from '../form/validateMessagesContext';
// import type { InputProps } from '../input';
// import type { Locale } from '../locale';
// import LocaleProvider, { ANT_MARK } from '../locale';
// import type { LocaleContextProps } from '../locale/context';
// import LocaleContext from '../locale/context';
// import defaultLocale from '../locale/en_US';
// import type { PaginationProps } from '../pagination';
// import type { SelectProps } from '../select';
// import type { SpaceProps } from '../space';
// import type { TabsProps } from '../tabs';
import { defaultConfig, defaultTheme, DesignTokenContext } from '../theme/context';
import defaultSeedToken from '../theme/themes/seed';
import type {
    //     BadgeConfig,
    ButtonConfig,
    ComponentStyleConfig,
    ConfigConsumerProps,
    CSPConfig,
    DirectionType,
    //     DrawerConfig,
    FlexConfig,
    //     ModalConfig,
    //     PopupOverflow,
    Theme,
    ThemeConfig,
    //     WaveConfig,
} from './context';
import { ConfigConsumer, ConfigContext, defaultIconPrefixCls } from './context';
import { Component, createMemo, JSX, useContext } from 'solid-js';
import { SizeType } from './SizeContext.tsx';
import { registerTheme } from './cssVariables';
// import type { RenderEmptyHandler } from './defaultRenderEmpty';
import { DisabledContextProvider } from './DisabledContext';
import useConfig from './hooks/useConfig';
// import useTheme from './hooks/useTheme';
import MotionWrapper from './MotionWrapper';
import PropWarning from './PropWarning';
// import type { SizeType } from './SizeContext';
import SizeContext, { SizeContextProvider } from './SizeContext';
import useTheme from './hooks/useTheme.ts';
import { OverrideToken } from '../theme/interface';
import useThemeKey from './hooks/useThemeKey.ts';
// import useStyle from './style';
// import { Component, JSX } from 'solid-js';

/**
 * Since too many feedback using static method like `Modal.confirm` not getting theme, we record the
 * theme register info here to help developer get warning info.
 */
let existThemeConfig = false;

export const warnContext: (componentName: string) => void =
    process.env.NODE_ENV !== 'production'
        ? (componentName: string) => {
              warning(
                  !existThemeConfig,
                  componentName,
                  `Static function can not consume context like dynamic theme. Please use 'App' component instead.`,
              );
          }
        : /* istanbul ignore next */
          null!;

export {
    ConfigConsumer,
    ConfigContext,
    defaultIconPrefixCls,
    type ConfigConsumerProps,
    type CSPConfig,
    type DirectionType,
    //     type RenderEmptyHandler,
    type ThemeConfig,
};
//
// export const configConsumerProps = [
//     'getTargetContainer',
//     'getPopupContainer',
//     'rootPrefixCls',
//     'getPrefixCls',
//     'renderEmpty',
//     'csp',
//     'autoInsertSpaceInButton',
//     'locale',
// ];

// These props is used by `useContext` directly in sub component
const PASSED_PROPS: Exclude<keyof ConfigConsumerProps, 'rootPrefixCls' | 'getPrefixCls' | 'warning'>[] = [
    'getTargetContainer',
    'getPopupContainer',
    // 'renderEmpty',
    // 'input',
    // 'pagination',
    // 'form',
    // 'select',
    'button',
];

export interface ConfigProviderProps {
    getTargetContainer?: () => HTMLElement | Window;
    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
    prefixCls?: string;
    iconPrefixCls?: string;
    children?: JSX.Element;
    //     renderEmpty?: RenderEmptyHandler;
    csp?: CSPConfig;
    autoInsertSpaceInButton?: boolean;
    //     // form?: ComponentStyleConfig & Pick<FormProps, 'requiredMark' | 'colon' | 'scrollToFirstError' | 'validateMessages'>;
    //     // input?: ComponentStyleConfig & Pick<InputProps, 'autoComplete' | 'classes' | 'styles'>;
    //     // select?: ComponentStyleConfig & Pick<SelectProps, 'showSearch'>;
    //     // pagination?: ComponentStyleConfig & Pick<PaginationProps, 'showSizeChanger'>;
    // locale?: Locale;
    componentSize?: SizeType;
    componentDisabled?: boolean;
    direction?: DirectionType;
    //     // space?: Pick<SpaceProps, 'size' | 'class' | 'classes' | 'style' | 'styles'>;
    //     virtual?: boolean;
    popupMatchSelectWidth?: boolean;
    //     // popupOverflow?: PopupOverflow;
    theme?: ThemeConfig;
    //     // warning?: WarningContextProps;
    alert?: ComponentStyleConfig;
    anchor?: ComponentStyleConfig;
    button?: ButtonConfig;
    //     // calendar?: ComponentStyleConfig;
    //     // carousel?: ComponentStyleConfig;
    //     // cascader?: ComponentStyleConfig;
    //     // collapse?: ComponentStyleConfig;
    //     // divider?: ComponentStyleConfig;
    //     // drawer?: DrawerConfig;
    //     // typography?: ComponentStyleConfig;
    skeleton?: ComponentStyleConfig;
    //     // spin?: ComponentStyleConfig;
    //     // segmented?: ComponentStyleConfig;
    //     // statistic?: ComponentStyleConfig;
    //     // steps?: ComponentStyleConfig;
    //     // image?: ComponentStyleConfig;
    //     // layout?: ComponentStyleConfig;
    //     // list?: ComponentStyleConfig;
    //     // mentions?: ComponentStyleConfig;
    //     // modal?: ModalConfig;
    //     // progress?: ComponentStyleConfig;
    //     // result?: ComponentStyleConfig;
    //     // slider?: ComponentStyleConfig;
    //     // breadcrumb?: ComponentStyleConfig;
    //     // menu?: ComponentStyleConfig;
    //     // checkbox?: ComponentStyleConfig;
    //     // descriptions?: ComponentStyleConfig;
    //     // empty?: ComponentStyleConfig;
    //     // badge?: BadgeConfig;
    //     // radio?: ComponentStyleConfig;
    //     // rate?: ComponentStyleConfig;
    //     // switch?: ComponentStyleConfig;
    //     // transfer?: ComponentStyleConfig;
    //     // avatar?: ComponentStyleConfig;
    //     // message?: ComponentStyleConfig;
    //     // tag?: ComponentStyleConfig;
    //     // table?: ComponentStyleConfig;
    //     // card?: ComponentStyleConfig;
    //     // tabs?: ComponentStyleConfig & Pick<TabsProps, 'indicator' | 'indicatorSize'>;
    //     // timeline?: ComponentStyleConfig;
    //     // timePicker?: ComponentStyleConfig;
    //     // upload?: ComponentStyleConfig;
    //     // notification?: ComponentStyleConfig;
    //     // tree?: ComponentStyleConfig;
    //     // colorPicker?: ComponentStyleConfig;
    //     // datePicker?: ComponentStyleConfig;
    //     // rangePicker?: ComponentStyleConfig;
    //     // dropdown?: ComponentStyleConfig;
    flex?: FlexConfig;
    //     /**
    //      * Wave is special component which only patch on the effect of component interaction.
    //      */
    //     // wave?: WaveConfig;
}

interface ProviderChildrenProps extends ConfigProviderProps {
    parentContext: ConfigConsumerProps;
    // legacyLocale: Locale;
}

type holderRenderType = (children: JSX.Element) => JSX.Element;

export const defaultPrefixCls = 'ant';
let globalPrefixCls: string;
let globalIconPrefixCls: string;
let globalTheme: ThemeConfig;
let globalHolderRender: holderRenderType | undefined;

function getGlobalPrefixCls() {
    return globalPrefixCls || defaultPrefixCls;
}

function getGlobalIconPrefixCls() {
    return globalIconPrefixCls || defaultIconPrefixCls;
}

function isLegacyTheme(theme: Theme | ThemeConfig): theme is Theme {
    return Object.keys(theme).some(key => key.endsWith('Color'));
}

interface GlobalConfigProps {
    prefixCls?: string;
    iconPrefixCls?: string;
    theme?: Theme | ThemeConfig;
    holderRender?: holderRenderType;
}

const setGlobalConfig = (props: GlobalConfigProps) => {
    const { prefixCls, iconPrefixCls, theme, holderRender } = props;
    if (prefixCls !== undefined) {
        globalPrefixCls = prefixCls;
    }
    if (iconPrefixCls !== undefined) {
        globalIconPrefixCls = iconPrefixCls;
    }
    if ('holderRender' in props) {
        globalHolderRender = holderRender;
    }

    if (theme) {
        if (isLegacyTheme(theme)) {
            warning(
                false,
                'ConfigProvider',
                '`config` of css variable theme is not work in v5. Please use new `theme` config instead.',
            );
            registerTheme(getGlobalPrefixCls(), theme);
        } else {
            globalTheme = theme;
        }
    }
};

export const globalConfig = () => ({
    getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
        if (customizePrefixCls) {
            return customizePrefixCls;
        }
        return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
    },
    getIconPrefixCls: getGlobalIconPrefixCls,
    getRootPrefixCls: () => {
        // If Global prefixCls provided, use this
        if (globalPrefixCls) {
            return globalPrefixCls;
        }

        // Fallback to default prefixCls
        return getGlobalPrefixCls();
    },
    getTheme: () => globalTheme,
    holderRender: globalHolderRender,
});

function ProviderChildren(props: ProviderChildrenProps) {
    //     const {
    //         children,
    //         csp: customCsp,
    //         autoInsertSpaceInButton,
    //         // alert,
    //         // anchor,
    //         // form,
    //         // locale,
    //         componentSize,
    //         direction,
    //         // space,
    //         virtual,
    //         // dropdownMatchSelectWidth,
    //         popupMatchSelectWidth,
    //         // popupOverflow,
    //         legacyLocale,
    //         parentContext,
    //         iconPrefixCls: customIconPrefixCls,
    //         // theme,
    //         componentDisabled,
    //         // segmented,
    //         // statistic,
    //         // spin,
    //         // calendar,
    //         // carousel,
    //         // cascader,
    //         // collapse,
    //         // typography,
    //         // checkbox,
    //         // descriptions,
    //         // divider,
    //         // drawer,
    //         // skeleton,
    //         // steps,
    //         // image,
    //         // layout,
    //         // list,
    //         // mentions,
    //         // modal,
    //         // progress,
    //         // result,
    //         // slider,
    //         // breadcrumb,
    //         // menu,
    //         // pagination,
    //         // input,
    //         // empty,
    //         // badge,
    //         // radio,
    //         // rate,
    //         // switch: SWITCH,
    //         // transfer,
    //         // avatar,
    //         // message,
    //         // tag,
    //         // table,
    //         // card,
    //         // tabs,
    //         // timeline,
    //         // timePicker,
    //         // upload,
    //         // notification,
    //         // tree,
    //         // colorPicker,
    //         // datePicker,
    //         // rangePicker,
    //         // flex,
    //         // wave,
    //         // dropdown,
    //         // warning: warningConfig,
    //     } = props;
    //
    //     // =================================== Context ===================================
    const getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
        if (customizePrefixCls) {
            return customizePrefixCls;
        }

        const mergedPrefixCls = props.prefixCls || props.parentContext.getPrefixCls('');

        return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    };
    //
    //     const iconPrefixCls = customIconPrefixCls || parentContext.iconPrefixCls || defaultIconPrefixCls;
    //     const csp = customCsp || parentContext.csp;
    //
    //     useStyle(iconPrefixCls, csp);
    //
    // const mergedTheme = useTheme(props.theme, props.parentContext.theme, { prefixCls: getPrefixCls('') });
    const mergedTheme = createMemo<ThemeConfig | undefined>(() => {
        if (!props.theme) {
            return props.parentContext.theme;
        }

        const themeConfig = props.theme || {};
        const parentThemeConfig: ThemeConfig =
            themeConfig.inherit === false || !props.parentContext.theme ? defaultConfig : props.parentContext.theme;

        // Override
        const mergedComponents = {
            ...parentThemeConfig.components,
        };

        Object.keys(props.theme.components || {}).forEach((componentName: keyof OverrideToken) => {
            mergedComponents[componentName] = {
                ...mergedComponents[componentName],
                ...props.theme.components![componentName],
            } as any;
        });
        const themeKey = useThemeKey();
        const cssVarKey = `css-var-${themeKey.replace(/:/g, '')}`;
        const mergedCssVar = (themeConfig.cssVar ?? parentThemeConfig.cssVar) && {
            prefix: getPrefixCls(''), // Same as prefixCls by default
            ...(typeof parentThemeConfig.cssVar === 'object' ? parentThemeConfig.cssVar : {}),
            ...(typeof themeConfig.cssVar === 'object' ? themeConfig.cssVar : {}),
            key: (typeof themeConfig.cssVar === 'object' && themeConfig.cssVar?.key) || cssVarKey,
        };

        // Base token
        return {
            ...parentThemeConfig,
            ...themeConfig,

            token: {
                ...parentThemeConfig.token,
                ...themeConfig.token,
            },
            components: mergedComponents,
            cssVar: mergedCssVar,
        };
    });

    // if (process.env.NODE_ENV !== 'production') {
    //     existThemeConfig = existThemeConfig || !!mergedTheme;
    // }

    // https://github.com/ant-design/ant-design/issues/27617
    const memoedConfig = createMemo(() => {
        const baseConfig = {
            csp: props.csp,
            autoInsertSpaceInButton: props.autoInsertSpaceInButton,
            alert: props.alert,
            anchor: props.anchor,
            //         locale: locale || legacyLocale,
            direction: props.direction,
            //         space,
            //         virtual,
            popupMatchSelectWidth: props.popupMatchSelectWidth,
            //         popupOverflow,
            //         getPrefixCls,
            //         iconPrefixCls,
            theme: mergedTheme(),
            //         segmented,
            //         statistic,
            //         spin,
            //         calendar,
            //         carousel,
            //         cascader,
            //         collapse,
            //         typography,
            //         checkbox,
            //         descriptions,
            //         divider,
            //         drawer,
            skeleton: props.skeleton,
            //         steps,
            //         image,
            //         input,
            //         layout,
            //         list,
            //         mentions,
            //         modal,
            //         progress,
            //         result,
            //         slider,
            //         breadcrumb,
            //         menu,
            //         pagination,
            //         empty,
            //         badge,
            //         radio,
            //         rate,
            //         switch: SWITCH,
            //         transfer,
            //         avatar,
            //         message,
            //         tag,
            //         table,
            //         card,
            //         tabs,
            //         timeline,
            //         timePicker,
            //         upload,
            //         notification,
            //         tree,
            //         colorPicker,
            //         datePicker,
            //         rangePicker,
            //         flex,
            //         wave,
            //         dropdown,
            //         warning: warningConfig,
        };

        const config: ConfigConsumerProps = {
            ...props.parentContext,
        };

        Object.keys(baseConfig).forEach((key: keyof typeof baseConfig) => {
            if (baseConfig[key] !== undefined) {
                (config as any)[key] = baseConfig[key];
            }
        });

        // Pass the props used by `useContext` directly with child component.
        // These props should merge into `config`.
        PASSED_PROPS.forEach(propName => {
            const propValue = props[propName];
            if (propValue) {
                (config as any)[propName] = propValue;
            }
        });

        return config;
    });

    const memoIconContextValue = createMemo(() => ({ prefixCls: props.iconPrefixCls, csp: props.csp }));

    // ================================ Dynamic theme ================================
    const memoTheme = createMemo(() => {
        const { algorithm, token, components, cssVar, ...rest } = mergedTheme() || {};

        const themeObj =
            algorithm && (!Array.isArray(algorithm) || algorithm.length > 0) ? createTheme(algorithm) : defaultTheme;

        const parsedComponents: any = {};
        Object.entries(components || {}).forEach(([componentName, componentToken]) => {
            const parsedToken: typeof componentToken & { theme?: typeof defaultTheme } = {
                ...componentToken,
            };
            if ('algorithm' in parsedToken) {
                if (parsedToken.algorithm === true) {
                    parsedToken.theme = themeObj;
                } else if (Array.isArray(parsedToken.algorithm) || typeof parsedToken.algorithm === 'function') {
                    parsedToken.theme = createTheme(parsedToken.algorithm);
                }
                delete parsedToken.algorithm;
            }
            parsedComponents[componentName] = parsedToken;
        });

        const mergedToken = {
            ...defaultSeedToken,
            ...token,
        };

        return {
            ...rest,
            theme: themeObj,

            token: mergedToken,
            components: parsedComponents,
            override: {
                override: mergedToken,
                ...parsedComponents,
            },
            cssVar: cssVar as Exclude<ThemeConfig['cssVar'], boolean>,
        };
    });

    const childNode = createMemo(() => {
        let node = (
            <>
                <PropWarning dropdownMatchSelectWidth={props.popupMatchSelectWidth} />
                {props.children}
            </>
        );

        // const validateMessages = merge(
        //     defaultLocale.Form?.defaultValidateMessages || {},
        // memoedConfig().locale?.Form?.defaultValidateMessages || {},
        // memoedConfig().form?.validateMessages || {},
        // form?.validateMessages || {},
        // );

        // if (Object.keys(validateMessages).length > 0) {
        //     node = (
        //         <ValidateMessagesContext.Provider value={validateMessages}>
        //             {childNode}
        //         </ValidateMessagesContext.Provider>
        //     );
        // }
        //
        //     if (locale) {
        //         node = (
        //             <LocaleProvider locale={locale} _ANT_MARK__={ANT_MARK}>
        //                 {childNode}
        //             </LocaleProvider>
        //         );
        //     }
        //
        if (props.iconPrefixCls || props.csp) {
            node = <IconContext.Provider value={memoIconContextValue()}>{node}</IconContext.Provider>;
        }

        if (props.componentSize) {
            node = <SizeContextProvider size={props.componentSize}>{node}</SizeContextProvider>;
        }

        // =================================== Motion ===================================
        node = <MotionWrapper>{node}</MotionWrapper>;

        if (props.theme) {
            node = <DesignTokenContext.Provider value={memoTheme()}>{node}</DesignTokenContext.Provider>;
        }

        // ================================== Warning ===================================
        if (memoedConfig().warning) {
            node = <WarningContext.Provider value={memoedConfig().warning}>{node}</WarningContext.Provider>;
        }

        // =================================== Render ===================================
        if (props.componentDisabled !== undefined) {
            node = <DisabledContextProvider disabled={props.componentDisabled}>{node}</DisabledContextProvider>;
        }

        return node;
    });

    return <ConfigContext.Provider value={memoedConfig()}>{childNode()}</ConfigContext.Provider>;
}

const ConfigProvider: Component<ConfigProviderProps> & {
    //     /** @private internal Usage. do not use in your production */
    ConfigContext: typeof ConfigContext;
    /** @deprecated Please use `ConfigProvider.useConfig().componentSize` instead */
    SizeContext: typeof SizeContext;
    config: typeof setGlobalConfig;
    useConfig: typeof useConfig;
} = props => {
    const context = useContext<ConfigConsumerProps>(ConfigContext);
    // const antLocale = useContext<LocaleContextProps | undefined>(LocaleContext);

    return (
        <ProviderChildren
            parentContext={context}
            // legacyLocale={antLocale!}
            {...props}
        />
    );
};
//
ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.SizeContext = SizeContext;
ConfigProvider.config = setGlobalConfig;
ConfigProvider.useConfig = useConfig;
//
Object.defineProperty(ConfigProvider, 'SizeContext', {
    get: () => {
        warning(
            false,
            'ConfigProvider',
            'ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead.',
        );
        return SizeContext;
    },
});

export default ConfigProvider;
