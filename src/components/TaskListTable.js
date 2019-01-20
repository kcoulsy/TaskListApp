import React, { Component } from 'react';
import axios from 'axios';

import Loader from './Loader';

class TaskListTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			refresh: false,
			isLoading: true,
		}
		this.fetchDataAndStoreInState();
	}

	componentDidUpdate() {
		if (this.props.refresh != this.state.refresh) {
			this.fetchDataAndStoreInState();
			this.setState({refresh: !this.state.refresh});
		}
	}

	fetchDataAndStoreInState = () => {
		axios({
			method: 'get',
			url: '/tasks'
		}).then((res) => {
			this.setState({
				tasks: res.data.tasks,
				isLoading: false
			})
		})
	}

	render() {
		let isLoading = this.state.isLoading;
		if (isLoading) {
			return <Loader />
		}
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Assigned To</th>
					</tr>
				</thead>
				<tbody>
					{this.state.tasks.map((task) => (
						<tr key={task._id}>
							<td>{task.title}</td>
							<td>{task.assignedTo || 'Unassigned'}</td>
						</tr>
					))}
				</tbody>
			</table>
		)
	}
}

export default TaskListTable;