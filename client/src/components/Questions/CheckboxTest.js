import React, { Component } from 'react';
import CheckboxModalTest from '../CheckboxModal/CheckboxModalTest';
import API from '../../utils/API';

class CheckboxQuestion extends Component {
  state = {
    User: {},
    title: 'Choices',
    choices: [
      { description: 'Romantic Text', frequency: 7, enabled: false },
      { description: 'Buy Flowers', frequency: 4, enabled: false },
      { description: 'Dinner Reservations', frequency: 3, enabled: false }
    ]
  };

  componentDidMount() {
    this.loadUserInfo();
  }
  loadUserInfo = () => {
    API.getUsers().then(res => {
      this.setState({ users: res.data, User: res.data[res.data.length - 1] });
      //   console.log(res.data[res.data.length - 1]);
      //   console.log(res.data[res.data.length - 1]._id);
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    alert(`userField: ${this.state.userField}`);
    const phoneRegEx = this.state.userField.replace(/\D/g, '');
    API.updateUser(this.state.User._id, {
      phone: phoneRegEx
    });
  };

  handleInputChange = event => {
    const { name, checked } = event.target;

    this.setState(prevState => ({
      choices: prevState.choices.map(obj =>
        obj.description === name
          ? Object.assign(obj, { enabled: checked })
          : obj
      )
    }));
  };

  render() {
    return (
      <CheckboxModalTest
        handleFormSubmit={this.handleFormSubmit}
        handleInputChange={this.handleInputChange}
        title={this.state.title}
        choices={this.state.choices}
      />
    );
  }
}

export default CheckboxQuestion;
