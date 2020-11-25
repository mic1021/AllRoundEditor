import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import { selectLoggedIn, SEND } from '../slices/EquationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SavedEquations from './headerComponents/SavedEquations';
import SaveEquations from './headerComponents/SaveEquations';
// import imgA from '../../public/logo.png';

// import {useAuthState} from 'react-firebase-hooks/auth';

import SignOut from './headerComponents/SignOut';
import SignIn from './headerComponents/SignIn';

export default function Header() {
    const [token, setToken] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const loggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();
    let history = useHistory();

    const isExpired = (token) => token.exp * 1000 < Date.now()

    useEffect(() => {
            if (loggedIn === true) {
                const token = localStorage.getItem('FBIdToken');
                const decodedToken = jwtDecode(token);
                console.log(token);
                setToken(token);

                if(token) {
                    if (decodedToken.exp * 1000 < Date.now()) {
                        setAuthenticated(false);
                    } else setAuthenticated(true);
                } else setAuthenticated(false);
            }
    }, [loggedIn]);

    const handleClick = (event) => {
        dispatch(SEND());
        history.push("/");
    }

    return (
        <AppBar position="sticky">
            <Toolbar>
                {loggedIn ? <SignOut /> : <SignIn />}
                <SavedEquations></SavedEquations>
                <SaveEquations></SaveEquations>
                <Button onClick={handleClick}>Submit</Button>
                {/* <center><img src = {imgA} style={{alignSelf:"center",}} alt=""/></center> */}
            </Toolbar>
        </AppBar>
    )
}