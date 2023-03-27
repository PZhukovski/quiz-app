import {configureStore} from '@reduxjs/toolkit' ;
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { quizReducer } from './quiz';
import { notificationsReducer } from './notifications';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = configureStore({
    reducer: {
        quiz: quizReducer,
        notifications: notificationsReducer,
    },
    devTools: true,
    middleware: middlewares,
})

sagaMiddleware.run(rootSaga);

export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
