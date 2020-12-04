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
    const handleSave = (event) => {
        console.log(categories);
        let categoryIndex = 0;
        checked.forEach((item, index) => {
            if(item === true) {
                let newEntry = {
                    category: categories[categoryIndex],
                    equation: equations[index],
                }
                categoryIndex = categoryIndex + 1;
                console.log(newEntry);
                axios.post('https://asia-northeast3-allroundeditor-261bc.cloudfunctions.net/api/saveEquations', newEntry)
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        })
        handleClose();
    }
    const errorMessage = (
        <div style={{backgroundColor:"white"}}>
            <h2>Error!</h2>
            <p>Please select equations you want to save before clicking save</p>
        </div>
    )
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