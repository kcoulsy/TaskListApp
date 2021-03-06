import React from 'react';

import { LoginForm } from '../../components';
import { ContainerWithNav } from '../../containers';

const Login = () => (
  <ContainerWithNav pageTitle="Login">
    <div className="columns">
      <div className="column is-two-fifths">
        <LoginForm />
      </div>
    </div>
  </ContainerWithNav>
);

export default Login;
