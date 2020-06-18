import React from "react";
import { Route, Switch } from "react-router-dom";

import homepage from "./start/homepage";
import login from "./authlogin/Login";
import RP001 from './pages/Report001'

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={login} />
        <Route exact path="/Login"  component={login} />
        <Route exact path="/start" component={homepage} />
        <Route exact path="/RP001" component={RP001} />

      </Switch>
    );
  }
}

export default Routes;
