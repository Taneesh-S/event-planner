import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/css/EventList.css';

const EventList = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [events, setEvents] = useState([]);

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			const response = await axios.get('http://localhost:8080/api/events');
			setEvents(response.data);
		} catch (err) {
			console.error('Error fetching events :', err);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/events/${id}`);
			fetchEvents();
		} catch (error) {
			console.error('Error deleting event :', error);
		}
	};

	const formatDateToDDMMYYYY = (date) => {
		const d = date.getDate().toString().padStart(2, '0');
		const m = (date.getMonth() + 1).toString().padStart(2, '0');
		const y = date.getFullYear();
		return `${d}/${m}/${y}`;
	}

	return (

		<div className='event-list-container'>
			<table className='event-table'>
				<thead>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Date</th>
						<th>Location</th>
						<th>Created By</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{events.map(event => {
						const loggedInUserId = user?.id;
						const loggedInUsername = user?.username;
						const eventCreatorId = event.createdBy?._id;

						let canDelete = eventCreatorId && loggedInUserId && eventCreatorId.toString() === loggedInUserId.toString();
						let canEdit = canDelete;

						if (loggedInUsername === 'Admin') {
							canDelete = true;
							canEdit = true;
						}

						return (
							<tr key={event._id}>
								<td>{event.title}</td>
								<td>{event.description}</td>
								<td>{formatDateToDDMMYYYY(new Date(event.date))}</td>
								<td>{event.location}</td>
								{/* <td>{event.createdBy?.username || 'Unknown'}</td> */}
								<td>{(event.createdBy?.username === 'Admin') ? (
									<span style={{ color: 'green', fontWeight: '700'}}>Admin</span>
								) : (
									<span>{event.createdBy?.username || 'Unknown'}</span>
								)}</td>
								<td>
									{canEdit ? (
										<button onClick={() => navigate(`/edit/${event._id}`)} className="edit-btn">Edit</button>
									) : (
										<span style={{ display: "inline-block", width: '72px' }}></span>
									)}
									{canDelete ? (
										<button onClick={() => handleDelete(event._id)} className="delete-btn">Delete</button>
									) : (
										<span style={{ display: "inline-block", width: '72px' }}></span>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default EventList;