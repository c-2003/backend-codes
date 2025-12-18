import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashbroad.js';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  </Router>
);

export default App;
