import  { useState, useEffect } from "react";
import { AnswersNames } from "types/api";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";
import { RadioGroup, RadioGroupProps } from "@alfalab/core-components/radio-group";
import { CheckboxGroup, CheckboxGroupProps } from "@alfalab/core-components/checkbox-group";
import { Checkbox } from "@alfalab/core-components/checkbox";
import { Radio } from "@alfalab/core-components/radio";
import { Button } from "@alfalab/core-components/button";

import { quizzesSelector, currentQuestionSelector, quizLengthSelector  } from '../../../store/quiz/selectors';
import { useAppSelector } from 'store';

import "./quiz-card.css";

type QuizCardType = {
  handleSwitchQuestion: (answer: string) => void;
  handleSwicthQuestionCheck: (answer: any) => void;
};

export const QuizCard = ({
  handleSwitchQuestion,
  handleSwicthQuestionCheck,
}: QuizCardType) => {

  const [valueCheck, setValueCheck] = useState<any>(false);
  const [value, setValue] = useState<RadioGroupProps["value"]>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const quizzes = useAppSelector(quizzesSelector);
  const currentQuestion = useAppSelector(currentQuestionSelector);
  const quizLength = useAppSelector(quizLengthSelector);
  const { answers, category, difficulty, question, multiple_correct_answers } = quizzes[currentQuestion] || {};

  useEffect(() => {
    const checkGroup: any = {};
    if (multiple_correct_answers === "true") {
      for (let [key, ] of Object.entries(answers)) {
        checkGroup[`${key}`] = false;
      }
    }
    setValueCheck(checkGroup);
  }, []);

  const handleChangeRadio: RadioGroupProps["onChange"] = (_, payload) => {
    setValue(payload?.value);
    setDisabled(true);
  };

  const handleChangeQuestion = () => {
    let trueCheck = [true];
    if (multiple_correct_answers === "true") {
      const filteredObject = Object.keys(valueCheck).reduce(function (
        key: any,
        value: any
      ){ if (trueCheck.includes(valueCheck[value]))
            key[value] = valueCheck[value];
            return key;
        },
      {});
      handleSwicthQuestionCheck(filteredObject);
      setValueCheck(false);
      setDisabled(false);
    } else {
      handleSwitchQuestion(`${value}_correct`);
      setValue(null);
      setDisabled(false);
    }
  };

  const onChangeCheck: CheckboxGroupProps["onChange"] = (_, payload) => {
    setValueCheck(
      Object.assign(Object.assign({}, valueCheck), {
        [`${payload?.name}`]: payload?.checked,
      })
    );
    setDisabled(true);
  };

  return (
    <div className="quiz-card">
      <Space direction="vertical" size={16}>
        <Typography.Title tag="h1">
          Вопрос {currentQuestion + 1} из {quizLength}
        </Typography.Title>
        <Space direction="vertical" size={8}>
          <Typography.Text view="primary-small">
            Категория вопроса: {category}
          </Typography.Text>
          <Typography.Text view="primary-small">
            Сложность вопроса: {difficulty}
          </Typography.Text>
        </Space>
        {multiple_correct_answers === "true" ? (
          <CheckboxGroup label={question}>
            {Object.keys(answers)
              .filter((name) => answers[name as AnswersNames])
              .map((name) => {
                return (
                  <Checkbox
                    label={answers[name as AnswersNames]}
                    name={name}
                    checked={valueCheck[name]}
                    onChange={onChangeCheck}/>
                );
              })}
          </CheckboxGroup>
        ) : (
          <RadioGroup
            label={question}
            value={value}
            onChange={handleChangeRadio}>
            {Object.keys(answers)
              .filter((name) => answers[name as AnswersNames])
              .map((name) => (
                <Radio
                  label={answers[name as AnswersNames]}
                  key={name}
                  value={name}/>
              ))}
          </RadioGroup>
        )}
        <Button
          view="primary"
          size="m"
          onClick={handleChangeQuestion}
          disabled={!disabled}>
          Следующий вопрос
        </Button>
      </Space>
    </div>
  );
};
