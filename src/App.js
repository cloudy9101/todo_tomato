import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TodoApp from './TodoAppHook';
import Signin from './SigninHook';
import Signup from './SignupHook';
import Trash from './TrashHook';
import Logout from './LogoutHook';

function App(props) {
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

export default App;
