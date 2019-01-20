import React, { Component } from 'react';
import axios from 'axios';

class TaskListTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: []
		}
		this.fetchDataAndStoreInState();
	}
	fetchDataAndStoreInState = () => {
		axios({
			method: 'get',
			url: '/tasks'
		}).then((res) => {
			this.setState({tasks: res.data.tasks})
		})
	}
	render() {
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