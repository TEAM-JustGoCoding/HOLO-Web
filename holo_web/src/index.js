import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

/*
ReactDOM.render(
  <React.StrictMode>
    <Board />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);