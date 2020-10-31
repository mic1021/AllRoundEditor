import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import BottomToolbarBox from './buttonGridComponents/BottomToolbarBox';
import EditableField from './mathFieldComponents/EditableField';
import store from '../store';

export default class TextArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latex: store.getState().latex
        }
        store.subscribe(function() {
            this.setState({
                latex: store.getState().latex
            })
        }.bind(this))
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }

    handleEnterPress = (clicked) => (event) => {
        if(event.key==="enter" || clicked === "onClick") {
            store.dispatch({type: 'SUBMIT', latex:this.state.latex});
        }
        console.log(store.getState());
    }

    render() {
        return(
            <Accordion>
                <AccordionSummary>
                    <EditableField></EditableField>
                    <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={
                            <IconButton onClick={this.handleEnterPress("onClick")} onKeyPress={this.handleEnterPress}>
                                <PublishIcon></PublishIcon>
                            </IconButton>
                        }
                    >
                    </FormControlLabel>
                </AccordionSummary>
                <AccordionDetails>
                    <BottomToolbarBox></BottomToolbarBox>
                </AccordionDetails>
            </Accordion>
        )
    }
}