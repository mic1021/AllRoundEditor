import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectChecked, selectEquation } from '../../slices/EquationSlice';
import { Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemSecondaryAction, TextField } from '@material-ui/core';
import { StaticMathField } from 'react-mathquill';

export default function SaveEquations(props) {
    const [openError, setOpenError] = useState(false);
    const [open, setOpen] = useState(false);
    // const [order, setOrder] = useState([]);
    const checked = useSelector(selectChecked);
    const equations = useSelector(selectEquation);
    const [categories, setCategories] = useState([]);
    let rows = [];
    // async function processArray(array) {
    //     array.forEach(item => {
    //         await (() => {

    //         })
    //     })
    // }
    const handleChange = (index) => (event) => {
        let newValue = event.target.value;
        setCategories([...categories, categories.splice(index, 1, newValue)]);
    }
    const handleClick = (event) => {
        console.log(checked);
        if (checked.length < 1) {
            setOpenError(true)
        } else {
            checked.forEach((item, index) => {
                // let newOrder = [...order];
                // newOrder.push(false);
                // setOrder(newOrder);
                let newCategories = [...categories];
                newCategories.push('');
                setCategories(newCategories);
                if (item === true) {
                    rows.push(
                        <ListItem>
                            <StaticMathField>{props.equation}</StaticMathField>
                            <ListItemSecondaryAction>
                                <TextField
                                    value={categories[index]}
                                    onChange={handleChange(index)}
                                ></TextField>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                    // <Categorize order={} equation={equations[index]}></Categorize>
                }
            });
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
        checked.forEach((item, index) => {
            if(item === true) {
                let newEntry = {
                    category: categories[index],
                    equation: equations[index],
                }
                axios.post('http://localhost:5001/allroundeditor-dcc51/asia-northeast3/api/saveEquations', newEntry)
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        })
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