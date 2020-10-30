import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import BottomToolbarBox from './BottomToolbarBox';

export default class TextArea extends React.Component {
    render() {
        return(
            <Accordion>
                <AccordionSummary>
                    <TextField></TextField>
                </AccordionSummary>
                <AccordionDetails>
                    <BottomToolbarBox></BottomToolbarBox>
                </AccordionDetails>
            </Accordion>
        )
    }
}