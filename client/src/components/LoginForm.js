import React, { Component } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

const Panel = styled.div`
padding: 24px;
width: 300px;
height: 320px;
margin-left: auto;
margin-right: auto;
display: flex;
flex-direction: column;
align-items: center;`;

const LoginFormButtons = styled.div`
display:flex;
margin-top: 10px;
justify-content: space-around;
`;

const LoginFormButton = styled.button`
flex-basis: 45%;`;

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    handleLogin = (ev) => {
        ev.preventDefault();
        const {
            username,
            password
        } = this.state
        //TODO: @validation
        this.props.startLogin({ username, password })
    }

    render() {
        return (
            <Panel className="panel">
                <h3> Login </h3>
                <form className="form-group" onSubmit={this.handleLogin}>
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
                    <LoginFormButtons>
                        <LoginFormButton className="btn btn-primary" type="submit">Login</LoginFormButton>
                    </LoginFormButtons>
                </form>
            </Panel>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: (data) => dispatch(startLogin(data))
})

export default connect(undefined, mapDispatchToProps)(LoginForm);