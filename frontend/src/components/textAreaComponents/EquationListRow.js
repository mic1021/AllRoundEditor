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
import { EDIT, DELETE } from '../../slices/EquationSlice';
import { useDispatch } from 'react-redux';

function EquationListRow(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const dispatch = useDispatch();

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = (e) => {
        setAnchorEl(null);
        //if(e.target.value === 'EDIT') this.dispatch(EDIT(Number(this.props.key)));
        //if(e.target.value === 'DELETE') this.dispatch(DELETE());
    }
     
    return (
        <ListItem
            key={props.key}
            role={undefined}
            dense
            button
            onClick={props.toggleChecked}
        >
            <ListItemIcon>
                <CheckBox
                    edge="start"
                    checked={props.checked}
                    tabIndex="-1"
                    disableRipple
                >
                </CheckBox>
            </ListItemIcon>
            <StaticMathField>{props.equation}</StaticMathField>
            <ListItemSecondaryAction>
                <IconButton
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <ArrowDropDown></ArrowDropDown>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    keepMounted
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
            </ListItemSecondaryAction>
        </ListItem>
    )
};

export default EquationListRow;