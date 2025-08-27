import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../pages/css/Login.css';

// Login page
const Login = () => {
	const { login } = useAuth();
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		const check = document.getElementById('check');
		check.checked = false;
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		try {
			const res = await axios.post('http://localhost:8080/api/auth/login', formData);
			login(res.data.token, res.data.user);
			navigate('/');
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed');
		}
	};

	// Toggle password input text between visible and invisible
	const togglePasswordVisibility = () => {
		const passwordInput = document.getElementById('pass');
		if (passwordInput.type === 'password') {
			passwordInput.type = 'text';
		} else {
			passwordInput.type = 'password';
		}
	};

	return (
		<div className="login-container">
			<h1>Sign In</h1>
			{error && <p className="error-msg">{error}</p>}
			<form onSubmit={handleSubmit}>

				<input name="email" value={formData.email} onChange={handleChange} required autoFocus placeholder='Email' style={{ width: "100%" }} />

				<input name="password" id='pass' type="password" value={formData.password} onChange={handleChange} required placeholder='Password' style={{ width: "100%" }} />
				<label htmlFor="check" className="flex-label" style={{ width: '40%' }}>
					<input type="checkbox" id="check" onClick={togglePasswordVisibility} />
					<span>Show Password</span>
				</label>

				<p>
					Don't have an account? <Link to="/register" id='link'>Register here</Link>
				</p>
				<button type="submit">Login</button>
			</form>

		</div>
	);
};

export default Login;