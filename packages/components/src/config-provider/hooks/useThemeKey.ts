import { createUniqueId } from 'solid-js';

const useEmptyId = () => '';

const useThemeKey = typeof createUniqueId === 'undefined' ? useEmptyId : createUniqueId;

export default useThemeKey;
