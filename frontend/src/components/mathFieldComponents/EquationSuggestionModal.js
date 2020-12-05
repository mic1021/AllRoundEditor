import React, { useEffect, useRef } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ListItem from '@material-ui/core/ListItem';
import latexEquations from '../../equations/Equations';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { toggleDialogue } from '../../slices/EquationSlice';
import { addStyles, StaticMathField } from 'react-mathquill';

addStyles();

const useStyles = makeStyles(() => ({
  paper: {
    width: '100%',
    height: 700,
    padding: 0,
  },
  textField: {
    padding: '0 30',
    width: '100%',
  },
}));

const allEquations = [];
for (let equationArray of latexEquations) {
  allEquations.push.apply(allEquations, equationArray);
}

export default function EquationSuggestionModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [maxIndex, setMaxIndex] = React.useState(0);
  const equationFieldRef = useRef();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const moveScrollDown = (index) => {
    let equationButtonList = equationFieldRef.current.getElementsByClassName(
      'MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button'
    );
    let sumHeight = 0;
    for (let i = 0; i <= index; ++i) {
      sumHeight += equationButtonList[i].clientHeight;
    }
    let currentPosition = sumHeight - equationFieldRef.current.scrollTop;
    if (currentPosition > equationFieldRef.current.clientHeight) {
      equationFieldRef.current.scrollTop +=
        equationButtonList[index].clientHeight;
    }
  };

  const moveScrollUp = (index) => {
    let equationButtonList = equationFieldRef.current.getElementsByClassName(
      'MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button'
    );
    let sumHeight = 0;
    for (let i = 0; i <= index; ++i) {
      sumHeight += equationButtonList[i].clientHeight;
    }
    let currentPosition = sumHeight - equationFieldRef.current.scrollTop;
    if (currentPosition < 0) {
      equationFieldRef.current.scrollTop -=
        equationButtonList[index].clientHeight;
    }
    if (index == 0) {
      equationFieldRef.current.scrollTop = 0;
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      if (selectedIndex >= 0 && selectedIndex <= maxIndex) {
        let i = 0;
        let selectedText = rows[selectedIndex].props.children[0].props.children;
        for (; i < allEquations.length; ++i) {
          if (allEquations[i].text.localeCompare(selectedText) === 0) {
            dispatch(toggleDialogue(allEquations[i].equation));
            break;
          }
        }
        if (i === allEquations.length) {
          console.log('Not Reached!');
          dispatch(toggleDialogue(''));
        }
      } else {
        dispatch(toggleDialogue(''));
      }
    } else if (event.keyCode === 38) {
      // ArrowUp
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
        moveScrollUp(selectedIndex - 1);
      }
    } else if (event.keyCode === 40) {
      // ArrowDown
      if (selectedIndex < maxIndex) {
        setSelectedIndex(selectedIndex + 1);
        moveScrollDown(selectedIndex + 1);
      } else setSelectedIndex(maxIndex + 1);
    }
  };

  const handleClose = () => {
    dispatch(toggleDialogue(''));
  };

  const selectEquationOnClick = (index) => () => {
    dispatch(toggleDialogue(allEquations[index].equation));
  };

  useEffect(() => {
    let max = -1;
    let equations = [];
    allEquations.map((data, index) => {
      if (data.text.indexOf(search) > -1) {
        max += 1;
        equations.push(
          <ListItem
            button
            key={index}
            selected={selectedIndex === max}
            onClick={selectEquationOnClick(index)}
          >
            <span
              style={{
                height: '100%',
                width: '90%',
                verticalAlign: 'middle',
                textAlign: 'left',
              }}
            >
              {data.text}
            </span>
            <span
              style={{
                height: '100%',
                width: '10%',
                paddingLeft: '10%',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
            >
              <StaticMathField
                style={{
                  fontSize: `${Number(data.fontSize.slice(0, -1)) / 2}%`,
                }}
              >
                {data.equation}
              </StaticMathField>
            </span>
          </ListItem>
        );
      }
      return data;
    });
    setRows(equations);
    setMaxIndex(max);
    if (selectedIndex > max) {
      setSelectedIndex(max);
    }
  }, [search, selectedIndex]);

  return (
    <Dialog open={true} onClose={handleClose} disableAutoFocus={true} fullWidth>
      <TextField
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        className={classes.textField}
        inputProps={{ style: { fontSize: 30 } }}
        InputLabelProps={{ style: { fontSize: 30, padding: 30 } }}
      />
      <DialogContent ref={equationFieldRef} className={classes.paper}>
        {rows}
      </DialogContent>
    </Dialog>
  );
}
