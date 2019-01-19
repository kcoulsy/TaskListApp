import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';

class Index extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.token ? this.props.token : 'nothing'}
				<LoginForm />
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