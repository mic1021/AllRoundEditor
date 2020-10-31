import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import EquationListRow from './textAreaComponents/EquationListRow';
import store from '../store';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));
  
export default class EquationList extends React.Component { 
    state = {
        equations: store.getState().equations
    }
    constructor(props) {
        super(props);
        store.subscribe(function() {
            this.setState({
                equations: store.getState().equations
            })
        }.bind(this));
        this.toggleChecked = this.toggleChecked.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }
    
    toggleChecked = (id, checked) => () => {
        id--;
        if (checked === false) {
            this.setState(({equations}) => ({
                equations: [
                    ...equations.slice(0, id),
                    {
                        ...equations[id],
                        checked: true
                    },
                    ...equations.slice(id + 1)
                ]
            }));
        }
        else {
            this.setState(({equations}) => ({
                equations: [
                    ...equations.slice(0, id),
                    {
                        ...equations[id],
                        checked: false
                    },
                    ...equations.slice(id + 1)
                ]
            }));
        }
    }

    changeMode = (e) => {
        console.log(e);
        console.log("before: " + this.state.mode);
        this.setState({
            mode: e.target.value
        });
        console.log("after: " + this.state.mode);
    }

    render() {
        const rows = []; 
        this.state.equations.forEach((equation) => {
            rows.push(
                <EquationListRow
                    equation={equation}
                    toggleChecked={this.toggleChecked(equation.id, equation.checked)}
                    changeMode={this.changeMode}
                    key={equation.id}
                ></EquationListRow>
            );
        })
        return (
            <List>
                {rows}
            </List>
        )
    }
}