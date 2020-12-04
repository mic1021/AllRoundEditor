/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {StaticMathField} from 'react-mathquill';
import { useSelector, useDispatch } from 'react-redux';
import { TYPE } from '../../slices/EquationSlice';

export default function FavEquations() { // frequentlyUsed(history) & Saved
    const [buttons, setButtons] = useState();
    const [equations, setEquations] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
      axios.get('http://localhost:5001/allroundeditor-261bc/asia-northeast3/api/favEquations')
          .then(res => {
            let tempEquations = []
            console.log("Request Success in log")
            console.log(res.data.equations);
            setEquations(res.data.equations);
            res.data.equations.forEach((equation, index) => {
              tempEquations.push(
                <Button key={index} onClick={handleClick(index)}>
                  <StaticMathField>{equation}</StaticMathField>
                </Button>
              );
            })
            setButtons(tempEquations);
          })
          .catch(err => console.error(err));
    }, []);
  
    const handleClick = (index) => (event) => {
      console.log(equations[index]);
      dispatch(TYPE(equations[index]));
      // dispatch(replace(e.target.textContent))
      // replace current editableField content with content of e.target.textcontent
    }
    return (
      <ButtonGroup>
        {equations ? buttons : <></>}
      </ButtonGroup>
    )
}
  