import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {StaticMathField} from 'react-mathquill';
import { useDispatch } from 'react-redux';
import { TYPE } from '../../slices/EquationSlice';

export default function FavEquations() {
    const [success, setSuccess] = useState(false);
    const [equations, setEquations] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
      const createButtons = async() => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_API}/favEquations`);

          setEquations(res.data.equations);
          setSuccess(true);
        } catch(err) {
          console.error(err);
        }
      }
      createButtons();
    }, []);
  
    const handleClick = (index) => (event) => {
      console.log(equations[index]);
      dispatch(TYPE(equations[index]));
    }
    return (
      <center>
        <ButtonGroup>
        {success && (equations.map((item, index) => {
          return (
            <Button key={index} onClick={handleClick(index)}>
              <StaticMathField>{item}</StaticMathField>
            </Button>
          )
        }))}
        </ButtonGroup>
      </center>
    )
}
  