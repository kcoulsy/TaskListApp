import React, { Component } from 'react';
import axios from 'axios';

import Loader from './Loader';

class TaskListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      assignedUsers: {},
      refresh: false,
      isLoading: true,
    };
    this.fetchDataAndStoreInState();
  }

  componentDidUpdate() {
    const refresh = !this.state.refresh;
    if (this.props.refresh !== this.state.refresh) {
      this.fetchDataAndStoreInState();
      this.setState({ refresh });
    }
  }

	fetchDataAndStoreInState = () => {
	  axios({
	    method: 'get',
	    url: '/tasks',
	  }).then((res) => {
	    this.setState({
	      tasks: res.data.tasks,
	      assignedUsers: res.data.users,
	      isLoading: false,
	    });
	  });
	}

	render() {
	  const { isLoading } = this.state;
	  if (isLoading) {
	    return <Loader />;
	  }
	  return (
  <table className="table">
    <thead>
      <tr>
        <th>Tag</th>
        <th>Title</th>
        <th>Status</th>
        <th>Assigned To</th>
      </tr>
    </thead>
    <tbody>
      {this.state.tasks.map((task) => {
					  const assignedTo = task.assignedTo && this.state.assignedUsers[task.assignedTo];

					  return (
  <tr key={task._id}>
    <td>{task.tag && task.tag.toUpperCase()}</td>
    <td>{task.title}</td>
    <td>{task.status}</td>
    <td>{assignedTo ? (<a href="#">{assignedTo.username}</a>) : 'Unassigned'}</td>
  </tr>
					  );
      })
					}
    </tbody>
  </table>
	  );
	}
}

export default TaskListTable;
