import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

class Index extends Component {
    contructor(props) {
        this.super(props);
    }

    handleLogin = () => {
        this.props.startLogin({
            token: '123test',
            user: {
                name: 'kristian'
            }
        })
    }

    render() {
        return (
            <div>
                <h3> Hello. </h3>
                <input type = "text"
                    placeholder="CJ Patoilo"
                    id="nameField" />
                <button onClick={this.handleLogin}>Login</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: (data) => dispatch(startLogin(data))
})

export default connect(undefined, mapDispatchToProps)(Index);