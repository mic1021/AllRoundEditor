import React from 'react';
import Header from './components/Header';
import EquationListContainer from './components/EquationListContainer';
import TextArea from './components/TextArea';

import './App.css';

function App() {
  return (
    <>
      <Header></Header>
      <EquationListContainer></EquationListContainer>
      <TextArea></TextArea>
    </>
  );
}

export default App;
