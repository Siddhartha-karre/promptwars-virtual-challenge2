import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  // Authentication check removed as requested
  // Everyone can access the content without logging in
  return children;
};

export default ProtectedRoute;
