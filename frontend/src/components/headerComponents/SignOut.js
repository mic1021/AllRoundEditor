import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../slices/EquationSlice';

export default function SignOut() {
  const dispatch = useDispatch(LOGIN);
  const handleClick = (event) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch(LOGIN());
  }
  useEffect(() => {
    const logout = () => {
      localStorage.removeItem('FBIdToken');
      delete axios.defaults.headers.common['Authorization'];
    }
    window.addEventListener('unload', logout);
    return () => {
      window.removeEventListener('unload', logout);
    }
  }, []);
  
  return (
    <Button onClick={handleClick}>Sign Out</Button> 
  )
}
  