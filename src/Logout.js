import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Api from './Api';

function Logout(props) {
  useEffect(() => {
    Api.logout(data => {
      console.log('logout');
    });
  }, []);

  return(
    <div>
      <Redirect to="/signin" />
    </div>
  )
}

export default Logout;
