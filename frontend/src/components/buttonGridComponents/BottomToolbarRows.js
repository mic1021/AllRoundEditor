import React,{ Component } from 'react';
import { Grid } from '@material-ui/core';
import BottomToolbarRow from './BottomToolbarRow';

class BottomToolbarRows extends Component{
  render(){
    const {className} = this.props;
    return(
      <div>
        <Grid container spacing={1}>
          <BottomToolbarRow></BottomToolbarRow>
          <BottomToolbarRow></BottomToolbarRow>
          <BottomToolbarRow></BottomToolbarRow>
        </Grid>
      </div>
    );
  }
}

export default BottomToolbarRows;