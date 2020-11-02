import React,{useState, useEffect} from 'react';
import BottomToolbarRow from './BottomToolbarRow';
import { Grid} from '@material-ui/core';
import {addStyles, StaticMathField, EditableMathField } from 'react-mathquill'

addStyles();

const BottomToolbarBox = (props) => {
  const [WindowSize,setWindowSize] = useState(window.innerWidth);
  useEffect(()=>{
    window.addEventListener("resize", handleResize);
  },);
  const handleResize = (event) => {
    if((WindowSize<600 && window.innerWidth>=600)
    ||(WindowSize>=600 && window.innerWidth<600)
    ||(WindowSize<960 && window.innerWidth>=960)
    ||(WindowSize>=960 && window.innerWidth<960)
    ||(WindowSize<1280 && window.innerWidth>=1280)
    ||(WindowSize>=1280 && window.innerWidth<1280)){
      setWindowSize(window.innerWidth);
    }
  };

  const getMathSymbol = (_latex, _fontSize = '300%') => {
    return <><StaticMathField style={{ fontSize: _fontSize }}>{_latex}</StaticMathField><div style={{ position: 'absolute', top: '80%' }}>{_latex}</div></>
  };

  const row = [getMathSymbol('\\frac{}{}', '200%'), getMathSymbol('\\sqrt{}'), getMathSymbol('\\sqrt[]{}'), getMathSymbol('\\int', '170%'), getMathSymbol('\\sum', '130%'), getMathSymbol('+', '400%'), getMathSymbol('-', '400%'), getMathSymbol('\\times', '400%'), getMathSymbol('\\div', '400%'), getMathSymbol('\\pm', '400%'), getMathSymbol('\\mp'), getMathSymbol('\\sin^{}')];
  const latexs = ['\\sqrt{}', '\\sqrt[]{}', '\\frac{}{}', '+', '-', '\\times', '\\div', '\\pm', '\\mp', '\\int', '\\sum', '\\sin^{}', '\\cos^{}', '\\tan^{}', '', '', '', '', '', '', '', ''];
  return (
    <Grid container spacing={1}>
      <BottomToolbarRow row={row}></BottomToolbarRow>
    </Grid>
  );
}

export default BottomToolbarBox;