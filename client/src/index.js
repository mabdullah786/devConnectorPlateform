import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BlogComponent from './blogComponent';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <BlogComponent />
  </React.StrictMode>,
  document.getElementById('root')
);
