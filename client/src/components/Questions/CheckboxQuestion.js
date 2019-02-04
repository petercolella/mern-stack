import React, { Component } from 'react';
import CheckboxModal from '../CheckboxModal';
import API from '../../utils/API';

class CheckboxQuestion extends Component {
  state = {
    users: [],
    User: {},
    title: 'Checkboxes',
    placeholder: 'Enter here (no dashes or spaces).',
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
    const name = event.target.name;
    const value = event.target.value;
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
        placeholder={this.state.placeholder}
        title={this.state.title}
        user={this.state.User}
      />
    );
  }
}

export default CheckboxQuestion;
