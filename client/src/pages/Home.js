import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const { user } = useAuth();

    return (
        <>
            {!user ? (

                <div className="home-container">
                    <h1>Welcome to EventPlanner</h1>
                    <p>Please login or sign up to continue.</p>
                </div>

            ) : (

                <div className="home-container">
                    <h1>Welcome to EventPlanner</h1>
                </div>
            )}
        </>
    );
};

export default Home;
