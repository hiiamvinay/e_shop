

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
    const { userId } = useAuth();
    // If userId is null, redirect to login
    return userId ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
