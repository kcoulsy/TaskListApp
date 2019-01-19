import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Index from '../components/Index';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Index} />
      </Router>
    );
  }
}

export default AppRouter;
