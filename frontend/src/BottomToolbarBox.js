import React,{ Component } from 'react';
import { Box } from '@material-ui/core';
import BottomToolbarRows from './BottomToolbarRows';

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