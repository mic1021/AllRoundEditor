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

export default class EquationListRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    dispatch = useDispatch();

    handleClick = (e) => {
        this.setState({
            anchorEl: e.currentTarget
        });
    }

    handleClose = (e) => {
        this.setState({
            anchorEl: null
        });
        //if(e.target.value === 'EDIT') this.dispatch(EDIT(Number(this.props.key)));
        //if(e.target.value === 'DELETE') this.dispatch(DELETE());
    }

    render() {
        const equation = this.props.equation;
        
        return (
            <ListItem
                key={this.props.key}
                role={undefined}
                dense
                button
                onClick={this.props.toggleChecked}
            >
                <ListItemIcon>
                    <CheckBox
                        edge="start"
                        checked={equation.checked}
                        tabIndex="-1"
                        disableRipple
                    >
                    </CheckBox>
                </ListItemIcon>
                <StaticMathField>{equation.equation}</StaticMathField>
                <ListItemSecondaryAction>
                    <IconButton
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <ArrowDropDown></ArrowDropDown>
                    </IconButton>
                    <Menu
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        keepMounted
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>Edit</MenuItem>
                        <MenuItem onClick={this.handleClose}>Delete</MenuItem>
                    </Menu>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
};