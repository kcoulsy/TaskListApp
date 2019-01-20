import React, { Component } from 'react';

import ContainerWithNav from '../containers/ContainerWithNav';
import TaskListTable from './TaskListTable';
import Modal from './Modal';
import CreateTaskForm from './CreateTaskForm';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalActive: true,
			refreshList: false
		}
		this.clearSelected = this.clearSelected.bind(this);
	}

	clearSelected = (ev) => {
		this.setState({selected: null});
	}

	onCreate = (res) => {
		if (this.state.modalActive) {
			this.setState({
				modalActive: false,
				refreshList: !this.state.refreshList
			});
		}
	}

	render() {
		return (
			<ContainerWithNav>
				<h3>Dashboard</h3>
				<TaskListTable refresh={this.state.refreshList} />
				<Modal
					active={!!this.state.modalActive}
					onClose={this.clearSelected}
					body={<CreateTaskForm onCreate={this.onCreate}/>}/>
			</ContainerWithNav>
		);
	}
}

export default Dashboard;