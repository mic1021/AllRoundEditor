import React from 'react';
import List from '@material-ui/core/List';
import EquationListRow from './EquationListRow';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {selectEquation} from '../../slices/EquationSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function EquationList(props) {
    const equations = useSelector(selectEquation)

    const rows = [];
    equations.forEach((equation, index) => {
        props.pushFalse();
        rows.push(
            <EquationListRow
                equation={[equation, props.checked[index]]}
                toggleChecked={props.toggleChecked(index)}
                key={index}
            ></EquationListRow>
        );
    })
    
    return (
        <List>
            {rows}
        </List>
    )
}

export default EquationList;