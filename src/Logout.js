import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Api from './Api';
import { unauthenticate } from './authenticate';

function Logout(props) {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    Api.logout(data => {
      console.log('logout');
      unauthenticate();
      setAuth(false);
    });
  }, []);

  if (auth) { return (<div></div>); }

  return(
    <div>
      <Redirect to="/signin" />
    </div>
  )
}

export default Logout;
