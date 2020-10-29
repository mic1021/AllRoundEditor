import React, { Component } from 'react';
import EquationList from './components/EquationList';

import './App.css';
import BottomToolbarBox from './BottomToolbarBox';

class App extends Component{
  render(){
    return (
      <EquationList></EquationList>
      <BottomToolbarBox>abc</BottomToolbarBox>
    );
  }
export default App;
