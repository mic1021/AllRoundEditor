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
            <Button onClick={handleClick} variant="outlined" style={{borderStyle: 'solid', width: '90.328px', backgroundColor: '#3f51b5', padding: '0px', color: 'white', fontSize:'0.745rem'}}>Saved Equations</Button>
            {open && <SavedEquationDailog open={open} handleClose={handleClose}/>}
        </>
    )
}