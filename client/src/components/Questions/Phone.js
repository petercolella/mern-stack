import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../utils/API';
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
    const that = this;
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
            that.setState(
              {
                userEmail: currentUserEmail
              },
              () => {
                that.loadUserInfo();
                // that.findUserByEmail();
              }
            );
          },
          err => {
            console.log(err);
          }
        );
    });
    console.log(this.state.User);
  };

  componentDidMount() {
    this.initClient();
  }

  loadUserInfo = () => {
    API.getUserByEmail(this.state.userEmail).then(res => {
      console.log(res.data);
      this.setState({ User: res.data });
      console.log(this.state.User);
      console.log(this.state.User.name);
    });
  };

  findUserByEmail = () => {
    const email = this.state.userEmail;
    API.getUserByEmail(email).then(res => {
      //   console.log(res.data);
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
