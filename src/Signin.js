import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Signin.css';
import Api from './Api';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signin = this.signin.bind(this);
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
  }

  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    Api.signin(this.state, this.signin);
  }

  signin(data) {
    if (data.status === 204) {
      this.setState({status: 200});
    }
  }

  render() {
    if (this.state.status === 200) {
      return (<Redirect to="/" />);
    } else {
      return(
        <div className="Signin container">
          <div className="main">
            <div className="title-image">
            </div>
            <form onSubmit={this.handleSubmit}>
              <input className="form-control" type="text" value={this.state.email} onChange={this.handleEmail} placeholder="Email" />
              <input className="form-control" type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" />
              <div className="btn-group buttons" role="group" aria-label="Basic example">
                <input className="btn btn-outline-primary" type="submit" value="Sign in" />
                <Link className="btn btn-outline-success" to="/signup">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default Signin;
