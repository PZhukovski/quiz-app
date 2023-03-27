import { Quiz } from 'components/quiz';
import { Title } from 'components/title';
import { Notifications } from './app-notifications';
import { titleActiveSelector } from '../../store/quiz/selectors';
import { useAppSelector } from 'store';
import './app.css';

export const App = ()  => {
   const activeTitle = useAppSelector(titleActiveSelector);

   return ( <div className="app">
        {activeTitle ?  <Title /> :  <Quiz /> }
         <Notifications />
    </div>
   )
};

