import React,{ Component , useState} from 'react';
import BottomToolbarRow from './buttonGridComponents/BottomToolbarRow';
import { Grid} from '@material-ui/core';
import {addStyles, StaticMathField, EditableMathField } from 'react-mathquill'

addStyles();

class BottomToolbarBox extends Component{
  constructor() {
    super();
    this.state = {
      WindowSize : window.innerWidth
    }
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.addEventListener("resize", null);
  }
  handleResize(WindowSize, event) {
    this.setState({WindowSize: window.innerWidth})
  }
  shouldComponentUpdate(nextProps,nextState){
    return ((nextState.WindowSize<600 && this.state.WindowSize>=600)
    ||(nextState.WindowSize>=600 && this.state.WindowSize<600)
    ||(nextState.WindowSize<960 && this.state.WindowSize>=960)
    ||(nextState.WindowSize>=960 && this.state.WindowSize<960)
    ||(nextState.WindowSize<1280 && this.state.WindowSize>=1280)
    ||(nextState.WindowSize>=1280 && this.state.WindowSize<1280));
  }

  getJSX(rows){
    return rows.map(
      (row) => {
        return <BottomToolbarRow row={row}></BottomToolbarRow>
      }
    )
  }

  render(){
    let columnNum;
    if(this.state.WindowSize<600) columnNum=2;
    else if(this.state.WindowSize<960) columnNum=3;
    else if(this.state.WindowSize<1280) columnNum=4;
    else columnNum=6;

    const rows = [
      []
      ,[]
      ,[['a','b'],['c','d'],['e','f'],['g','h'],['i','j'],['k','l']]
      ,[['a','b','c'],['d','e','f'],['g','h','i'],['j','k','l']]
      ,[['a','b','c','d'],['e','f','g','h'],['i','j','k','l']]
      ,[]
      ,[['a','b','c','d','e','f'],['g','h','i','j','k','l']]
    ];
    const rowsJSX = this.getJSX(rows[columnNum]);
    return(
      <Grid container spacing={1}>
        {rowsJSX}
      </Grid>
    );
  }
}

export default BottomToolbarBox;