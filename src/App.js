import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TodoApp from './TodoApp';
import Signin from './Signin';
import Signup from './Signup';
import Trash from './Trash';
import Logout from './Logout';

class App extends Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={TodoApp}/>
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/trash' component={Trash}/>
        <Route exact path='/logout' component={Logout}/>
      </Switch>
    )
  }
}

export default App;
