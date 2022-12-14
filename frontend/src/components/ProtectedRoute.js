
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {
        () => props.logIn ? <Component {...props} /> : <Redirect to='/signin' />
      }
    </Route>
  )
}

export default ProtectedRoute;