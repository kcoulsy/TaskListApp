import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppRouter from './components/Index';
import configStore from './store/config';

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
