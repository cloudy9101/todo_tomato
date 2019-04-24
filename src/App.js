import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import TodoApp from './TodoApp';
import Signin from './Signin';
import Signup from './Signup';
import Trash from './Trash';
import Logout from './Logout';

function App(props) {
  return(
    <Router>
      <div>
        <AuthenticatedRoute exact path='/' component={TodoApp}/>
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/signup' component={Signup}/>
        <AuthenticatedRoute exact path='/trash' component={Trash}/>
        <Route exact path='/logout' component={Logout}/>
      </div>
    </Router>
  )
}

export default App;
