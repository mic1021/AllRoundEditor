import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SignUp from './SignUp';
import { LOGIN } from '../../slices/EquationSlice';
import { useDispatch } from 'react-redux';

export default function SignIn() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  
  useEffect(() => {
  })
  const handleClick = () => {
    setOpen(true);
    
  }
  const handleClose = (event) => {
    setOpen(false);
  }
  const handleChange = (event) => {
    if(event.target.name==='email') setEmail(event.target.value);
    else if(event.target.name==='password') setPassword(event.target.value);
  }
  const handleSubmit = (event) => {
    const userData = {
      email,
      password
    }
    axios.post(`${process.env.REACT_APP_API}/login`, userData)
      .then(res => {
        console.log(res.data);
        const FBIdToken = `Bearer ${res.data.token}`;
        localStorage.setItem('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization'] = FBIdToken;
        dispatch(LOGIN());
      })
      .catch(err => {
        console.error(err);
      })
    setOpen(false);
  }
  return (
    <>
      <Button onClick={handleClick}>Sign In</Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Login</DialogTitle>
        <TextField 
          id="email" 
          name="email" 
          type="email" 
          label="Email"
          value={email}
          onChange={handleChange}
          fullWidth/>
        <TextField 
          id="password" 
          name="password" 
          type="password" 
          label="Password"
          value={password}
          onChange={handleChange}
          fullWidth/>  
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}> Login </Button>
        <SignUp></SignUp>
      </Dialog>
    </>
  )
}