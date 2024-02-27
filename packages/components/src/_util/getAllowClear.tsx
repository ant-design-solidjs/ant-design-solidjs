import CloseCircleFilled from '@ant-design-solidjs/icons/es/icons/CloseCircleFilled';
import type { BaseInputProps } from '../sc-input/interface';

export type AllowClear = BaseInputProps['allowClear'];

const getAllowClear = (allowClear: AllowClear): AllowClear => {
    let mergedAllowClear: AllowClear;
    if (typeof allowClear === 'object' && allowClear?.clearIcon) {
        mergedAllowClear = allowClear;
    } else if (allowClear) {
        mergedAllowClear = {
            clearIcon: <CloseCircleFilled />,
        };
    }

    return mergedAllowClear;
};

export default getAllowClear;
