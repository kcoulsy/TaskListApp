import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router';

import Index from './components/Index';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Index} />
      </Router>
    );
  }
}

export default App;
