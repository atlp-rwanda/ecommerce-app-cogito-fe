import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import IndexStore from './redux/store/index';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={IndexStore}>
      <App />
    </Provider>
  </React.StrictMode>,
);
