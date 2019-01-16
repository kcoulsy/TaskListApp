import React, { Component } from 'react';

class Index extends Component {
	contructor(props) {
		this.super(props);
	}
	render () {
		return <div> Hello. { this.props.name }</div>
	}
}

export default Index;