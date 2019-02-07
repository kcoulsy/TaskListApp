import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import Login from '../components/Login/Login';
import Logout from '../components/Logout/Logout';
import Register from '../components/Register/Register';
import Home from '../components/Home/Home';
import Dashboard from '../components/Dashboard/Dashboard';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PublicRoute path="/" exact component={Home} />
          <PublicRoute path="/login" exact component={Login} />
          <PublicRoute path="/register" exact component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/logout" component={Logout} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
