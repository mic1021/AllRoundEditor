import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CheckBox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { StaticMathField } from 'react-mathquill';
import {
  TOGGLE,
  EDIT,
  DELETE,
  selectChecked,
} from '../../slices/EquationSlice';
import { useDispatch, useSelector } from 'react-redux';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  overrides: {
    MenuItem: {
      root: {
        width: 'fit-content',
      },
    },
  },
});

function EquationListRow(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const checked = useSelector(selectChecked);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    if (e.target.textContent === 'EDIT') {
      dispatch(EDIT(props.index));
    }
    if (e.target.textContent === 'DELETE') {
      dispatch(DELETE(props.index));
    }
  };

  const toggleChecked = (e) => {
    dispatch(TOGGLE(props.index));
  };

  return (
    <ListItem
      key={props.index}
      role={undefined}
      dense
      button
      onClick={toggleChecked}
    >
      <ListItemIcon>
        <CheckBox
          edge='start'
          checked={
            checked[props.index] === undefined ? false : checked[props.index]
          }
          tabIndex='-1'
          disableRipple
        ></CheckBox>
      </ListItemIcon>
      <StaticMathField>{props.equation}</StaticMathField>
      <ListItemSecondaryAction>
        <IconButton aria-haspopup='true' onClick={handleClick}>
          <ArrowDropDown />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          keepMounted
          onClose={handleClose}
          style={{
            width: 150,
          }}
        >
          <ThemeProvider theme={theme}>
            <MenuItem onClick={handleClose}>EDIT</MenuItem>
            <MenuItem onClick={handleClose}>DELETE</MenuItem>
          </ThemeProvider>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default EquationListRow;