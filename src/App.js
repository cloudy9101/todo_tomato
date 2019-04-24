import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TodoApp from './TodoAppHook';
import Signin from './Signin';
import Signup from './Signup';
import Trash from './Trash';
import Logout from './Logout';

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <Route exact path='/' component={TodoApp}/>
          <Route exact path='/signin' component={Signin}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/trash' component={Trash}/>
          <Route exact path='/logout' component={Logout}/>
        </div>
      </Router>
    )
  }
}

export default App;
