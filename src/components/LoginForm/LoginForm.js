import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../../actions/auth';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  handleLogin = ev => {
    ev.preventDefault();
    const { username, password } = this.state;
    // TODO: @validation
    this.props.startLogin({ username, password });
  };

  render() {
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title"> Login </p>
        </header>
        <div className="card-content">
          <form className="content" onSubmit={this.handleLogin}>
            <div className="field">
              <label className="label" htmlFor="usernameField">
                Username
              </label>
              <div className="control">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  className="input"
                  id="usernameField"
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="passwordField">
                Password
              </label>
              <div className="control">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  className="input"
                  id="passwordField"
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type="submit">
                  Log In
                </button>
              </div>
              <div className="control">
                <button className="button is-text">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLogin: data => dispatch(startLogin(data))
});

export default connect(
  undefined,
  mapDispatchToProps
)(LoginForm);
