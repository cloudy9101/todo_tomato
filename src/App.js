import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TodoApp from './TodoApp';
import Signin from './Signin';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Switch>
        <Route exact path='/' component={TodoApp}/>
        <Route exact path='/signin' component={Signin}/>
      </Switch>
    )
  }
}

export default App;
