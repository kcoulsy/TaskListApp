import React, { Component } from 'react';

import { ContainerWithNav } from '../../containers';
import { TaskListTable, CreateTaskForm } from '../../components';
import { Modal } from '../../utilities';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createTaskModal: false,
      refreshList: false
    };
    this.clearSelected = this.clearSelected.bind(this);
  }

  clearSelected = () => {
    this.setState({ createTaskModal: false });
  };

  onCreate = () => {
    const refresh = !this.state.refreshList;

    if (this.state.createTaskModal) {
      this.setState({
        createTaskModal: false,
        refreshList: refresh
      });
    }
  };

  openCreateTask = () => {
    this.setState({ createTaskModal: true });
  };

  render() {
    return (
      <ContainerWithNav pageTitle="Dashboard">
        <button className="btn btn-primary" onClick={this.openCreateTask}>
          Create Task
        </button>
        <TaskListTable refresh={this.state.refreshList} />
        <Modal
          title="Create Task"
          active={!!this.state.createTaskModal}
          onClose={this.clearSelected}
          body={<CreateTaskForm onCreate={this.onCreate} />}
        />
      </ContainerWithNav>
    );
  }
}

export default Dashboard;
