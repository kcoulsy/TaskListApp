import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderBar = styled.nav`
  border-bottom: 1px solid #5755d9;
`;

const NavBar = props => (
  <HeaderBar className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/" className="navbar-item">
        TaskListApp
      </Link>
      <a
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div className="navbar-menu">
      {props.token ? (
        <div className="navbar-end">
          <div className="navbar-item">
            <span>{`Logged in as: ${props.user.username}`}</span>
          </div>

          <div className="navbar-item">
            <div className="buttons">
              <Link to="/logout" className="button is-light">
                <strong>Logout</strong>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/register" className="button is-primary">
                <strong>Sign up</strong>
              </Link>
              <Link to="/login" className="button is-light">
                <strong>Log In</strong>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  </HeaderBar>
);

const mapStateToProps = state => ({
  token: state.token,
  user: state.user
});
export default connect(mapStateToProps)(NavBar);
