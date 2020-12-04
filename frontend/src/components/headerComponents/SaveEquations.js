import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector } from 'react-redux';
import { selectChecked } from '../../slices/EquationSlice';
import NoEquationError from './NoEquationError';
import SaveEquationDialog from './SaveEquationDialog';

export default function SaveEquations(props) {
    const checked = useSelector(selectChecked);
    // let openError = false; // does not need to be a state since no need to preserve between re-render
    // let open = false; // HOWEVER, the child component is CREATED during RENDER with initial value | NEEDS TO CREATE NEW COMPONENT WITH NEW VALUE
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        if (checked.length < 1) {
            setOpenError(true);
        } else {
            setOpen(true);
        }
    }
    const handleCloseError = (event) => {
        setOpenError(false);
    }
    const handleClose = (event) => {
        setOpen(false);
    }

    return (
        <>
            <Button 
                variant="contained"
                //color=""
                startIcon={<SaveIcon/>}
                onClick={handleClick}
            />
            <NoEquationError
                open={openError}
                handleClose={handleCloseError}
            />
            {open &&
                <SaveEquationDialog
                    open={open}
                    handleClose={handleClose}
                    checked={checked}
                />
            }
        </>
    )
}