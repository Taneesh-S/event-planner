import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Login.css';

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
					Don't have an account? <Link to="/register" style={{ fontWeight: "500", textDecoration: "underline", color: "#fff" }}>Register here</Link>
				</p>
				<button type="submit">Login</button>
			</form>

		</div>
	);
};

export default Login;















// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../context/AuthContext';
// import './Login.css';
// import user_icon from '../components/assests/person.png';
// import email_icon from '../components/assests/email.png';
// import password_icon from '../components/assests/password.png';

// const Login = () => {
// 	const { login } = useAuth();
// 	const [formData, setFormData] = useState({ email: '', password: '' });
// 	const [error, setError] = useState('');
// 	const navigate = useNavigate();

// 	const handleChange = e => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};

// 	const handleSubmit = async e => {
// 		e.preventDefault();
// 		setError('');
// 		try {
// 			const res = await axios.post('http://localhost:8080/api/auth/login', formData);
// 			// Use context login function to store token and update auth state
// 			login(res.data.token);
// 			navigate('/');
// 		} catch (err) {
// 			setError(err.response?.data?.message || 'Login failed');
// 		}
// 	};

// 	return (
// 		// <div className='login-parent'>
// 		// 	<div className='login-container'>
// 		// 		<h1>Login</h1>
// 		// 		{error && <p style={{ color: 'red' }}>{error}</p>}
// 		// 		<form onSubmit={handleSubmit}>
// 		// 			<label>Username or Email:</label>
// 		// 			<input
// 		// 				name="email"
// 		// 				value={formData.email}
// 		// 				onChange={handleChange}
// 		// 				required
// 		// 			/>
// 		// 			<label>Password:</label>
// 		// 			<input
// 		// 				name="password"
// 		// 				type="password"
// 		// 				value={formData.password}
// 		// 				onChange={handleChange}
// 		// 				required
// 		// 			/>
// 		// 			<button type="submit">Login</button>
// 		// 		</form>
// 		// 		<p>
// 		// 			Don't have an account?{' '}
// 		// 			<Link to="/register">Register here</Link>
// 		// 		</p>
// 		// 	</div>
// 		// </div>

// 		<div className='container'>
// 			<div className='header'>
// 				<div className='text'>Login</div>
// 				<div className='underline'></div>
// 			</div>
// 			<form onSubmit={handleSubmit}>
// 				{error && <p style={{ color: 'red' }}>{error}</p>}
// 				<div className='inputs'>
// 					<div className='input'>
// 						<img src={email_icon} alt='' />
// 						<input type='text' name='email' value={formData.email} onChange={handleChange} required placeholder='Enter Email' />
// 					</div>
// 					<div className='input'>
// 						<img src={password_icon} alt='' />
// 						<input type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Enter Password' />
// 					</div>
// 				</div>
// 				<div className='register-link'>
// 					<span>New here ?</span> &nbsp; <Link to="/register" style={{ color: `white` }}>Register now</Link>
// 				</div>
// 				<div className='submit-container'>
// 					<div className='submit'><button>Login</button></div>
// 				</div>
// 			</form>
// 		</div>

// 	);
// };

// export default Login;
