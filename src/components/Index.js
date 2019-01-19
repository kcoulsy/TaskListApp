import React, { Component } from 'react';

class Index extends Component {
	contructor(props) {
		this.super(props);
	}
	render () {
		return (<div>
			<h3>Hello.</h3>
			<input type="text" placeholder="CJ Patoilo" id="nameField" />
		</div>)
	}
}

export default Index;