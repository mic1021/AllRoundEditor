import React from 'react';
import Modal from '@material-ui/core/Modal';
import { textAlign } from '@material-ui/system';
import Box from '@material-ui/core/Box';




export default function NoEquationError(props) {
    const errorMessage = (
        <Box style={{backgroundColor: 'white', textAlign: 'center', width: '80%', margin: '200px auto', borderBlockStyle: 'groove'}}

        >

            <h1>Error!</h1>
            <h3>Please select equations you want to save before clicking save</h3>
        </Box>
    )
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            {errorMessage}
        </Modal>
    )
}