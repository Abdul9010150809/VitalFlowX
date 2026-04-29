import { Navigate, Outlet } from 'react-router-dom';
import { STORAGE_KEYS } from '../config/apiConfig';

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE);

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
