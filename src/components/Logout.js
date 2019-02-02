import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startLogout } from '../actions/auth';

class Logout extends Component {
	componentDidMount = () => {
	  this.props.logout();
	}

	render() {
	  return (<div>Logging out</div>);
	}
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(startLogout()),
});

export default connect(undefined, mapDispatchToProps)(Logout);
