import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Welcome to the Landing Page!</h1>
          {/* <header className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p className="lead">
            {/* Edit <code>src/App.js</code> and save to reload. */}
            Please Sign In.
          </p>
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
          {/* </header> */}
        </div>
      </div>
    );
  }
}

export default App;
