import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SaveIcon from '@material-ui/icons/Save';
import EquationList from './textAreaComponents/EquationList';

export default class EquationListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: []
        }    
        this.toggleChecked = this.toggleChecked.bind(this);
        this.pushFalse = this.pushFalse.bind(this);
    }

    toggleChecked = (index) => (event) => {
        if (this.state.checked[index] === false) {
            this.setState({
                checked: [
                    ...this.state.checked.slice(index, 1, true)
                ]
            })
        } else {
            this.setState({
                checked: [
                    ...this.state.checked.slice(index, 1, false)
                ]
            })
        }
        console.log(index);
        console.log(this.state.checked);
    }

    pushFalse = () => {
        this.setState(state => {
            state.checked.push(false);
        })
    }

    render() {
        return (
            <div>
                <EquationList 
                    toggleChecked={this.toggleChecked}
                    pushFalse={this.pushFalse}
                    checked={this.state.checked}
                > </EquationList>
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