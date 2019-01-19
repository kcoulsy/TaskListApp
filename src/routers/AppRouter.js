import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LoginForm from '../components/LoginForm';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={LoginForm} />
      </Router>
    );
  }
}

export default AppRouter;
