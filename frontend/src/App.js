import React from 'react';
import Demo from './components/Demo';
import AllRoundEditor from './AllRoundEditor';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Demo}></Route>
        <Route exact path="/AllRoundEditor" component={AllRoundEditor}></Route>
      </Switch>
    </Router>
  );
}

export default App;