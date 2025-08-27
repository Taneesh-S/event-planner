import React from 'react';
import { Navigate } from 'react-router-dom';

// Private Routing
const PrivateRoute = ({ children }) => {
	// Get JWT
	const token = localStorage.getItem('token');

	// Navigate to login page if user tries to access any page without logging in
	if (!token) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default PrivateRoute;