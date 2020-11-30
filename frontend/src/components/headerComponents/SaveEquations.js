import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectChecked, selectEquation } from '../../slices/EquationSlice';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, ListItem, ListItemSecondaryAction, TextField, Typography } from '@material-ui/core';
import { StaticMathField } from 'react-mathquill';
import EquationToSave from './EquationToSave';

export default function SaveEquations(props) {
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState([]);
    // const [order, setOrder] = useState([]);
    const checked = useSelector(selectChecked);
    const equations = useSelector(selectEquation);
    const [categories, setCategories] = useState([]);
    const [rows, setRows] = useState([]);
    // async function processArray(array) {
    //     array.forEach(item => {
    //         await (() => {

    //         })
    //     })
    // }
    const categorySet = (index, value) => {
        setCategories([...categories.splice(index, 1, value)])
        console.log(index, categories);
    }

    const handleClick = (event) => {
        console.log('checked', checked);
        if (checked.length < 1) {
            setOpenError(true)
        } else {
            let tempRow = [];
            setCategories([]);
            setDisabled([]);
            let newCategories = [];
            let categoryIndex = 0;
            checked.forEach((item, index) => {
                // let newOrder = [...order];
                // newOrder.push(false);
                // setOrder(newOrder);
                newCategories.push('');
                console.log('nc', newCategories);
                // console.log(categories);
                if (item === true) {
                    tempRow.push(
                        //index equation category and changeCategory
                        <EquationToSave
                            index={categoryIndex}
                            equation={equations[index]}
                            category={categories[categoryIndex]}
                            categorySet={categorySet}
                        />
                    )
                    categoryIndex = categoryIndex + 1;
                    // <Categorize order={} equation={equations[index]}></Categorize>
                }
            });
            setRows(tempRow);
            setCategories(newCategories);
            // save checked equations
            // init checked
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
                axios.post('http://localhost:5001/allroundeditor-261bc/asia-northeast3/api/saveEquations', newEntry)
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
        <div>
            <h2>Error!</h2>
            <p>Please select equations you want to save before clicking save</p>
        </div>
    )
    return (
        <>
            <Button 
                variant="contained"
                color="primary"
                startIcon={<SaveIcon/>}
                onClick={handleClick}
            />
            <Modal
                open={openError}
                onClose={handleCloseError}
            >
                {errorMessage}
            </Modal>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Categorize Equations</DialogTitle>
                <DialogContent dividers={true}>
                    <List>
                        {rows}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}