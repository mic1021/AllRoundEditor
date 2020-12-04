import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import { StaticMathField } from 'react-mathquill';

export default function SavedEquations(props) {
    const [checked, setChecked] = useState([0])
    const [open, setOpen] = useState(false)
    const [equations, setEquations] = useState([]);
    const handleClick = (event) => {
        setOpen(true);
        let listA = [];
        axios.get(`${process.env.REACT_APP_API}/savedEquations`)
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

    const handleSelect = (event) => {
        setOpen(false);
    }

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