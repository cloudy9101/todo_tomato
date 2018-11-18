import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Api from './Api';

class Logout extends Component {
  componentWillMount() {
    Api.logout(data => {
      console.log('logout');
    });
  }

  render() {
    return(
      <div>
        <Redirect to="/signin" />
      </div>
    );
  }
}

export default Logout;
