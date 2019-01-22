import React, { Component } from 'react';
import UserList from '../UserList';
import API from '../../utils/API';

class Dashboard extends Component {
  state = {
    users: [],
    name: '',
    email: ''
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    API.getUsers().then(res =>
      this.setState({ users: res.data, name: '', email: '' })
    );
  };

  render() {
    return <UserList users={this.state.users} />;
  }
}

export default Dashboard;
