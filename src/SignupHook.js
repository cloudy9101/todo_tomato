import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Signup.css';
import Api from './Api';

function Signup(props) {
  const email = useInput('');
  const password = useInput('');
  const passwordConfirmation = useInput('');
  const [isSignin, setIsSignin] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    Api.signup({
      email: email.value,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value
    }, () => { setIsSignin(true) });
  }

  if (isSignin) {
    return (<Redirect to="/" />);
  } else {
    return(
      <div className="Signup container">
        <div className="main">
          <div className="title-image">
          </div>
          <form onSubmit={handleSubmit}>
            <input className="form-control" type="text" {...email} placeholder="Email" />
            <input className="form-control" type="password" {...password} placeholder="Password" />
            <input className="form-control" type="password" {...passwordConfirmation} placeholder="Password Confirmation" />
            <div className="btn-group buttons" role="group" aria-label="Basic example">
              <input className="btn btn-outline-primary" type="submit" value="Sign up" />
            </div>
            <div className="signin-link">
              <Link to="/signin">Already has account? Sign in.</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function useInput(initial) {
  const [input, setInput] = useState(initial);
  return {
    value: input,
    onChange: (e) => { setInput(e.target.value) }
  }
}

export default Signup;
