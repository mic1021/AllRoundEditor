import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SavedEquationDailog from './SavedEquationDialog';

export default function SavedEquations(props) {
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setOpen(true);
    }
    const handleClose = (event) => {
        setOpen(false);
    }

    return (
        <>
            <Button onClick={handleClick}>Saved Equations</Button>
            {open && <SavedEquationDailog open={open} handleClose={handleClose}/>}
        </>
    )
}