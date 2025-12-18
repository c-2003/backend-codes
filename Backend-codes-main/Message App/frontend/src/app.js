import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./components/auth.js";
import Message from "./components/message.js";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/message" component={Message} />
      </Switch>
    </Router>
  );
};

export default App;
