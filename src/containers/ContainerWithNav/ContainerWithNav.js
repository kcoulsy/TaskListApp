import React from 'react';

import { NavBar } from '../../components';

const ContainerWithNav = ({ children, pageTitle }) => (
  <div>
    <NavBar />
    {pageTitle && (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{pageTitle}</h1>
          </div>
        </div>
      </section>
    )}
    <div className="container is-fluid">{children}</div>
  </div>
);

export default ContainerWithNav;
