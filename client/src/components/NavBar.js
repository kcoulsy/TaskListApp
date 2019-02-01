import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderBar = styled.header`
border-bottom: 1px solid #5755d9;
padding: 0 10px;`;

const NavBar = (props) => (
<HeaderBar className="navbar">
  <section className="navbar-section">
    <Link to="/" className="btn btn-link">Home</Link>
  </section>
  <section className="navbar-center">
  </section>
  { props.token ?
	(
	<section className="navbar-section">
		<span>{`Logged in as: ${props.user.username}`}</span>
		<Link to="/logout" className="btn btn-link">Logout</Link>
	</section>
	) : (
	<section className="navbar-section">
		<Link to="/login" className="btn btn-link">Login</Link>
		<Link to="/register" className="btn btn-link">Register</Link>
	</section>
	)
}
</HeaderBar>
);

const mapStateToProps = state => {
	return {
		token: state.token,
		user: state.user
	}
}
export default connect(mapStateToProps)(NavBar);