import type { ConfigOptions as MessageConfig, MessageInstance } from '../message/interface';
import type { HookAPI as ModalHookAPI } from '../modal/useModal';
import type { NotificationConfig, NotificationInstance } from '../notification/interface';
import { createContext } from 'solid-js';

export interface AppConfig {
    message?: MessageConfig;
    notification?: NotificationConfig;
}

export const AppConfigContext = createContext<AppConfig>({});

export interface useAppProps {
    message: MessageInstance;
    notification: NotificationInstance;
    modal: ModalHookAPI;
}

const AppContext = createContext<useAppProps>({
    message: {},
    notification: {},
    modal: {},
} as useAppProps);

export default AppContext;
