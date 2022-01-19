import React from 'react';

import { Route, Navigate, RouteProps } from 'react-router-dom';

import { routes } from 'routes';

// Ok to use any? Investigate further if for some reason this causes issues
interface PropTypes extends RouteProps {
  component: React.ComponentType<any>;
}

/**
 * Private route component, check if user is valid else redirect
 *
 * @param Component
 *  Component to be rendered on the route
 * @param rest
 *  Props passed in
 */
const PrivateRoute: React.FC<PropTypes> = ({
  component: Component,
  ...rest
}) => {
  const user = null;

  return user ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to={routes.auth} />
  );
};

export default PrivateRoute;
