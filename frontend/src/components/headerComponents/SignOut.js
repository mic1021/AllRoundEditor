import React from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../slices/EquationSlice';

export default function SignOut() {
  const dispatch = useDispatch(LOGIN);
  const handleClick = (event) => {
    localStorage.removeItem('FBIdToken');
    dispatch(LOGIN());
  }
  return (
    <Button onClick={handleClick}>Sign Out</Button> 
  )
}
  