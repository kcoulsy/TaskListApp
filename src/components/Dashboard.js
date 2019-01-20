import React, { Component } from 'react';

import ContainerWithNav from '../containers/ContainerWithNav';
import TaskListTable from './TaskListTable';
import Modal from './Modal';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: '123'
		}
		this.clearSelected = this.clearSelected.bind(this);
	}

	clearSelected = (ev) => {
		this.setState({selected: null});
	}

	render() {
		return (
			<ContainerWithNav>
				<h3>Dashboard</h3>
				<TaskListTable />
				<Modal active={!!this.state.selected} onClose={this.clearSelected} />
			</ContainerWithNav>
		);
	}
}

export default Dashboard;