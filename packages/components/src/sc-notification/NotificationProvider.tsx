import { Component, createContext, JSX } from 'solid-js';

export interface NotificationContextProps {
    classes?: {
        notice?: string;
        list?: string;
    };
}

export const NotificationContext = createContext<NotificationContextProps>({});

export interface NotificationProviderProps extends NotificationContextProps {
    children: JSX.Element;
}

const NotificationProvider: Component<NotificationProviderProps> = props => {
    return (
        <NotificationContext.Provider value={{ classes: props.classes }}>{props.children}</NotificationContext.Provider>
    );
};

export default NotificationProvider;
