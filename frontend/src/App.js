import React, { Component } from 'react';
import EquationList from './components/EquationList';
import './App.css';
import BottomToolbarBox from './BottomToolbarBox';
import {Container} from '@material-ui/core';

class App extends Component{
  render(){
    return (
      <>
      <Container>
      <EquationList></EquationList>
      </Container>
      <Container>
      <BottomToolbarBox></BottomToolbarBox>
      </Container>
      </>
    );
  }
}

export default App;
