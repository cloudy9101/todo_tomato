import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './authenticate';

export const AuthenticatedRoute = ({
  component: Component,
  exact,
  path,
}) => (
  <Route
    exact={exact}
    path={path}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
)
