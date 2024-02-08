export const STATUS_ADD = 'add' as const;
export const STATUS_KEEP = 'keep' as const;
export const STATUS_REMOVE = 'remove' as const;
export const STATUS_REMOVED = 'removed' as const;
export type DiffStatus = typeof STATUS_ADD | typeof STATUS_KEEP | typeof STATUS_REMOVE | typeof STATUS_REMOVED;

export type Key = string | number;
export interface KeyObject {
    key: Key;
    status?: DiffStatus;
}
