import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  {store}  from './redux/store.ts';
import App from './App.tsx';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
