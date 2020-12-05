import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import jwtDecode from 'jwt-decode';
import { selectLoggedIn, SEND } from '../slices/EquationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SavedEquations from './headerComponents/SavedEquations';
import SaveEquations from './headerComponents/SaveEquations';

import SignOut from './headerComponents/SignOut';
import SignIn from './headerComponents/SignIn';

export default function Header() {
    const [authenticated, setAuthenticated] = useState(false);
    const loggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        const isExpired = (token) => token.exp * 1000 < Date.now()
        if (loggedIn === true) {
            const token = localStorage.getItem('FBIdToken');

            if(token) {
                const decodedToken = jwtDecode(token);
                if (isExpired(decodedToken)) {
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
                <div style={{padding:'0 10px 0 0', lineHeight:'20px', fontSize: '10px'}}>
                    <Button variant="outlined" size ='small'>
                        <SavedEquations></SavedEquations>
                    </Button>
                </div>
                <div style={{padding:'0 10px 0 0', lineHeight:'20px', fontSize: '30px'}}>
                    <Button onClick={handleClick} variant="outlined" size ='large'>Submit</Button>
                </div>
                <div style={{padding:'0 10px 0 0', lineHeight:'20px'}}>
                    <SaveEquations></SaveEquations>
                </div>
                {/*<center>
                    <img src = {imgA} style={{alignSelf:"center",}} alt=""/>
                </center>*/}
                <div style={{textAlign:"right", width:"70%", lineHeight:'20px'}}>
                    <Button variant="outlined" size ='small'>
                        {authenticated ? <SignOut /> : <SignIn />}
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}