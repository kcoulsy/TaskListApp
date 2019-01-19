import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Index from '../components/Index';
import Dashboard from '../components/Dashboard';

class AppRouter extends Component {
  render() {
    return (
		<Router>
			<Switch>
				<PublicRoute path="/" exact component={Index} />
				<PublicRoute path="/login" exact component={LoginForm} />
				<PublicRoute path="/register" exact component={RegisterForm} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
			</Switch>
		</Router>
    );
  }
}

export default AppRouter;
