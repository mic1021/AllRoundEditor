import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { selectSubmitted } from '../slices/EquationSlice';
import { useSelector } from 'react-redux'
import {StaticMathField} from 'react-mathquill';

export default function Demo() {
    const result = useSelector(selectSubmitted);

    return (
        <>
            <List>
                {result.map((item, index) => {
                    return (
                        <ListItem key={index}>
                            <StaticMathField>{item}</StaticMathField>
                        </ListItem>
                    )
                })}
            </List>
            <Button variant="contained" color="primary" component={Link} to="AllRoundEditor">AllRoundEditor</Button>
        </>
    )
}