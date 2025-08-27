import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../pages/css/Home.css';

// Home Page
const Home = () => {
    const { user } = useAuth();

    return (
        <>
            {!user ? (
                // If not Logged In
                <div className="home-container">
                    <h1>Welcome to EventPlanner</h1>
                    <p>Please login or sign up to continue.</p>
                </div>

            ) : (
                // If logged in
                <div className="home-container">
                    <h1>Welcome to EventPlanner</h1>
                </div>

            )}
        </>
    );
};

export default Home;