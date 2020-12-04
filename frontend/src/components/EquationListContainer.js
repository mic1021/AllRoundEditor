import React from 'react';
import EquationList from './textAreaComponents/EquationList';
import imgA from '../logo.png';
import FavEquations from './textAreaComponents/FavEquations';

export default function EquationListContainer(props) {
    return (
        <>
            <center>
                <img src = {imgA} style={{alignSelf:"center",}} alt=""/>
            </center>
            <EquationList></EquationList>
            <FavEquations></FavEquations>
        </>
    )
}