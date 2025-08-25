import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventList from './pages/EventList';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';

import PrivateRoute from './components/PrivateRoute';

import './App.css';

function App() {
	return (
		<>
			<Header />
			<Sidebar />
			<div className="main-content">
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					{/* Protected Routes */}
					<Route path="/events" element={<PrivateRoute><EventList /></PrivateRoute>} />
					<Route path="/create" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
					<Route path="/edit/:id" element={<PrivateRoute><EditEvent /></PrivateRoute>} />
				</Routes>
			</div>
		</>
	);
}

export default App;





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import EventList from './pages/EventList';
// import CreateEvent from './pages/CreateEvent';
// import EditEvent from './pages/EditEvent';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import PrivateRoute from './components/PrivateRoute';

// function App() {
// 	return (
// 		<Routes>
// 			<Route path="/register" element={<Register />} />
// 			<Route path="/login" element={<Login />} />

// 			<Route path="/" element={<PrivateRoute><EventList /></PrivateRoute>} />
// 			<Route path="/create" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
// 			<Route path="/edit/:id" element={<PrivateRoute><EditEvent /></PrivateRoute>} />
// 		</Routes>
// 	);
// }

// export default App;