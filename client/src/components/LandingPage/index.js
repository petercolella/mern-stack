import React, { Component } from 'react';

const styles = {
  marginTop: 120,
  imgStyle: {
    height: 96,
    width: 'auto'
  }
};

class LandingPage extends Component {
  state = {
    currentUser: '',
    currentUserMessage: 'Please Sign In.',
    imageUrl: ''
  };

  onSignIn = googleUser => {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    if (profile.getName()) {
      this.setState({
        currentUser: profile.getName(),
        currentUserMessage: `Hello, ${profile.getName()}`,
        imageUrl: profile.getImageUrl()
      });
    }
  };

  onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());

    // ******* NEED REDIRECT CODE TO SEND TO PAGE FOR SIGN UP *************
  }
  onFailure(error) {
    console.log(error);
  }

  componentDidMount() {
    window.gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSignIn,
      onfailure: this.onFailure
    });
  }

  render() {
    return (
      <div style={styles} className="container">
        <div className="jumbotron">
          <h1 className="display-4">Welcome to the Landing Page!</h1>
          <hr />
          <p className="lead">{this.state.currentUserMessage}</p>
          {this.state.imageUrl ? (
            <img src={this.state.imageUrl} alt="profile-img" />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="profile-img"
              style={styles.imgStyle}
            />
          )}
        </div>
        <div id="my-signin2" />
      </div>
    );
  }
}

export default LandingPage;
