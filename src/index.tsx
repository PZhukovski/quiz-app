import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from 'components/app';
import { store } from './store';
import './global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={ store }>
      <App />
    </Provider>
);

// {
//   "search.exclude": {
//     "**/.yarn": true,
//     "**/.pnp.*": true
//   },
//   "typescript.tsdk": ".yarn/sdks/typescript/lib",
//   "typescript.enablePromptUseWorkspaceTsdk": true
// }
