/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useSelector } from 'react-redux';
import { selectLoggedIn } from '../../slices/EquationSlice';

export default function favEquations() { // frequentlyUsed(history) & Saved
    const [equations, setEquations] = useState([]);
    const loggedIn = useSelector(selectLoggedIn);
    useEffect(() => {
      if (loggedIn) {
        axios.get('http://localhost:5001/allroundeditor-dcc51/asia-northeast3/api/favEquation')
            .then(res => {
                console.log("Request Success in log")
                console.log(res.data);
                setEquations(res.data);
            })
            .catch(err => console.error(err));
      }
    }, [loggedIn]);

    const handleClick = () => {
      // dispatch(replace(e.target.textContent))
      // replace current editableField content with content of e.target.textcontent
    }
  
    return (
      <ButtonGroup>
        {equations ? (
            equations.map(equation => <Button>{equation.equation}</Button>)
        ) : <></>}
      </ButtonGroup>
    )
}
  