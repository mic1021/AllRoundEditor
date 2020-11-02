import React from 'react';
import EquationListContainer from './components/EquationListContainer';
import TextArea from './components/TextArea';

import './App.css';

class App extends React.Component {
  render () {
    return (
      <div>
        <EquationListContainer></EquationListContainer>
        <TextArea></TextArea>
      </div>
    );
  } 
}

export default App;
