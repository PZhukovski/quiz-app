import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

import { NotificationProps } from '@alfalab/core-components/notification';

export type NotificationsStateType = {
    notifications: NotificationProps[];
};

const initialState: NotificationsStateType = {
    notifications: [],
};

const NAME = 'notifications';

type AddNotificationProps = NotificationProps & { id?: string };

const success: CaseReducer<NotificationsStateType, PayloadAction<AddNotificationProps>> = (
    state,
    { payload: { title, children = '', id, autoCloseDelay = 5000 } },
) => {
    state.notifications.push({
        badge: 'positive',
        title,
        children,
        autoCloseDelay,
        id: id || v1(),
    });
};

const error: CaseReducer<NotificationsStateType, PayloadAction<AddNotificationProps>> = (
    state,
    { payload: { title, children = '', id, autoCloseDelay = 5000 } },
) => {
    state.notifications.push({
        badge: 'negative',
        title,
        children,
        autoCloseDelay,
        id: id || v1(),
    });
};

const neutral: CaseReducer<NotificationsStateType, PayloadAction<AddNotificationProps>> = (
    state,
    { payload: { title, children = '', autoCloseDelay = 5000, id } },
) => {
    state.notifications.push({
        title,
        children,
        autoCloseDelay,
        id: id || v1(),
    });
};

const remove: CaseReducer<NotificationsStateType, PayloadAction<string>> = (
    state,
    { payload },
) => {
    state.notifications = state.notifications.filter((notification) => notification.id !== payload);
};

export const { reducer: notificationsReducer, actions: notificationsActions } = createSlice({
    name: NAME,
    initialState,
    reducers: {
        success,
        error,
        neutral,
        remove,
    },
});
