import axios from 'axios';
import { QuizType } from 'types/api';

const API_KEY = 'V0e27cv7yuTX8KwGtZsIYtcsf28yeGnBOe8S6DKX';


export const getQuizzes = (urlParams: string | null): Promise<QuizType[]> =>
    axios
        .get<QuizType[]>(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}${urlParams}`)
        .then((response) => response.data);
