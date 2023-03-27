import {useState, useEffect} from "react";
import { Typography } from "@alfalab/core-components/typography";
import { Button } from "@alfalab/core-components/button";
import { Select, SelectProps } from "@alfalab/core-components/select";
import { Space } from "@alfalab/core-components/space";
import { MaskedInput, MaskedInputProps } from '@alfalab/core-components/masked-input';
import { optionSelectCategory } from 'components/data-select/option-select-category';
import { optionSelectDifficulty } from 'components/data-select/option-select-difficulty'
import { quizActions} from "../../store/quiz/slice";
import { useAppDispatch } from 'store';

export const Title  = () => {

  const dispatch = useAppDispatch();
  const [difficulty, setDifficulty] = useState<SelectProps['selected']>(null);
  const [category, setCategory] =useState<SelectProps['selected']>(null);;
  const [countQuestions, setCountQuestions] = useState<MaskedInputProps['value']>('');

  const mask =[/\d/]

  useEffect(() => {
    dispatch(quizActions.requestParams(`&difficulty=${difficulty}&limit=${countQuestions}&category=${category}`))
  }, [difficulty, category, countQuestions]);

  const handleActiveChange = (e: React.MouseEvent<HTMLElement>) => {
       dispatch(quizActions.request())
  };
  const handleChangeQuestions: MaskedInputProps['onChange'] = (_, payload) => {
    setCountQuestions(payload?.value);
  }
  const handleChangeDiffuculty: SelectProps['onChange'] = (payload) => {
    setDifficulty(payload?.selected?.key);
  }
  const handleChangeCategory: SelectProps['onChange'] = (payload) => {
  setCategory(payload?.selected?.key);
  }

  return (
    <Space direction="vertical" size={20} className="quiz centered">
      <Typography.Text view="primary-small">
        Для успешного прохождения теста необходимо набрать не менее 80%
        правильных ответов. Если менее 80% ответов правильные, то в конце теста
        будет сообщение “Тест не пройден, ты набрал меньше 80% верных ответов”,
        показано количество верных ответов и кнопка “Пройти ещё раз”. Если
        больше 80% ответов правильные, то текст сообщения “Ты успешно прошел
        тест, ты набрал больше 80% верных ответов” и показано количество верных
        ответов. Кнопка для перепрохождения теста скрыта.
      </Typography.Text>
      <Space direction="horizontal" size={20}>
         <div>
          <Typography.Text> Выберите пожалуйста категорию: </Typography.Text>
          <Select size="s" onChange={handleChangeCategory} options={optionSelectCategory} placeholder="Выберите элемент" />
        </div>
        <div>
          <Typography.Text> Выберите пожалуйста сложность: </Typography.Text>
          <Select size="s" onChange = {handleChangeDiffuculty}options={optionSelectDifficulty} placeholder="Выберите элемент" />
        </div>
        <div>
        <Typography.Text> Выберите количество вопросов: </Typography.Text>
        <MaskedInput mask={mask}  onChange ={handleChangeQuestions} placeholder="Введите число" block={true} />
        </div>
      </Space>
      <Button view="primary" size="s"  onClick={handleActiveChange}>
        Приступим к тесту
      </Button>
    </Space>
  );
};
