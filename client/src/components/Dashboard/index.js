import React, { Component } from 'react';
import UserList from '../UserList';
import API from '../../utils/API';

class Dashboard extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    API.getUsers().then(res => this.setState({ users: res.data }));
  };

  render() {
    return <UserList users={this.state.users} />;
  }
}

export default Dashboard;
