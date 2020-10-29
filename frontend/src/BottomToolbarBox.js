import React,{ Component } from 'react';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BottomToolbarRows from './BottomToolbarRows';

const styles = {
  root:{
    background: 'red'
    ,border: 0
    ,padding: '0 0'
    ,margin: '0px 0px 0px 0px'
  }
};

class BottomToolbarBox extends Component{
  render(){
    const {classes} = this.props;
    return(
      <Box className={classes.root}>
        <BottomToolbarRows className={classes.root}></BottomToolbarRows>
      </Box>
    );
  }
}

export default withStyles(styles)(BottomToolbarBox);