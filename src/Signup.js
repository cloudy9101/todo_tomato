import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Signup.css';
import Api from './Api';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', passwordConfirmation: '' };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signup = this.signup.bind(this);
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handlePasswordConfirmation(event) {
    this.setState({passwordConfirmation: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    Api.signup(this.state, this.signup);
  }

  signup(data) {
    if (data.status === 204) {
      this.setState({status: 200});
    }
  }

  render() {
    if (this.state.status === 200) {
      return (<Redirect to="/" />);
    } else {
      return(
        <div className="Signup container">
          <div className="main">
            <div className="title-image">
            </div>
            <form onSubmit={this.handleSubmit}>
              <input className="form-control" type="text" value={this.state.email} onChange={this.handleEmail} placeholder="Email" />
              <input className="form-control" type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" />
              <input className="form-control" type="password" value={this.state.passwordConfirmation} onChange={this.handlePasswordConfirmation} placeholder="Password Confirmation" />
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
}

export default Signup;
