import React from 'react';
import { Button , Grid , AppBar, Tab, Tabs} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { selectCursor, selectLatex, TYPE } from '../../slices/EquationSlice';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root:{
    background: '#E2E2E2'
    ,color:'black'
  },
  button:{
    maxWidth:'1000px'
    ,maxHeight:'1000px'
    ,minWidth:'90px'
    ,minHeight:'100px'
    ,background: 'white'
    ,textTransform: 'lowercase'
  },
  root2: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
})); 

function TabPanel(props) {
  let currentLatex = useSelector(selectLatex);
  let currentCursorPosition = useSelector(selectCursor);
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const getItemJSX = (items) => {
    return items.map(
      (item,index) => {
        return <Grid key={index} item className = {classes.root} xs={3} sm={2} md={2} lg={1} xl={1}>
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

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Grid container spacing={1}>
        {items}
      </Grid>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  alue: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BottomToolbarRow(props){
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <div className={classes.root2}>
      <AppBar position="static">
        <Tabs 
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Main" {...a11yProps(0)} />
          <Tab label="Other" {...a11yProps(1)} />
          <Tab label="Arithmetic" {...a11yProps(2)} />
          <Tab label="Logic" {...a11yProps(3)} />
          <Tab label="Order" {...a11yProps(4)} />
          <Tab label="Set" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel alue="" row = {props.row[0]} value={value} index={0}> </TabPanel>
      <TabPanel alue="" row = {props.row[1]} value={value} index={1}> </TabPanel>
      <TabPanel alue="" row = {props.row[2]} value={value} index={2}> </TabPanel>
      <TabPanel alue="" row = {props.row[3]} value={value} index={3}> </TabPanel>
      <TabPanel alue="" row = {props.row[4]} value={value} index={4}> </TabPanel>
      <TabPanel alue="" row = {props.row[5]} value={value} index={5}> </TabPanel>
    </div>
  );
}
export default BottomToolbarRow;