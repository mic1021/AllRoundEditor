import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import { DialogActions, DialogContent, DialogTitle, List } from '@material-ui/core';
import { StaticMathField } from 'react-mathquill';

export default function SavedEquations(props) {
    const [checked, setChecked] = useState([0])
    const [open, setOpen] = useState(false)
    const [equations, setEquations] = useState([]);
    const handleClick = (event) => {
        setOpen(true);
        let listA = [];
        axios.get('http://localhost:5001/allroundeditor-261bc/asia-northeast3/api/savedEquations')
            .then(res => {
                res.data.forEach(item => {
                    listA.push(
                        <ListItem>
                            <StaticMathField>{item.equation}</StaticMathField>
                        </ListItem>
                    )
                })
                setEquations(listA);
            })
            .catch(err => {
                console.error(err);
            });
    }
    const handleClose = (event) => {
        setOpen(false);
    }
    const handleTogggle = (value) => (event) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked)
    }
    const handleSelect = (event) => {
        setOpen(false);
    }

    // let equations;
    // bring saved equations
    

    return (
        <>
            <Button onClick={handleClick}>Saved Equations</Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Saved Equations</DialogTitle>
                <DialogContent dividers={true}>
                    <List>
                        {equations}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSelect} color="primary">Select</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}