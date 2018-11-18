import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TodoApp from './TodoApp';
import Signin from './Signin';
import Logout from './Logout';

class App extends Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={TodoApp}/>
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/logout' component={Logout}/>
      </Switch>
    )
  }
}

export default App;
