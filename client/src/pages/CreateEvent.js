import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/css/CreateEvent.css';

// Create Event Method
const CreateEvent = () => {
	const { user } = useAuth();

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		date: '',
		location: '',
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const eventData = {
				...formData,
				createdBy: user.userId
			}
			await axios.post('http://localhost:8080/api/events', eventData);
			navigate('/events');
		} catch (err) {
			console.error('Error creating event:', err);
		}
	};

	return (
		<div className='create-container'>
			<h1>Create Event</h1>
			<form onSubmit={handleSubmit}>

				<input name="title" value={formData.title} onChange={handleChange} placeholder='Title' style={{ width: "100%" }} required />

				<textarea name="description" value={formData.description} placeholder='Description. Max Length 30 Characters' style={{ width: "100%" }} onChange={handleChange} />

				<input type="text" name="date" value={formData.date} style={{ width: "100%" }} placeholder='DD-MM-YYYY' onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} onChange={handleChange} />

				<input name="location" value={formData.location} placeholder='Location' style={{ width: "100%" }} onChange={handleChange} />

				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default CreateEvent;