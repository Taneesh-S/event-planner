import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <aside className="app-sidebar">
            <nav>
                {user ? (
                    <>
                        <Link to="/events">Events</Link>
                        <Link to="/create">Create Event</Link>
                        {/* Add more links as needed */}
                    </>
                ) : (
                    <p>Please log in to see options</p>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;
