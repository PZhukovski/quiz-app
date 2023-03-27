import { ApplicationState } from '../index';

export const quizSelector = (state: ApplicationState) => state.quiz;

export const quizzesSelector = (state: ApplicationState) => quizSelector(state).quizzes;
export const isLoadingSelector = (state: ApplicationState) => quizSelector(state).isLoading;
export const hasErrorSelector = (state: ApplicationState) => quizSelector(state).hasError;
export const currentQuestionSelector = (state: ApplicationState) => quizSelector(state).currentQuestion;
export const rightAnswersSelector = (state: ApplicationState) => quizSelector(state).rightAnswers;
export const quizLengthSelector = (state: ApplicationState) => quizSelector(state).quizLength;
export const titleActiveSelector = (state: ApplicationState) => quizSelector(state).activeTitle;
