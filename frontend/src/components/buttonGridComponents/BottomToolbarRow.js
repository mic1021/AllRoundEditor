import React,{ Component } from 'react';
import { Button , Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root:{
    background: 'skyblue'
    ,color:'black'
  },
  button:{
    maxWidth:'1000px'
    ,maxHeight:'1000px'
    ,minWidth:'10px'
    ,minHeight:'10px'
    ,background: 'white'
  }
};

class BottomToolbarRow extends Component{

  getItemJSX(items){
    const {classes} = this.props;
    return items.map(
      (item) => {
        return <Grid item className = {classes.root} xs={6} sm={4} md={3} lg={2} xl={2}>
          <Button className={classes.button} fullWidth>{item}</Button>
          </Grid>
      }
    );
  }

  render(){
    const items = this.getItemJSX(this.props.row);
    return(
      <>
        {items}
      </>
    );
  }
}
export default withStyles(styles)(BottomToolbarRow);