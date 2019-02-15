import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../utils/API';
const $ = window.$;

class Phone extends Component {
  state = {
    users: [],
    User: {},
    userEmail: 'colella.peter.j@gmail.com',
    title: 'Phone Number',
    placeholder: 'Enter here (no dashes or spaces).',
    question: 'what is your phone number?',
    userField: '',
    nextQuestionLink: '/checkbox'
  };

  initClient = function() {
    window.gapi.load('auth2', function() {
      const GoogleAuth = window.gapi.auth2.init({
        client_id:
          '3734915239-ctslo30gfojv1o37cl4gbf6gg5rttu7h.apps.googleusercontent.com'
      });
      return GoogleAuth.then(
        () => {
          const currentUserEmail = GoogleAuth.currentUser
            .get()
            .getBasicProfile()
            .getEmail();
          console.log(currentUserEmail);
        },
        err => {
          console.log(err);
        }
      );
      //   this.setState({
      //     userEmail: GoogleAuth.currentUser
      //       .get()
      //       .getBasicProfile()
      //       .getEmail()
      //   });
    });
  };

  clientEmail = () => {
    console.log(this.initClient());
  };

  componentDidMount() {
    this.initClient();
    this.clientEmail();
    this.loadUserInfo();
    this.findUserByEmail();
  }

  loadUserInfo = () => {
    API.getUsers().then(res => {
      this.setState({ users: res.data, User: res.data[res.data.length - 1] });
      console.log(res.data[res.data.length - 1]);
      console.log(res.data[res.data.length - 1]._id);
    });
  };

  findUserByEmail = () => {
    console.log(this.state.userEmail);
    const email = this.state.userEmail;
    API.getUserByEmail(email).then(res => {
      console.log(res.data);
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
