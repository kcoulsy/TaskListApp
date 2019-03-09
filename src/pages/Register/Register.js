import React from 'react';

import { RegisterForm } from '../../components';
import { ContainerWithNav } from '../../containers';

const Register = () => (
  <ContainerWithNav pageTitle="Register">
    <RegisterForm />
  </ContainerWithNav>
);

export default Register;
