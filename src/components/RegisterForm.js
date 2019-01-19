import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { startRegister } from '../actions/auth';

const Panel = styled.div`
padding: 24px;
width: 300px;
height: 370px;
margin-left: auto;
margin-right: auto;
display: flex;
flex-direction: column;
align-items: center;`;

const RegisterFormButtons = styled.div`
display:flex;
margin-top: 10px;
justify-content: space-around;
`;

const RegisterFormButton = styled.button`
flex-basis: 45%;`;

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        }
    }

    handleChange = (ev) => {
        const target = ev.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleRegister = (ev) => {
        ev.preventDefault();
        const {
            email,
            username,
            password
        } = this.state
        //TODO: @validation
        this.props.startRegister({ email, username, password })
    }

    render() {
        return (
            <Panel className="panel">
                <h3> Register </h3>
                <form className="form-group" onSubmit={this.handleRegister}>
                    <label className="form-label" htmlFor="emailField">Email</label>
                    <input type = "text"
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        className="form-input"
                        id="emailField" />
                    <label className="form-label" htmlFor="usernameField">Username</label>
                    <input type = "text"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                        className="form-input"
                        id="usernameField" />
                    <label className="form-label" htmlFor="passwordField">Password</label>
                    <input type = "password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                        className="form-input"
                        id="passwordField" />
                    <RegisterFormButtons>
                        <RegisterFormButton className="btn btn-primary" type="submit">Register</RegisterFormButton>
                    </RegisterFormButtons>
                </form>
            </Panel>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startRegister: (data) => dispatch(startRegister(data))
})

export default connect(undefined, mapDispatchToProps)(RegisterForm);