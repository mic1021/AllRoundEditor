import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { addStyles, StaticMathField } from 'react-mathquill';
import { useDispatch } from 'react-redux';
import { TYPE } from '../../slices/EquationSlice';
import { makeStyles } from '@material-ui/core';

addStyles();
// function useLoadAndCategorizeEquations() {
//     const [categorizedEquations, setCategorizedEquations] = useState();
//     useEffect(() => {
//         axios.get(`${process.env.REACT_APP_API}/savedEquations`)
//             .then(res => {
//                 const categorizingEquation = res.data.reduce((acc, value) => {
//                     if(!acc[value.category]) {
//                         acc[value.category] = [];
//                     }
//                     acc[value.category].push(value.equation);
//                     return acc;
//                 }, {})
//                 setCategorizedEquations(categorizingEquation);
//             })
//             .catch(err => {
//                 console.error(err);
//             });
//     }, [])

//     return categorizedEquations;
// }

const useStyles = makeStyles(() => ({
    paper: {
      width: '500px',
      height: 400,
      padding: 0,
    },
    title: {
      padding: '0 30',
      width: '100%',
    },
  }));


export default function SavedEquationDailog(props) {
    // const categorizedEquations = useLoadAndCategorizeEquations();
    const [equations, setEquations] = useState([]);
    const classes = useStyles(); ////////추가한거
    // const [open, setOpen] = useState([]);
    // const [list, setList] = useState();
    // const DEFAULT_CATEGORY_VALUE = 'DEFAULT_CATEGORY_VALUE'
    const dispatch = useDispatch();
    useEffect(() => {
        let listA = [];
        axios.get(`${process.env.REACT_APP_API}/savedEquations`)
            .then(res => {
                res.data.forEach(item => {
                    listA.push(item);
                })
                setEquations(listA);
            })
            .catch(err => {
                console.error(err);
            });
    })
    // useEffect(() => {
    //     let tempOpen = [];
    //     for(var key in categorizedEquations) {
    //         if (key !== DEFAULT_CATEGORY_VALUE) tempOpen.push(false);
    //     }
    //     setOpen(tempOpen);
    // }, [categorizedEquations])

    // useEffect(() => {
    //     let list=[];
    //     const handleClick = (index) => (event) => {
    //         setOpen([...open.slice(0, index), !open[index], open.slice(index)]);
    //     }
    //     let indexValue = 0;
        
    //     for(const [key, value] of Object.entries(categorizedEquations)) {
    //         console.log("EY");
    //         if(key === DEFAULT_CATEGORY_VALUE) {
    //             list.push(
    //                 <>
    //                     {value.map((item, index) => {
    //                         return(
    //                             <ListItem key={index} button>
    //                                 <StaticMathField>{item}</StaticMathField>
    //                             </ListItem>
    //                         )
    //                     })}
    //                 </>
    //             )
    //         } else {
    //             list.push(
    //                 <>
    //                     <ListItem button onClick={handleClick(indexValue)}>
    //                         {key}
    //                     </ListItem>
    //                     <Collapse in={open[indexValue]} timeout="auto" unmountOnExit>
    //                         <List component="div" disablePadding>
    //                             {value.map((item, index) => {
    //                                 return (
    //                                     <ListItem key={index} button>
    //                                             <StaticMathField>{item}</StaticMathField>
    //                                     </ListItem>
    //                                 )
    //                             })}
    //                         </List>
    //                     </Collapse>
    //                 </>
    //             )
    //             indexValue = indexValue + 1;
    //         }
    //     }
    //     setList(list);
    // }, [open, categorizedEquations]);
    const handleClick = (index) => (event) => {
        dispatch(TYPE(equations[index].equation));
    }
    return (
        <Dialog onClose={props.handleClose} open={props.open} fullwidth>
            <DialogTitle >Saved Equations</DialogTitle>
            <DialogContent dividers={true} className={classes.paper}>
                
                    {equations.map((item, index) => {
                        return(
                            <ListItem key={index} button onClick={handleClick(index)}>
                                <StaticMathField>{item.equation}</StaticMathField>
                            </ListItem>
                        )
                    })}
                
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}