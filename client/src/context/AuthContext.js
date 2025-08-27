import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create Context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	// Sets current user details in local storage
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem('user');
		return savedUser ? JSON.parse(savedUser) : null;
	});

	// Sets token value
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// If token is present, extract logged in user details
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			const savedUser = localStorage.getItem('user');
			setUser(savedUser ? JSON.parse(savedUser) : null);
		} else {
			setUser(null);
		}
		setLoading(false);
	}, [token]);

	// Login method
	const login = (token, userData) => {
		// Sets the token value and logged in user
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(userData));
		setToken(token);
		setUser(userData);
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		navigate('/');
	};

	// Logout Method
	const logout = () => {
		// Deletes the token and clears the logged in user data 
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setToken('');
		setUser(null);
		delete axios.defaults.headers.common['Authorization'];
		navigate('/');
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};