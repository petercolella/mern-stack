import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../utils/API';
import initGoogleUser from '../../utils/Google';
const $ = window.$;

class Phone extends Component {
  state = {
    User: {},
    userEmail: '',
    title: 'Phone Number',
    placeholder: 'Enter here (no dashes or spaces).',
    question: 'what is your phone number?',
    userField: '',
    nextQuestionLink: '/checkbox'
  };

  initClient = function() {
    const self = this;
    window.gapi.load('auth2', function() {
      window.gapi.auth2
        .init({
          client_id:
            '3734915239-ctslo30gfojv1o37cl4gbf6gg5rttu7h.apps.googleusercontent.com'
        })
        .then(
          GoogleAuth => {
            const currentUserEmail = GoogleAuth.currentUser
              .get()
              .getBasicProfile()
              .getEmail();
            self.setState(
              {
                userEmail: currentUserEmail
              },
              () => {
                self.loadUserInfo();
              }
            );
          },
          err => {
            console.log(err);
          }
        );
    });
    console.log(initGoogleUser.initClient());
  };

  componentDidMount() {
    this.initClient();
  }

  loadUserInfo = () => {
    const email = this.state.userEmail;
    API.getUserByEmail(email).then(res => {
      const resUser = res.data.shift();
      this.setState({ User: resUser });
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    $('.toast').toast('show');
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
      <Modal
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

export default Phone;
