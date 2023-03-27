import { QuizType } from 'types/api';
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

type QuizStateType = {
    quizzes: QuizType[];
    currentQuestion: number;
    isLoading: boolean;
    hasError: boolean;
    rightAnswers: number;
    quizLength: number;
    requestQuizParams: string | null;
    activeTitle: boolean;
}

const initialState: QuizStateType = {
    quizzes: [],
    requestQuizParams: null,
    currentQuestion: 0,
    isLoading: true,
    hasError: false,
    rightAnswers: 0,
    quizLength: 0,
    activeTitle: true
}

const NAME = 'quiz';

const request: CaseReducer<QuizStateType> = (state) => {
    state.isLoading = true;
    state.hasError = false;
}

const requestParams:  CaseReducer<QuizStateType, PayloadAction<string>> = (state,
  { payload } ) => {
  state.requestQuizParams = payload
}
const success: CaseReducer<QuizStateType, PayloadAction<QuizType[]>> = (
    state,
    { payload }
) => {
    state.isLoading = false;
    state.hasError = false;
    state.quizzes = payload;
    state.quizLength = payload.length;
    state.activeTitle = false;
}

const failure: CaseReducer<QuizStateType> = (state) => {
    state.isLoading = false;
    state.hasError = true;
}

const retryTest: CaseReducer<QuizStateType> = (state) => {
    state.rightAnswers = 0;
    state.currentQuestion = 0;
}

const switchQuestion: CaseReducer<QuizStateType, PayloadAction<boolean>> = (
    state,
    { payload },
) => {
    state.rightAnswers = payload ? state.rightAnswers + 1 : state.rightAnswers;
    state.currentQuestion += 1;
}

export const { actions: quizActions, reducer: quizReducer } = createSlice({
    name: NAME,
    initialState: initialState,
    reducers: {
        request,
        success,
        failure,
        requestParams,
        retryTest,
        switchQuestion,
    },
})

