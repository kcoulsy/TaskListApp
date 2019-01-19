import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import Login from '../components/Login';
import Register from '../components/Register';
import Index from '../components/Index';
import Dashboard from '../components/Dashboard';

class AppRouter extends Component {
  render() {
    return (
		<Router>
			<Switch>
				<PublicRoute path="/" exact component={Index} />
				<PublicRoute path="/login" exact component={Login} />
				<PublicRoute path="/register" exact component={Register} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
			</Switch>
		</Router>
    );
  }
}

export default AppRouter;
