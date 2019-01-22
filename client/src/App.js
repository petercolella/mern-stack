import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Welcome to the Landing Page!</h1>
          <p className="lead">Please Sign In.</p>
        </div>
      </div>
    );
  }
}

export default App;
