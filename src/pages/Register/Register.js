import React from 'react';

import { RegisterForm } from '../../components';
import { ContainerWithNav } from '../../containers';

const Register = () => (
  <ContainerWithNav pageTitle="Register">
    <div className="columns">
      <div className="column is-two-fifths">
        <RegisterForm />
      </div>
    </div>
  </ContainerWithNav>
);

export default Register;
