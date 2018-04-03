import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import NavBar from './components/NavBar'
import LoginPage from './components/login/LoginPage'
import LogoutPage from './components/logout/LogoutPage'
import groups from './components/groups/groups'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <NavBar/>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/groups" component={groups} />
          <Route exact path="/" render={ () => <Redirect to="/groups" /> } />
        </div>
      </Router>
    )
  }
}

export default App
