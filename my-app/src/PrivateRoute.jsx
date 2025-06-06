import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Verifica si hay un token
  console.log('Autenticado:', isAuthenticated); // Depuración
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;