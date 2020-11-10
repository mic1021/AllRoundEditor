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

  const getMathSymbol = (_latex, text, _fontSize, _textSize, _topPos) => (
    <>
      <StaticMathField style={{ fontSize: _fontSize }}>{_latex}</StaticMathField>
      <div style={{ fontSize: _textSize, position: 'absolute', top: _topPos }}>{text}</div>
    </>
  );
  const rows = [];
  latexEquations.forEach(data => {
    rows.push(getMathSymbol(data.equation, data.text,data.fontSize,data.textSize,data.topPos));

    return rows;
  })
  return (
    <Grid container spacing={1}>
      <BottomToolbarRow row={rows} />
    </Grid>
  );
};

export default BottomToolbarBox;
