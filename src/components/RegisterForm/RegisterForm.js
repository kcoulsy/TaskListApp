import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startRegister } from '../../actions/auth';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  handleRegister = ev => {
    ev.preventDefault();
    const { email, username, password } = this.state;
    // TODO: @validation
    this.props.startRegister({ email, username, password });
  };

  render() {
    return (
      <div className="card">
        <header className="card-header">
          <p className="card-header-title"> Register </p>
        </header>
        <div className="card-content">
          <form className="content" onSubmit={this.handleRegister}>
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
                  Register
                </button>
              </div>
              <div className="control">
                <button className="button is-text">Already Registered?</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startRegister: data => dispatch(startRegister(data))
});

export default connect(
  undefined,
  mapDispatchToProps
)(RegisterForm);
