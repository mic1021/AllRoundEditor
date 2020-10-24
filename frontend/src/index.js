import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import Sidebar from './Sidebar';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
  document.getElementById('header')
);
ReactDOM.render(
  <React.StrictMode>
    <Body />
  </React.StrictMode>,
  document.getElementById('body')
);
ReactDOM.render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>,
  document.getElementById('footer')
);
ReactDOM.render(
  <React.StrictMode>
    <Sidebar />
  </React.StrictMode>,
  document.getElementById('sidebar')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
