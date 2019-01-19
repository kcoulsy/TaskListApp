import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from './NavBar';

class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<NavBar />
				<h3>Home Page</h3>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		token: state.token
	}
}

export default connect(mapStateToProps)(Index);