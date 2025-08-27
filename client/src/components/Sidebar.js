import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './css/Sidebar.css';

// Sidebar Component
const Sidebar = () => {
	const { user } = useAuth();

	return (
		<aside className="app-sidebar">
			<nav>
				{/* Show navigation options only if an user has logged in */}
				{user ? (
					<>
						<Link to="/events">Events</Link>
						<Link to="/create">Create Event</Link>
						<Link to="/chat">Chat</Link>
					</>
				) : (
					<p>Please log in to see options</p>
				)}
			</nav>
		</aside>
	);
};

export default Sidebar;