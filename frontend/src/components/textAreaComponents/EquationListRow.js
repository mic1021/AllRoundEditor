import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CheckBox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

export default class EquationListRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick = (e) => {
        console.log(e);
        this.setState({
            anchorEl: e.currentTarget
        });
    }

    handleClose = (e) => {
        this.setState({
            anchorEl: null
        });
        this.props.changeMode(e);
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
                        checked={this.props.equation.checked}
                        tabIndex="-1"
                        disableRipple
                    >
                    </CheckBox>
                </ListItemIcon>
                <ListItemText
                    id={equation.id}
                    primary={equation.equation}
                >
                </ListItemText>
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