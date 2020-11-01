import React from 'react';
import List from '@material-ui/core/List';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SaveIcon from '@material-ui/icons/Save';
import EquationListRow from './textAreaComponents/EquationListRow';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import {selectEquation} from '../slices/EquationSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));
  
export default class EquationList extends React.Component { 
    equations = useSelector(selectEquation)

    constructor(props) {
        super(props);
        this.state = {
            checked: []
        }
        this.toggleChecked = this.toggleChecked.bind(this);
        this.equations = this.equations.bind(this);
    }
    
    toggleChecked = (index) => () => {
        if (this.checked[index] === false) {
            this.setState({
                checked: [
                    ...checked.slice(index, 1, true)
                ]
            })
        } else {
            this.setState({
                checked: [
                    ...checked.slice(index, 1, false)
                ]
            })
        }
    }

    render() {
        const rows = []; 
        this.state.equations.forEach((equation, index) => {
            this.checked.push(false);
            rows.push(
                <EquationListRow
                    equation={{equation: equation, checked: checked[index]}}
                    toggleChecked={this.toggleChecked(index)}
                    key={index}
                ></EquationListRow>
            );
        })
        return (
            <div>
                <List>
                    {rows}
                </List>
                <BottomNavigation
                    value={"dingdong"}
                    onChange={() => {
                        //Save Checked Bois into Backend - 
                        console.log("eh");
                    }}
                >
                    <BottomNavigationAction label="heh" value="yey" icon={<SaveIcon />}></BottomNavigationAction>
                </BottomNavigation>
            </div>            
        )
    }
}