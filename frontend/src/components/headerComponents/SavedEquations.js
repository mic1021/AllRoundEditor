import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent, DialogTitle, List } from '@material-ui/core';

export default function SavedEquations(props) {
    const [checked, setChecked] = useState([0])
    const [open, setOpen] = useState(false)
    const handleClick = (event) => {
        setOpen(true);
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

    let equations;
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