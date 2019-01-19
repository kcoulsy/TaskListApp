import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';
import configStore from './store/config';

import '../node_modules/spectre.css/dist/spectre.css';
const store = configStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
