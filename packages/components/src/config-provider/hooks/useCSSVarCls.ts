import { useToken } from '../../theme/internal';

/**
 * This hook is only for cssVar to add root class for components.
 * If root class is needed, this hook could be refactored with `-root`
 * @param prefixCls
 */
const useCSSVarCls = (prefixCls: string) => {
    const [, , , , cssVar] = useToken();

    return cssVar ? `${prefixCls}-css-var` : '';
};

export default useCSSVarCls;
