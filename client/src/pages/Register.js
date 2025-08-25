import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		const check = document.getElementById('check');
		check.checked = false;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await axios.post('http://localhost:8080/api/auth/register', formData);
			navigate('/login');
		} catch (err) {
			setError(err.response?.data?.message || 'Registration failed');
		}
	};

	const togglePasswordVisibility = () => {
		const passwordInput = document.getElementById('pass');
		if (passwordInput.type === 'password') {
			passwordInput.type = 'text';
		} else {
			passwordInput.type = 'password';
		}
	};

	return (

		<div className="register-container">
			<h1>Sign Up</h1>
			{error && <p className="error-msg">{error}</p>}
			<form onSubmit={handleSubmit}>

				<input name='username' value={formData.username} onChange={handleChange} required autoFocus placeholder='Username' style={{ width: "100%" }} />

				<input name='email' value={formData.email} onChange={handleChange} required placeholder='Email' style={{ width: "100%" }} />

				<input name='password' type="password" id='pass' value={formData.password} onChange={handleChange} required placeholder='Password' style={{ width: '100%' }} />

				<label htmlFor="check" className="flex-label" style = {{width: '40%'}}>
					<input type="checkbox" id="check" onClick={togglePasswordVisibility} />
					<span>Show Password</span>
				</label>



				<p>
					Already have an account ? <Link to="/login" style={{ fontWeight: '500', textDecoration: 'underline', color: '#fff' }}>Login here</Link>
				</p>
				<button type='submit'>Register</button>
			</form>

		</div>
	);
};

export default Register;