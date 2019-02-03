import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Phone from './components/Questions/Phone';
import CheckboxQuestion from './components/Questions/CheckboxQuestion';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/phone" component={Phone} />
        <Route exact path="/checkbox" component={CheckboxQuestion} />
      </Switch>
    </Router>
  );
};

export default App;
