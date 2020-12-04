import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { selectSubmitted } from '../slices/EquationSlice';
import { useSelector } from 'react-redux'
import {StaticMathField} from 'react-mathquill';

export default function Demo() {
    const result = useSelector(selectSubmitted);
    let rows = [];
    useEffect (() => {
    
    }, [result])

    result.forEach(element => {
        rows.push(<StaticMathField>{element}</StaticMathField>)
    });

    const handleClick = () => {
        // let content = editorState.getCurrentContent();
        // console.log(convertToRaw(content).blocks[0].text);
    }

    return (
        <>
            {rows}
            <Button variant="contained" color="primary" component={Link} to="AllRoundEditor">AllRoundEditor</Button>
            <Button variant="contained" color="primary" onClick={handleClick}>Check</Button>
        </>
    )
}