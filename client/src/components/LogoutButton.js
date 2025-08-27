import React from 'react';
import { useAuth } from '../context/AuthContext';

// Logout button in header
const LogoutButton = () => {
	const { logout } = useAuth();
	return <button className='btn btn-danger' onClick={logout}>Logout</button>;
};

export default LogoutButton;