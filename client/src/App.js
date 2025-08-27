import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './pages/Chat';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventList from './pages/EventList';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';

import PrivateRoute from './components/PrivateRoute';

import { ChatProvider } from './context/ChatContext';
import { useAuth } from './context/AuthContext';

import './App.css';

function App() {
	const { user } = useAuth();

	return (
		<>
			<Header />
			<Sidebar />
			<ChatProvider user={user}>

				<div className="main-content">
					<Routes>
						<Route path="/" element={<Home />} />

						{/* Public Routes */}
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />

						{/* Protected Routes */}
						<Route path="/events" element={<PrivateRoute><EventList /></PrivateRoute>} />
						<Route path="/create" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
						<Route path="/edit/:id" element={<PrivateRoute><EditEvent /></PrivateRoute>} />
						<Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
					</Routes>
				</div >
			</ChatProvider>
		</>
	);
}

export default App;