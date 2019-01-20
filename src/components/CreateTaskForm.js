import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

const FormButtonContainer = styled.div`
width: 100%;
padding: 10px 0;
display: flex;
justify-content: flex-end`;

class CreateTaskForm extends Component {
	state = {
		title: '',
		description: '',
		tag: '',
		status: 'To Do'
	}

    handleChange = (ev) => {
        const target = ev.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    createTask = () => {
		const data = this.state;
		// TODO better validation
		if (this.state.title && this.state.description) {
			axios({
				method: 'post',
				url: '/task',
				headers: {
					'x-auth': this.props.userToken
				},
				data
			}).then((res) => {
				if (res.data && this.props.onCreate) this.props.onCreate(res.data);
			})
		}
    }
	render() {
		return (
			<div className="form-group">
				<label className="form-label" htmlFor="create-task-form-title">Title</label>
				<input
					name="title"
					className="form-input"
					type="text"
					id="create-task-form-title"
					placeholder="Title"
					onChange={this.handleChange} />
				<label className="form-label" htmlFor="create-task-form-desc">Description</label>
				<textarea
					name="description"
					className="form-input"
					id="create-task-form-desc"
					placeholder="Description"
					rows="3"
					onChange={this.handleChange} />
				<label className="form-label" htmlFor="create-task-form-title">Tag</label>
				<input
					name="tag"
					className="form-input"
					type="text"
					id="create-task-form-tag"
					placeholder="Tag"
					onChange={this.handleChange} />
				<label className="form-label" htmlFor="create-task-form-title">Status</label>
				<select
					name="status"
					className="form-select"
					onChange={this.handleChange}>
						<option>To Do</option>
						<option>In Progress</option>
						<option>Blocked</option>
						<option>Ready for Testing</option>
						<option>Done</option>
				</select>
				<FormButtonContainer>
					<button className="btn btn-primary" onClick={this.createTask}>Create Task</button>
				</FormButtonContainer>
			</div>
		)
	}
};

const mapStateToProps = state => ({
	userToken: state.token
})

export default connect(mapStateToProps)(CreateTaskForm);