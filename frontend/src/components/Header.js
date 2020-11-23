import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import { selectLoggedIn } from '../slices/EquationSlice';
import { useSelector } from 'react-redux';
// import imgA from '../../public/logo.png';

// import {useAuthState} from 'react-firebase-hooks/auth';

import SignOut from './headerComponents/SignOut';
import SignIn from './headerComponents/SignIn';

export default function Header() {
    const [token, setToken] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const loggedIn = useSelector(selectLoggedIn);

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
    return (
        <AppBar position="sticky">
            <Toolbar>
                {/* <center><img src = {imgA} style={{alignSelf:"center",}} alt=""/></center> */}
                {loggedIn ? <SignOut /> : <SignIn />}
            </Toolbar>
        </AppBar>
    )
}