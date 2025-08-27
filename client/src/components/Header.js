import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/Header.css';

const Header = () => {
	const { user, logout } = useAuth();

	return (
		<header className="app-header">
			<div className="logo">
				<Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
					EventPlanner
				</Link>
			</div>
			<nav>
				{!user ? (
					<>
						<Link to="/login" style={{ fontSize: "1.25rem" }}>Login</Link>
						<Link to="/register" style={{ fontSize: "1.25rem" }}>Register</Link>
					</>
				) : (
					<>
						<div className='header-content'>
							<h3 className='content'>Welcome, {user.username}</h3>
							<button onClick={logout} className="logout-btn content">
								Logout
							</button>
						</div>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
