import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { isAuthenticated, authenticate } from './authenticate';
import './Signin.css';
import Api from './Api';

function Signin(props) {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Api.signin({email: email, password: password}, () => {
      authenticate();
      setAuth(true);
    });
  }

  if (auth && isAuthenticated()) { return (<Redirect to="/" />); }

  return(
    <div className="Signin container">
      <div className="main">
        <div className="title-image">
        </div>
        <form onSubmit={handleSubmit}>
          <input className="form-control" type="text" value={email} onChange={handleEmail} placeholder="Email" />
          <input className="form-control" type="password" value={password} onChange={handlePassword} placeholder="Password" />
          <div className="btn-group buttons" role="group" aria-label="Basic example">
            <input className="btn btn-outline-primary" type="submit" value="Sign in" />
            <Link className="btn btn-outline-success" to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
