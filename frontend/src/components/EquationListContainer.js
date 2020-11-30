import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SaveIcon from '@material-ui/icons/Save';
import EquationList from './textAreaComponents/EquationList';
import imgA from '../logo.png';
// import { BottomNav, blah, blah } from '@material-ui/core/'; ==> problem because its going to import the whole core pkg rather than necessary ones

export default function EquationListContainer(props) {
    return (
        <>
            <center>
                <img src = {imgA} style={{alignSelf:"center",}} alt=""/>
            </center>
            <EquationList></EquationList>
            {/* <BottomNavigation // SAVE BUTTON!!!
                value={"dingdong"}
                onChange={() => {
                    //Save Checked Bois into Backend - 
                    console.log("eh");
                }}
            >
                <BottomNavigationAction label="heh" value="yey" icon={<SaveIcon />}></BottomNavigationAction>
            </BottomNavigation> */}
        </>
    )
}