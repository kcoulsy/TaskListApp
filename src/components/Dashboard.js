import React, { Component } from 'react';

import ContainerWithNav from '../containers/ContainerWithNav';
import TaskListTable from './TaskListTable';
import Modal from './Modal';
import CreateTaskForm from './CreateTaskForm';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createTaskModal: false,
			refreshList: false
		}
		this.clearSelected = this.clearSelected.bind(this);
	}

	clearSelected = (ev) => {
		this.setState({createTaskModal: false});
	}

	onCreate = (res) => {
		if (this.state.createTaskModal) {
			this.setState({
				createTaskModal: false,
				refreshList: !this.state.refreshList
			});
		}
	}

	openCreateTask = () => {
		this.setState({createTaskModal: true});
	}

	render() {
		return (
			<ContainerWithNav>
				<h3>Dashboard</h3>
				<button className="btn btn-primary" onClick={this.openCreateTask}>Create Task</button>
				<TaskListTable refresh={this.state.refreshList} />
				<Modal
					title="Create Task"
					active={!!this.state.createTaskModal}
					onClose={this.clearSelected}
					body={<CreateTaskForm onCreate={this.onCreate}/>}/>
			</ContainerWithNav>
		);
	}
}

export default Dashboard;