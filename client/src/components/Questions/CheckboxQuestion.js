import React, { Component } from 'react';
import CheckboxModal from '../CheckboxModal';
import API from '../../utils/API';

class CheckboxQuestion extends Component {
  state = {
    users: [],
    User: {},
    title: 'Choices',
    choices: [
      { description: 'Romantic Text', frequency: 7, enabled: false },
      { description: 'Buy Flowers', frequency: 4, enabled: false },
      { description: 'Dinner Reservations', frequency: 3, enabled: false }
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
