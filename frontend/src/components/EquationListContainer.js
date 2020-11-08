import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SaveIcon from '@material-ui/icons/Save';
import EquationList from './textAreaComponents/EquationList';
import imgA from '../logo.png';

export default function EquationListContainer(props) {
    return (

        <div>
            <center><img src = {imgA} style={{alignSelf:"center",}}/></center>

            <EquationList></EquationList>
            <BottomNavigation
                value={"dingdong"}
                onChange={() => {
                    //Save Checked Bois into Backend - 
                    console.log("eh");
                }}
            >
                <BottomNavigationAction label="heh" value="yey" icon={<SaveIcon />}></BottomNavigationAction>
            </BottomNavigation>
        </div>
    )
}
