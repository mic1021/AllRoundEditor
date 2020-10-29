import React,{ Component } from 'react';
import { Box } from '@material-ui/core';
import BottomToolbars from './BottomToolbars';

class BottomToolbarBox extends Component{
  render(){
    return(
      <Box>
        <BottomToolbars></BottomToolbars>
      </Box>
    );
  }
}

export default BottomToolbarBox;