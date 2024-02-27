import SearchOutlined from '@ant-design-solidjs/icons/es/icons/SearchOutlined';
import clsx from 'clsx';
import { composeRef } from '@ant-design-solidjs/util';

import { Button } from '../button';
import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import { useCompactItemContext } from '../space/Compact';
import type { InputProps, InputRef } from './Input';
import Input from './Input';
import { children, JSX, mergeProps, splitProps, useContext } from 'solid-js';
import { callHandler } from '../_util/event.ts';

export interface SearchProps extends InputProps {
    inputPrefixCls?: string;
    onSearch?: (
        value: string,
        event?: JSX.ChangeEvent<HTMLInputElement> | JSX.MouseEvent<HTMLElement> | JSX.KeyboardEvent<HTMLInputElement>,
        info?: {
            source?: 'clear' | 'input';
        },
    ) => void;
    enterButton?: (props: any) => JSX.Element;
    loading?: boolean;
}

const Search = (_props: SearchProps) => {
    const mergedProps = mergeProps({ enterButton: false }, _props);
    const [props, restProps] = splitProps(mergedProps, [
        'prefixCls',
        'inputPrefixCls',
        'class',
        'size',
        'suffix',
        'enterButton',
        'addonAfter',
        'loading',
        'disabled',
        'onSearch',
        'onChange',
        'onCompositionEnd',
        'onCompositionStart',
        'ref',
    ]);

    const { getPrefixCls, direction } = useContext(ConfigContext);

    let composedRef: boolean = false;

    const prefixCls = getPrefixCls('input-search', props.prefixCls);
    const inputPrefixCls = getPrefixCls('input', props.inputPrefixCls);
    const { compactSize } = useCompactItemContext(prefixCls, direction);

    const size = useSize(ctx => props.size ?? compactSize ?? ctx);

    let inputRef: InputRef = null;

    const onChange = (e: JSX.ChangeEvent<HTMLInputElement>) => {
        if (e && e.target && e.type === 'click' && props.onSearch) {
            props.onSearch((e as JSX.ChangeEvent<HTMLInputElement>).target.value, e, {
                source: 'clear',
            });
        }
        callHandler(e, props.onChange);
    };

    const onMouseDown: JSX.MouseEventHandler<HTMLElement> = e => {
        if (document.activeElement === inputRef?.input) {
            e.preventDefault();
        }
    };

    const onSearch = (e: JSX.MouseEvent<HTMLElement> | JSX.KeyboardEvent<HTMLInputElement>) => {
        if (props.onSearch) {
            props.onSearch(inputRef?.input?.value, e, {
                source: 'input',
            });
        }
    };

    const onPressEnter = (e: JSX.KeyboardEvent<HTMLInputElement>) => {
        if (composedRef || props.loading) {
            return;
        }
        onSearch(e);
    };

    const searchIcon = typeof props.enterButton === 'boolean' ? <SearchOutlined /> : null;
    const btnClassName = `${prefixCls}-button`;

    const getAddonAfterButton = (): JSX.Element => {
        let button: JSX.Element;
        const enterButtonAsElement = children(() => props.enterButton);

        const ele = enterButtonAsElement() as HTMLElement;

        const isAntdButton = ele.tagName === 'BUTTON';

        if (isAntdButton) {
            button = cloneElement(enterButtonAsElement, {
                onMouseDown,
                onClick: (e: JSX.MouseEvent<HTMLButtonElement>) => {
                    enterButtonAsElement?.props?.onClick?.(e);
                    onSearch(e);
                },
                key: 'enterButton',
                ...(isAntdButton
                    ? {
                          className: btnClassName,
                          size,
                      }
                    : {}),
            });
        } else {
            button = (
                <Button
                    class={btnClassName}
                    type={props.enterButton ? 'primary' : undefined}
                    size={size()}
                    disabled={props.disabled}
                    key="enterButton"
                    onMouseDown={onMouseDown}
                    onClick={onSearch}
                    loading={props.loading}
                    icon={searchIcon}
                >
                    {props.enterButton}
                </Button>
            );
        }
        if (props.addonAfter) {
            button = [
                button,
                cloneElement(addonAfter, {
                    key: 'addonAfter',
                }),
            ];
        }

        return button;
    };

    const handleOnCompositionStart: JSX.CompositionEventHandler<HTMLInputElement> = e => {
        composedRef = true;
        callHandler(e, props.onCompositionStart);
    };

    const handleOnCompositionEnd: JSX.CompositionEventHandler<HTMLInputElement> = e => {
        composedRef = false;
        callHandler(e, props.onCompositionEnd);
    };

    return (
        <Input
            ref={composeRef<InputRef>(inputRef, props.ref)}
            onPressEnter={onPressEnter}
            {...restProps}
            size={size()}
            onCompositionStart={handleOnCompositionStart}
            onCompositionEnd={handleOnCompositionEnd}
            prefixCls={inputPrefixCls}
            addonAfter={getAddonAfterButton()}
            suffix={props.suffix}
            onChange={onChange}
            class={clsx(
                prefixCls,
                {
                    [`${prefixCls}-rtl`]: direction === 'rtl',
                    [`${prefixCls}-${size}`]: !!size,
                    [`${prefixCls}-with-button`]: !!props.enterButton,
                },
                props.class,
            )}
            disabled={props.disabled}
        />
    );
};

if (process.env.NODE_ENV !== 'production') {
    Search.displayName = 'Search';
}

export default Search;
