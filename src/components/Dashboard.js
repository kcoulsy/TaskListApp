import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import NavBar from './NavBar';

class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<NavBar />
				<h3>Dashboard</h3>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		token: state.token
	}
}

export default connect(mapStateToProps)(Dashboard);