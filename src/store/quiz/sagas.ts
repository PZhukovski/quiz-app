import { takeLatest, call, put } from 'redux-saga/effects';
import { getQuizzes } from 'api/quiz';
import { QuizType } from 'types/api';

import { quizActions } from './slice';
import { notificationsActions } from '../notifications';

import { store } from '../../store/index'

function* getQuizzesSaga() {
    try {
        const urlParams: string | null = store.getState().quiz.requestQuizParams;
        const quizzes: QuizType[] = yield call(getQuizzes, urlParams);
        yield put(quizActions.success(quizzes));
        yield put(notificationsActions.success({ title: 'Успешно загружено' }))
    } catch (e) {
        yield put(quizActions.failure());
        yield put(notificationsActions.error({ title: 'По выбранным параметрам не удалось получить список вопросов' }))
    }
}

export function* watchQuizSaga() {
    yield takeLatest(quizActions.request.type, getQuizzesSaga);
}
