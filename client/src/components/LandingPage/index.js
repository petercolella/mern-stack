import React from 'react';

const styles = {
  marginTop: 120
};

const LandingPage = () => {
  return (
    <div style={styles} className="container">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to the Landing Page!</h1>
        <p className="lead">Please Sign In.</p>
      </div>
      <div id="gSignInWrapper">
        <span class="label">Sign in with:</span>
        <div id="customBtn" class="customGPlusSignIn">
          <span class="icon" />
          <span class="buttonText">Google</span>
        </div>
      </div>
      <div id="name" />
    </div>
  );
};

export default LandingPage;
