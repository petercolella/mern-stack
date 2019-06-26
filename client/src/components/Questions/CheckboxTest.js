import React, { Component } from 'react';
import CheckboxModalTest from '../CheckboxModal/CheckboxModalTest';
import API from '../../utils/API';
const userId = process.env.USER_ID || '5c67a54ea10b120544c9e8c2';

class CheckboxQuestion extends Component {
  state = {
    user_id: userId,
    User: {},
    title: 'Choices',
    choices: [
      { description: 'Choice One', enabled: false },
      { description: 'Choice Two', enabled: false },
      { description: 'Choice Three', enabled: false }
    ]
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () => {
    API.getUser(this.state.user_id).then(res => {
      this.setState({ User: res.data });
      console.log('User:', this.state.User);
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.updateUser(this.state.User._id, {
      choices: this.state.choices.filter(choice => choice.enabled === true)
    });
    this.loadUserInfo();
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
