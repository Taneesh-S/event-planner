import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem('user');
		return savedUser ? JSON.parse(savedUser) : null;
	});
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			const savedUser = localStorage.getItem('user');
			setUser(savedUser ? JSON.parse(savedUser) : null);
		} else {
			setUser(null);
		}
		setLoading(false);
	}, [token]);

	const login = (token, userData) => {
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(userData));
		setToken(token);
		setUser(userData);
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		navigate('/');
	};

	const logout = () => {
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
