import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory, createHashHistory } from 'history';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const configureHistory = () =>
  window.matchMedia('(display-mode: standalone)').matches ? createHashHistory() : createBrowserHistory();

const history = configureHistory();
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
