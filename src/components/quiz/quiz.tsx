import { isSetTrue } from "utils/is-set-true";
import { CorrectAnswersNames } from "types/api";
import { QuizCard } from "./quiz-card";
import { isEqual, mapKeys } from "lodash";
import { QuizResults } from "./quiz-results";
import { quizzesSelector, currentQuestionSelector, quizLengthSelector  } from '../../store/quiz/selectors'
import { quizActions } from "../../store/quiz/slice";
import { useAppDispatch, useAppSelector } from 'store';

export const Quiz = () => {
  const dispatch = useAppDispatch();
  const quizzes = useAppSelector(quizzesSelector);
  const currentQuestion = useAppSelector(currentQuestionSelector);
  const quizLength = useAppSelector(quizLengthSelector);

  const { correct_answers } = quizzes[currentQuestion] || {};

  const handleSwitchQuestion = (answer: string) => {
    dispatch(quizActions.switchQuestion(isSetTrue(correct_answers[answer as CorrectAnswersNames])))
  };

  const handleSwicthQuestionCheck = (answer: any) => {
    const correctAnswers = mapKeys(answer, function (_, value) {
      return `${value}_correct`;
    });
    for (let key in correctAnswers) {
      correctAnswers[key] = correctAnswers[key].toString();
    }
    const current_answers: any = correct_answers;
    const trueCheck: string[] = ["true"];
    const filteredObject = Object.keys(current_answers).reduce(function (key: any,value) {
      if (trueCheck.includes(current_answers[value]))
        key[value] = current_answers[value];
      return key;
    },{});
    dispatch(quizActions.switchQuestion(isEqual(correctAnswers, filteredObject)))
  };

  return (
    <div className="quiz">
      {currentQuestion === quizLength ? (
        <QuizResults/>
      ) : (
        <QuizCard
          handleSwitchQuestion={handleSwitchQuestion}
          handleSwicthQuestionCheck={handleSwicthQuestionCheck}
        />
      )}
    </div>
  );
};
