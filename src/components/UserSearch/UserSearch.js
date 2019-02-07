import React, { Component } from 'react';
import axios from 'axios';

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoCompleteUsers: [],
      selectedUser: {},
      searchInput: '',
      searchFocused: false
    };
  }

  handleInput = ev => {
    const { value } = ev.target;

    this.setState({
      searchInput: value,
      selectedUser: {},
      autoCompleteUsers: []
    });

    if (value.length) {
      this.searchUsers();
    }

    if (this.props.selectUser) {
      this.props.selectUser(null);
    }
  };

  searchUsers = () => {
    axios({
      method: 'post',
      url: 'api/users/find',
      data: {
        username: this.state.searchInput
      }
    }).then(res => {
      this.setState({ autoCompleteUsers: res.data });
    });
  };

  onFocus = () => {
    if (this.state.searchFocused) return;

    this.setState({ searchFocused: true });
    if (this.state.searchInput.length) this.searchUsers();
  };

  onBlur = () => {
    if (!this.state.searchFocused) return;

    this.setState({
      searchFocused: false
    });
  };

  selectUser = ev => {
    ev.preventDefault();
    const userId = ev.target.closest('li').getAttribute('id');
    const filteredUsers = this.state.autoCompleteUsers.filter(
      user => user._id === userId
    );
    const selectedUser = filteredUsers[0];

    this.setState({
      selectedUser,
      searchInput: selectedUser.username,
      searchFocused: false,
      autoCompleteUsers: []
    });

    if (this.props.selectUser) {
      this.props.selectUser(selectedUser);
    }
  };

  render() {
    return (
      <div className="form-autocomplete" style={{ maxHeight: 36 }}>
        <input
          className="form-input"
          type="text"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.handleInput}
          value={this.state.searchInput}
          placeholder="Search User"
        />
        {(this.state.autoCompleteUsers.length && (
          <ul className="menu">
            {this.state.autoCompleteUsers.map(user => (
              <UserSearchListItem
                id={user._id}
                username={user.username}
                handleClick={this.selectUser}
                key={user}
              />
            ))}
          </ul>
        )) ||
          null}
      </div>
    );
  }
}

const UserSearchListItem = ({ id, profilePic, username, handleClick }) => (
  <li className="menu-item" id={id}>
    <a href="#" onClick={handleClick}>
      <div className="tile tile-centered">
        {profilePic && <div className="tile-icon">{profilePic}</div>}
        {username && <div className="tile-content">{username}</div>}
      </div>
    </a>
  </li>
);

export default UserSearch;
