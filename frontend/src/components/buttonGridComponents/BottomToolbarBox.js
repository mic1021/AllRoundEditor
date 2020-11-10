import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { addStyles, StaticMathField } from 'react-mathquill';
import BottomToolbarRow from './BottomToolbarRow';
import latexEquations from '../../equations/Equations';

addStyles();

const BottomToolbarBox = () => {
  const [WindowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = () => {
    if ((WindowSize < 600 && window.innerWidth >= 600)
    || (WindowSize >= 600 && window.innerWidth < 600)
    || (WindowSize < 960 && window.innerWidth >= 960)
    || (WindowSize >= 960 && window.innerWidth < 960)
    || (WindowSize < 1280 && window.innerWidth >= 1280)
    || (WindowSize >= 1280 && window.innerWidth < 1280)) {
      setWindowSize(window.innerWidth);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  const getMathSymbol = (_latex, text, _fontSize = '300%', _textSize = '100%', _topPos = '80%') => (
    <>
      <StaticMathField style={{ fontSize: _fontSize }}>{_latex}</StaticMathField>
      <div style={{ fontSize: _textSize, position: 'absolute', top: _topPos }}>{text}</div>
    </>
  );
  const rows = [];
  latexEquations.forEach(data => {
    rows.push(getMathSymbol(data.equation, data.text));

    return rows;
  })
  // const row = [getMathSymbol('\\frac{}{}', '\\frac', '200%'),
  // getMathSymbol('\\sqrt{}', '\\sqrt'),
  // getMathSymbol('\\sqrt[]{}', '^{}\\sqrt'),
  // getMathSymbol('\\int', '\\int', '170%'),
  // getMathSymbol('\\sum', '\\sum', '130%'),
  // getMathSymbol('\\prod', '\\prod', '130%'),
  // getMathSymbol('x\\^{}', '^', '300%', '150%', '70%'),
  // getMathSymbol('x\\_{}', '_', '300%', '150%', '70%'),
  // getMathSymbol('\\times', '\\times', '400%'),
  // getMathSymbol('\\div', '\\div', '400%'),
  // getMathSymbol('\\pm', '\\pm', '400%'),
  // getMathSymbol('\\mp', '\\mp'),
  // getMathSymbol('\\cap', '\\cap'),
  // getMathSymbol('\\cup', '\\cup'),
  // getMathSymbol('\\varnothing', '\\varnothing'),
  // getMathSymbol('\\oplus', '\\oplus'),
  // getMathSymbol('\\otimes', '\\otimes'),
  // getMathSymbol('\\subset', '\\subset'),
  // getMathSymbol('\\supset', '\\supset'),
  // getMathSymbol('\\le', '\\le'),
  // getMathSymbol('\\ge', '\\ge'),
  // getMathSymbol('\\therefore', '\\therefore'),
  // getMathSymbol('\\wedge', '\\wedge'),
  // getMathSymbol('\\vee', '\\vee')];
  return (
    <Grid container spacing={1}>
      <BottomToolbarRow row={rows} />
    </Grid>
  );
};

export default BottomToolbarBox;
