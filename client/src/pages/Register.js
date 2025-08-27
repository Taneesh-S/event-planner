import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../pages/css/Register.css';

// Register Page
const Register = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	// Form Errors
	const [error, setError] = useState('');
	
	// Validation Errors
	const [errors, setErrors] = useState('');
	
	const navigate = useNavigate();

	const regexUsername = /^[a-zA-Z]+.*\d{2,}$/;
	const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@._\-$#])[A-Za-z\d@._\-$#]{6,}$/;

	// Validation method using RegEx
	const validate = () => {
		const newErrors = {};

		if (!regexUsername.test(formData.username)) {
			newErrors.username = 'Username must have text followed by at least 2 numbers.';
		}

		if (!regexEmail.test(formData.email)) {
			newErrors.email = 'Invalid email format.';
		}

		if (!regexPassword.test(formData.password)) {
			newErrors.password =
				'Password should have : 1 lowercase, 1 uppercase, 1 number, 1 special character, and Length greater than 6.';
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: null });
		const check = document.getElementById('check');
		check.checked = false;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (validate()) {
			// Validation passed - proceed to submit the form and call API
			console.log('Form data is valid:', formData);
			try {
				await axios.post('http://localhost:8080/api/auth/register', formData);
				navigate('/login');
			} catch (err) {
				setError(err.response?.data?.message || 'Registration failed');
			}
		}
	};

	// Toggle password input text between visible and invisible
	const togglePasswordVisibility = () => {
		const passwordInput = document.getElementById('password');
		
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
			<form onSubmit={handleSubmit} noValidate>
				<div>
					<input type='text' name='username' id='username' value={formData.username} onChange={handleChange} required autoFocus placeholder='Username' style={{ width: "100%" }} />
					{errors.username && <p style={{ fontSize: '0.8rem', color: 'red', marginTop: '-0.8rem', paddingLeft: '0.5rem' }}>{errors.username}</p>}
				</div>

				<div>
					<input type='email' name='email' id='email' value={formData.email} onChange={handleChange} required placeholder='Email' style={{ width: "100%" }} />
					{errors.email && <p style={{ fontSize: '0.8rem', color: 'red', marginTop: '-0.8rem', paddingLeft: '0.5rem' }}>{errors.email}</p>}
				</div>

				<div>
					<input name='password' id='password' type="password" value={formData.password} onChange={handleChange} required placeholder='Password' style={{ width: '100%' }} />
					{errors.password && <p style={{ fontSize: '0.8rem', color: 'red', marginTop: '-0.8rem', paddingLeft: '0.5rem' }}>{errors.password}</p>}
				</div>

				<label htmlFor="check" className="flex-label" style={{ width: '40%' }}>
					<input type="checkbox" id="check" onClick={togglePasswordVisibility} />
					<span>Show Password</span>
				</label>

				<p>
					Already have an account ? <Link to="/login" id='link' >Login here</Link>
				</p>
				<button type='submit'>Register</button>
			</form>

		</div>
	);
};

export default Register;