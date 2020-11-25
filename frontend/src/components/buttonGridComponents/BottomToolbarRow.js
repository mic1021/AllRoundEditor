import React from 'react';
import { Button , Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectCursor, selectLatex, TYPE } from '../../slices/EquationSlice';

const styles = {
  root:{
    background: '#E2E2E2'
    ,color:'black'
  },
  button:{
    maxWidth:'1000px'
    ,maxHeight:'1000px'
    ,minWidth:'10px'
    ,minHeight:'100px'
    ,background: 'white'
    ,textTransform: 'lowercase'
  }
};

function BottomToolbarRow(props){

  let currentLatex = useSelector(selectLatex);
  let currentCursorPosition = useSelector(selectCursor);
  const dispatch = useDispatch();
  const getItemJSX = (items) => {
    const {classes} = props;
    return items.map(
      (item) => {
        return <Grid item className = {classes.root} xs={3} sm={2} md={2} lg={1} xl={1}>
          <Button className={classes.button} 
            onClick={buttonClickEvent(item,currentCursorPosition,currentLatex)} fullWidth>
            {item}
          </Button>
          </Grid>
      }
    );
  }

  const buttonClickEvent = (item,currentCursorPosition,currentLatex) => (e) => {
    currentLatex = currentLatex.substr(0,currentCursorPosition)+item.props.children[0].props.children+"{}"+currentLatex.substr(currentCursorPosition);
    dispatch(TYPE(currentLatex));
  }

  const items = getItemJSX(props.row);

  return(
    <>
      {items}
    </>
  )
}
export default withStyles(styles)(BottomToolbarRow);