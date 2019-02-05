import React, { Component } from 'react';
import CheckboxModal from '../CheckboxModal';
import API from '../../utils/API';

class CheckboxQuestion extends Component {
  state = {
    users: [],
    User: {},
    title: 'Checkboxes',
    choices: [
      { name: 'Romantic Text', frequency: 7, enabled: true },
      { name: 'Buy Flowers', frequency: 4, enabled: false },
      { name: 'Dinner Reservations', frequency: 3, enabled: false }
    ],
    question: 'please check your selections?',
    userField: '',
    nextQuestionLink: '/dashboard'
  };

  componentDidMount() {
    this.loadUserInfo();
  }
  loadUserInfo = () => {
    API.getUsers().then(res => {
      this.setState({ users: res.data, User: res.data[res.data.length - 1] });
      console.log(res.data[res.data.length - 1]);
      console.log(res.data[res.data.length - 1]._id);
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
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <CheckboxModal
        handleFormSubmit={this.handleFormSubmit}
        handleInputChange={this.handleInputChange}
        question={this.state.question}
        userField={this.state.userField}
        link={this.state.nextQuestionLink}
        title={this.state.title}
        user={this.state.User}
        choices={this.state.choices}
      />
    );
  }
}

export default CheckboxQuestion;
