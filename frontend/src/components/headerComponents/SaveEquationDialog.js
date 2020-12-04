import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectEquation } from '../../slices/EquationSlice';
import EquationToSave from './EquationToSave';

function useGetCheckedEquations(checkArray) {
    const equations = useSelector(selectEquation);
    const [checkedEquations, setCheckedEquations] = useState([]);
    const [initCategories, setInitCategories] = useState([]);
    useEffect(() => {
        let tempEquationArray = [], tempStringArray = [];
        checkArray.forEach((elem, index) => {
            if (elem) {
                tempEquationArray.push(equations[index]);
                tempStringArray.push('');
            }
        });
        setCheckedEquations(tempEquationArray);
        setInitCategories(tempStringArray);
    }, [checkArray, equations]);

    return [initCategories, checkedEquations];
}

export default function SaveEquationDialog(props) {
    const [initCategories, equations] = useGetCheckedEquations(props.checked);
    // console.log('inintCategories', initCategories);
    // const tempArr = [...initCategories]
    // const [categories, setCategories] = useState(initCategories); // DOES NOT WORK | I'M GUESSING BECAUSE OF DIFFERENT STAGES IN LIFECYCLE
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        setCategories([...initCategories])
    }, [initCategories]);

    const handleSet = (index) => (value) => {
        setCategories([...categories.slice(0, index), value, ...categories.slice(index + 1)]);
    }
    const handleSave = (event) => {
        equations.forEach((item, index) => {
            const newEntry = {
                category: categories[index],
                equation: item
            }
            axios.post(`${process.env.REACT_APP_API}/saveEquations`, newEntry)
                .then(res => console.log(res))
                .catch(err => console.error(err));
        })
        props.handleClose();
    }
    const testing = (event) => {
        console.log(categories);
    }
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>Categorize Equations</DialogTitle>
            <DialogContent dividers={true}>
                <List>
                    {equations.map((item, index) => {
                        return(
                            <EquationToSave handleSet={handleSet(index)} key={index} index={index} equation={item} />
                        )
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
                <Button onClick={testing} />
            </DialogActions>
        </Dialog>
    )
}