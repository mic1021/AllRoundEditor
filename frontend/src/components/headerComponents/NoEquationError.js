import React from 'react';
import Modal from '@material-ui/core/Modal';

export default function NoEquationError(props) {
    const errorMessage = (
        <div>
            <h2>Error!</h2>
            <p>Please select equations you want to save before clicking save</p>
        </div>
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