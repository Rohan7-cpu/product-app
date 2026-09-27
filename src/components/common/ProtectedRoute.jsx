import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';

export const ProtectedRoute = ({ children }) => {
  const { user } = useProductStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
