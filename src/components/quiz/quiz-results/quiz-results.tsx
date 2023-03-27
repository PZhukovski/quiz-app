import { useState, useEffect } from "react";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";

import { quizLengthSelector , rightAnswersSelector } from '../../../store/quiz/selectors'
import { quizActions } from "../../../store/quiz/slice";
import { useAppDispatch, useAppSelector } from 'store';
import "./quiz-results.css";
import { Button } from "@alfalab/core-components/button";

export const QuizResults = () => {
  const [pass, setPass] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const rightAnswers = useAppSelector(rightAnswersSelector);
  const quizLength = useAppSelector(quizLengthSelector);

  useEffect(() => {
    isPass();
  }, []);

  const isPass = () => {
    (rightAnswers / quizLength) * 100 > 80 ? setPass(true) : setPass(false);
  };

  const handleRetryTest = () => {
    dispatch(quizActions.retryTest());
  }

  return (
    <div className="quiz-results">
      <Space direction="vertical" size={20}>
        <Typography.Title tag="h1">Тест закончен</Typography.Title>
        <Typography.Text view="primary-large">
          {pass
            ? "Ты успешно прошел тест, ты набрал больше 80% верных ответов"
            : "Тест не пройден, ты набрал меньше 80% верных ответов"}
        </Typography.Text>
        {pass ? (
          <Typography.Text view="primary-large">
            Ваш результат: {rightAnswers} из {quizLength} правильных ответов
          </Typography.Text>
        ) : (
          <Button view="primary" onClick={handleRetryTest}>
            Пройти еще раз
          </Button>
        )}
      </Space>
    </div>
  );
};
