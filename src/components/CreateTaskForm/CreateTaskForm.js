import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import UserSearch from '../UserSearch/UserSearch';

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
      <div>
        <div className="field">
          <label className="label" htmlFor="create-task-form-title">
            Title
          </label>
          <div className="control">
            <input
              className="input"
              name="title"
              type="text"
              id="create-task-form-title"
              placeholder="Title"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="create-task-form-desc">
            Description
          </label>
          <div className="control">
            <textarea
              className="input"
              name="description"
              rows="3"
              id="create-task-form-desc"
              placeholder="Description"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="create-task-form-tag">
            Tag
          </label>
          <div className="control">
            <input
              className="input"
              name="tag"
              type="text"
              id="create-task-form-tag"
              placeholder="Tag"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Status</label>
          <div className="control">
            <div className="select">
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
            </div>
          </div>
        </div>

        <UserSearch selectUser={this.selectUser} label="Assigned To" />
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={this.createTask}>
              Create Task
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userToken: state.token
});

export default connect(mapStateToProps)(CreateTaskForm);
