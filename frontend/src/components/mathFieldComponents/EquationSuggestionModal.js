import React, { useEffect, useRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import latexEquations from '../../equations/Equations';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import { selectLatex,toggleDialogue,selectCursor,TYPE} from '../../slices/EquationSlice';
import { addStyles, StaticMathField } from 'react-mathquill';

addStyles();

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        position: 'absolute',
        overflow: 'auto',
        height: 300,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(0, 0, 0),
    },
    textField: {
        padding: "0 30px 0 30px",
    },
}));

let modifiedLatex="";

export default function EquationSuggestionModal(props){
    const classes = useStyles();
    const dispatch = useDispatch();
    const [rows, setRows] = React.useState([]);
    const [modalStyle] = React.useState(getModalStyle);
    const [search, setSearch] = React.useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [maxIndex, setMaxIndex] = React.useState(0);
    const textFieldRef = useRef();
    const listRef = useRef();
    const equationFieldRef = useRef();
    const latex = useSelector(selectLatex);
    const cur = useSelector(selectCursor);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    const moveScrollDown = (index) => {
        let equationButtonList = equationFieldRef.current.getElementsByClassName("MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button");
        let sumHeight=0;
        for(let i=0;i<=index;++i){
            sumHeight += equationButtonList[i].clientHeight;
        }
        let currentPosition = sumHeight - equationFieldRef.current.scrollTop;
        if(currentPosition > equationFieldRef.current.clientHeight){
            equationFieldRef.current.scrollTop += equationButtonList[index].clientHeight;
        }
    }

    const moveScrollUp = (index) => {
        let equationButtonList = equationFieldRef.current.getElementsByClassName("MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button");
        let sumHeight=0;
        for(let i=0;i<=index;++i){
            sumHeight += equationButtonList[i].clientHeight;
        }
        let currentPosition = sumHeight - equationFieldRef.current.scrollTop;
        if(currentPosition < 0){
            equationFieldRef.current.scrollTop -= equationButtonList[index].clientHeight;
        }
    }

    const handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            if (selectedIndex>=0 && selectedIndex <= maxIndex) {
                let i=0;
                let selectedText = rows[selectedIndex].props.children[0];
                for(;i<latexEquations.length;++i){
                    if(latexEquations[i].text.localeCompare(selectedText)==0){
                        dispatch(toggleDialogue(latexEquations[i].equation));
                        modifiedLatex = latex.substr(0,cur)+latexEquations[i].equation+latex.substr(cur);
                        break;
                    }
                }
                if(i==latexEquations.length){
                    console.log("Not Reached!");
                    dispatch(toggleDialogue(''));
                }
            }
            else{
                dispatch(toggleDialogue(''));
            }
        } else if (event.keyCode === 38) { // ArrowUp
            if (selectedIndex > 0) {
                setSelectedIndex(selectedIndex - 1);
                moveScrollUp(selectedIndex-1);
            }
        } else if (event.keyCode === 40) { // ArrowDown
            if (selectedIndex < maxIndex) {
                setSelectedIndex(selectedIndex + 1);
                moveScrollDown(selectedIndex+1);
            }
            else setSelectedIndex(maxIndex + 1);
        }
    }

    const handleClose = (event) => {
        dispatch(toggleDialogue(''));
    }

    useEffect(() => {
        let max = -1;
        let equations = [];
        latexEquations.map((data, index) => {
            if (data.text.indexOf(search) > -1) {
                max+=1;
                equations.push(
                    <ListItem key={index} selected={selectedIndex === max}>
                        {data.text}
                    </ListItem>
                );
            }
        })
        setRows(equations);
        setMaxIndex(max);
        if (selectedIndex > max) {
            setSelectedIndex(max);
        }
    }, [search, selectedIndex])

    return(
        <Dialog
            open={true}
            onClose={handleClose}
            disableAutoFocus={true}
            maxWidth={'sm'}
            fullWidth
        >
            <TextField 
                value={search}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus
                className={classes.textField}
                inputProps={{style: {fontSize: 30}}}
                InputLabelProps={{style: {fontSize: 30, padding: 30}}}
            />
            <DialogContent ref={equationFieldRef}>
                <Box height={300} width="100%">
                    <List>
                        {rows}
                    </List>
                </Box>
            </DialogContent>
        </Dialog>
    )
}