import React from 'react';
import List from '@material-ui/core/List';
import EquationListRow from './EquationListRow';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector} from 'react-redux';
import { selectEquation, INITCHECK } from '../../slices/EquationSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

function EquationList(props) {
    const equations = useSelector(selectEquation)
    const dispatch = useDispatch();
    const rows = [];

    dispatch(INITCHECK());

    equations.forEach((equation, index) => {
        console.log(equation);
        rows.push(
            <EquationListRow
                equation={equation}
                index={index}
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