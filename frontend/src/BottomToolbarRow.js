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
  render(){
    console.log(this.state.WindowSize);
    const {classes} = this.props;
    return(
      <>
        <Grid item className = {classes.root} xs={6} sm={4} md={3} lg={2} xl={2}>
          <Button className = {classes.button} fullWidth>+</Button>
        </Grid>
        <Grid item className = {classes.root} xs={6} sm={4} md={3} lg={2} xl={2}>
          <Button className = {classes.button} fullWidth>-</Button>
        </Grid>
        { this.state.WindowSize >= 600 &&
          <Grid item className = {classes.root} xs={6} sm={4} md={3} lg={2} xl={2}>
            <Button className = {classes.button} fullWidth>x</Button>
          </Grid>
        }
        { this.state.WindowSize >= 960 &&
          <Grid item className = {classes.root} xs={6} sm={4} md={3} lg={2} xl={2}>
            <Button className = {classes.button} fullWidth>/</Button>
          </Grid>
        }
        { this.state.WindowSize >= 1280 &&
          <>
            <Grid item className = {classes.root} xs={6} sm={4} md={3} lg={2} xl={2}>
              <Button className = {classes.button} fullWidth>*</Button>
            </Grid>
            <Grid item className = {classes.root} xs={6} sm={4} md={3} lg={2} xl={2}>
              <Button className = {classes.button} fullWidth>$</Button>
            </Grid>
          </>
        }
      </>
    );
  }
}
export default withStyles(styles)(BottomToolbarRow);