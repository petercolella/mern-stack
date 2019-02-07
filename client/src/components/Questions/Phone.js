import React, { Component } from 'react';
import Modal from '../Modal';
import API from '../../utils/API';
const $ = window.$;

class Phone extends Component {
  state = {
    users: [],
    User: {},
    title: 'Phone Number',
    placeholder: 'Enter here (no dashes or spaces).',
    question: 'what is your phone number?',
    userField: '',
    nextQuestionLink: '/checkbox'
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
    // alert(`userField: ${this.state.userField}`);
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
      <div>
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
        {/* <div
          aria-live="polite"
          aria-atomic="true"
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'relative',
            minHeight: 200
          }}>
          <div
            className="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true">
            <div className="toast-body">
              Hello, world! This is a toast message.
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Phone;
