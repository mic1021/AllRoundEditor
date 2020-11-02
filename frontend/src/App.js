import React from 'react';
import EquationList from './components/textAreaComponents/EquationList';
import TextArea from './components/TextArea';

import './App.css';

class App extends React.Component {
  render () {
    return (
      <div>
        <EquationList></EquationList>
        <TextArea></TextArea>
      </div>
    );
  } 
}

export default App;
