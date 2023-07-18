import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles: any;
  userRole: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, userRole, element }) => {
  const isAuthorized = allowedRoles.includes(userRole);

  return isAuthorized ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
