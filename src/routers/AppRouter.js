import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import RegisterForm from '../components/RegisterForm';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={RegisterForm} />
      </Router>
    );
  }
}

export default AppRouter;
