import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import UserSearch from './UserSearch';

const ButtonContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
`;

class CreateTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      tag: '',
      status: 'To Do',
      assignedTo: null
    };
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  createTask = () => {
    const data = this.state;
    // TODO better validation
    if (data.title && data.description) {
      axios({
        method: 'post',
        url: 'api/task',
        headers: {
          'x-auth': this.props.userToken
        },
        data
      }).then(res => {
        if (res.data && this.props.onCreate) this.props.onCreate(res.data);
      });
    }
  };

  selectUser = data => {
    const userId = (data && data._id) || null;
    this.setState({ assignedTo: userId });
  };

  render() {
    return (
      <div className="form-group">
        <label className="form-label" htmlFor="create-task-form-title">
          Title
          <input
            name="title"
            className="form-input"
            type="text"
            id="create-task-form-title"
            placeholder="Title"
            onChange={this.handleChange}
          />
        </label>
        <label className="form-label" htmlFor="create-task-form-desc">
          Description
          <textarea
            name="description"
            className="form-input"
            id="create-task-form-desc"
            placeholder="Description"
            rows="3"
            onChange={this.handleChange}
          />
        </label>
        <label className="form-label" htmlFor="create-task-form-title">
          Tag
          <input
            name="tag"
            className="form-input"
            type="text"
            id="create-task-form-tag"
            placeholder="Tag"
            onChange={this.handleChange}
          />
        </label>
        <label className="form-label" htmlFor="create-task-form-title">
          Status
          <select
            name="status"
            className="form-select"
            onChange={this.handleChange}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Blocked</option>
            <option>Ready for Testing</option>
            <option>Done</option>
          </select>
        </label>
        <label className="form-label">
          Assigned To
          <UserSearch selectUser={this.selectUser} />
        </label>
        <ButtonContainer>
          <button className="btn btn-primary" onClick={this.createTask}>
            Create Task
          </button>
        </ButtonContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userToken: state.token
});

export default connect(mapStateToProps)(CreateTaskForm);
