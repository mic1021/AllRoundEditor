import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import BottomToolbarBox from './buttonGridComponents/BottomToolbarBox';
import EditableField from './mathFieldComponents/EditableField';
import { useDispatch } from 'react-redux';
import { SUBMIT } from '../slices/EquationSlice';
import { Box} from '@material-ui/core';

function TextArea(props){
    const dispatch = useDispatch();

    const handleEnterPress = (clicked) => (event) => {
        if(event.key==="enter" || clicked === "onClick") {
            dispatch(SUBMIT());
        }
    }

    return(
        <Accordion>
            <AccordionSummary>
                <Box padding="10px 20px 10px 10px" height="25%" width="auto"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}>
                 <EditableField></EditableField>
                </Box>
                <FormControlLabel
                    aria-label="Acknowledge"
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={
                        <IconButton onClick={handleEnterPress("onClick")} onKeyPress={handleEnterPress}>
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

export default TextArea;