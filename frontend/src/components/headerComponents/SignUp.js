import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { LOGIN } from '../../slices/EquationSlice';
import { useDispatch } from 'react-redux';

const config = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
}

export default function SignUp(props) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [handle, setHandle] = useState('');
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(props.UI);
        setError({errors: props.UI})
    }, [props.UI]);

    const handleClick = (event) => {
        setOpen(true);
    }
    const handleClose = (event) => {
        setOpen(false);
    }
    const handleChange = (event) => {
        if(event.target.name==='email') setEmail(event.target.value);
        else if(event.target.name==='password') setPassword(event.target.value);
        else if(event.target.name==='confirmPassword') setConfirmPassword(event.target.value);
        else if(event.target.name==='handle') setHandle(event.target.value);
    }
    const handleSubmit = (event) => {
        console.log(email, password, confirmPassword, handle);
        const userData = {
            email,
            password,
            confirmPassword,
            handle
        }
        axios.post('http://localhost:5001/allroundeditor-261bc/asia-northeast3/api/signup', userData)
            .then(res=>{
                console.log(res.data);
                const FBIdToken = `Bearer ${res.data.token}`;
                localStorage.setItem('FBIdToken', FBIdToken);
                axios.defaults.headers.common['Authorization'] = FBIdToken;
                dispatch(LOGIN());
            })
            .catch(err => {
                setError(err.response.data);
            });
        setOpen(false);
    }
    return (
        <>
            <Button type="submit" variant="contained" color="primary" onClick={handleClick}> Sign Up </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>SignUp</DialogTitle>
                <TextField 
                    id="email" 
                    name="email" 
                    type="email" 
                    label="Email"
                    value={email}
                    helperText={error.email}
                    error={error.email ? true : false}
                    onChange={handleChange}
                    fullWidth/>
                <TextField 
                    id="password" 
                    name="password" 
                    type="password" 
                    label="Password"
                    value={password}
                    helperText={error.password}
                    error={error.password ? true : false}
                    onChange={handleChange}
                    fullWidth/>
                <TextField 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    label="Confirm Password"
                    value={confirmPassword}
                    helperText={error.confirmPassword}
                    error={error.confirmPassword ? true : false}
                    onChange={handleChange}
                    fullWidth/>
                <TextField 
                    id="handle" 
                    name="handle" 
                    type="text" 
                    label="Nickname"
                    value={handle}
                    helperText={error.handle}
                    error={error.handle ? true : false}
                    onChange={handleChange}
                    fullWidth/>
                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>Sign Up</Button>
            </Dialog>
        </>
    )
}