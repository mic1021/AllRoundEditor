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
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SaveIcon from "@material-ui/icons/Save";
import SendIcon from '@material-ui/icons/Send';

function TextArea(props){
    const dispatch = useDispatch();

    const handleEnterPress = (clicked) => (event) => {
        if(event.key==="enter" || clicked === "onClick") {
            dispatch(SUBMIT());
        }
    }

    return(
        <>
        <Accordion>
            <AccordionSummary>

                <Box bgcolor="white" width="100%" margin="20px 20px 20px 40px" padding="10px 10px 10px 10px"
 //                   onClick={(event) => event.stopPropagation()}
 //                   onFocus={(event) => event.stopPropagation()}>
                      border = {2}
                      borderColor="darkgreen"
                      borderRadius={10}
                    >
                    <EditableField></EditableField>
                   
                </Box>
                <FormControlLabel
                    aria-label="Acknowledge"
                    onClick={(event) => event.stopPropagation()}
                    onFocus={(event) => event.stopPropagation()}
                    control={
                    <IconButton onClick={handleEnterPress("onClick")} onKeyPress={handleEnterPress}>
                        <SendIcon style={{ fontSize: 40, color: "black", padding: 0}}></SendIcon>
                        </IconButton>
                    }
                >
                </FormControlLabel>
            </AccordionSummary>
        </Accordion>
        <Accordion>
            <AccordionSummary style={{ flexDirection: "column" }} expandIcon={<ExpandMoreIcon />}>
            </AccordionSummary>
            <AccordionDetails>
                <BottomToolbarBox></BottomToolbarBox>
            </AccordionDetails>
        </Accordion>
        </> 
    )
}

export default TextArea;