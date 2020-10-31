import React,{ Component , useState} from 'react';
import BottomToolbarRow from './BottomToolbarRow';
import { Grid} from '@material-ui/core';
import {addStyles, StaticMathField, EditableMathField } from 'react-mathquill'

addStyles();

class BottomToolbarBox extends Component{
  constructor() {
    super();
    this.state = {
      WindowSize : window.innerWidth
    }
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.addEventListener("resize", null);
  }
  handleResize(WindowSize, event) {
    this.setState({WindowSize: window.innerWidth})
  }
  shouldComponentUpdate(nextProps,nextState){
    return ((nextState.WindowSize<600 && this.state.WindowSize>=600)
    ||(nextState.WindowSize>=600 && this.state.WindowSize<600)
    ||(nextState.WindowSize<960 && this.state.WindowSize>=960)
    ||(nextState.WindowSize>=960 && this.state.WindowSize<960)
    ||(nextState.WindowSize<1280 && this.state.WindowSize>=1280)
    ||(nextState.WindowSize>=1280 && this.state.WindowSize<1280));
  }

  getMathSymbol(_latex, _fontSize = '300%') {
    return <><StaticMathField style={{ fontSize: _fontSize }}>{_latex}</StaticMathField><div style={{ position: 'absolute', top: '80%' }}>{_latex}</div></>
  }
  render() {
    const row = [this.getMathSymbol('\\frac{}{}', '200%'), this.getMathSymbol('\\sqrt{}'), this.getMathSymbol('\\sqrt[]{}'), this.getMathSymbol('\\int', '170%'), this.getMathSymbol('\\sum', '130%'), this.getMathSymbol('+', '400%'), this.getMathSymbol('-', '400%'), this.getMathSymbol('\\times', '400%'), this.getMathSymbol('\\div', '400%'), this.getMathSymbol('\\pm', '400%'), this.getMathSymbol('\\mp'), this.getMathSymbol('\\sin^{}')];
    const latexs = ['\\sqrt{}', '\\sqrt[]{}', '\\frac{}{}', '+', '-', '\\times', '\\div', '\\pm', '\\mp', '\\int', '\\sum', '\\sin^{}', '\\cos^{}', '\\tan^{}', '', '', '', '', '', '', '', ''];
    return (
      <Grid container spacing={1}>
        <BottomToolbarRow row={row}></BottomToolbarRow>
      </Grid>
    );
  }
}

export default BottomToolbarBox;