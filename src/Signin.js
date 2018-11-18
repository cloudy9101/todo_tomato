import React, { Component } from 'react';
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
    console.log(cookies);
    Api.signin(this.state, this.signin);
  }

  signin(data) {
    console.log(data);
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.email} onChange={this.handleEmail} placeholder="Username" />
        <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password" />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default Signin;
