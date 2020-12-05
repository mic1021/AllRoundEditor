import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {StaticMathField} from 'react-mathquill';

export default function EquationToSave(props) {
    const [category, setCategory] = useState('');
    const [disabled, setDisabled] = useState(false);
    const handleChange = (event) => {
        setCategory(event.target.value);
    }
    const handleSet = (event) => {
        if(disabled === false) {
            props.handleSet(category);
        }
        setDisabled(!disabled);
    }
    return(
        <ListItem key={props.index} role={undefined}>
            <Grid container spacing={1} direction="column">
                <Grid item xs={6} sm={6}>
                    <Typography>Equation: </Typography>
                    <StaticMathField>{props.equation}</StaticMathField>
                    </Grid>
                <Grid item xs={6} sm={6}>
                    <Typography>Category</Typography>
                    <TextField
                        value={category}
                        onChange={handleChange}
                        disabled={disabled}
                    ></TextField>
                    {disabled ? 
                        <Button variant="contained" color="primary" onClick={handleSet}>Edit</Button>
                        : <Button variant="contained" color="primary" onClick={handleSet}>Set</Button>}
                </Grid>
            </Grid>
        </ListItem>
    )
}