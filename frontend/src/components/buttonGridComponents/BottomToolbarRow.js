import React from 'react';
import { Button , Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectLatex, TYPE } from '../../slices/EquationSlice';

const styles = {
  root:{
    background: 'skyblue'
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

  const dispatch = useDispatch();
  const latex = useSelector(selectLatex);
  const getItemJSX = (items) => {
    const {classes} = props;
    return items.map(
      (item) => {
        return <Grid item className = {classes.root} xs={3} sm={2} md={2} lg={1} xl={1}>
          <Button className={classes.button} 
            onClick={(e) => {dispatch(TYPE(latex+(item.props.children[0].props.children)))}} fullWidth>
            {item}
          </Button>
          </Grid>
      }
    );
  }

  const items = getItemJSX(props.row);

  return(
    <>
      {items}
    </>
  )
}
export default withStyles(styles)(BottomToolbarRow);