import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditEvent.css';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
    });

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/${id}`);
                const { title, description, date, location } = response.data;
                setEvent(response.data);
                setFormData({
                    title,
                    description,
                    date: date ? date.split('T')[0] : '',
                    location,
                });
            } catch (err) {
                setError('You are not authorized to edit this event.');
                console.error('Error fetching event:', err);
            }
        };
        fetchEvent();
    }, [id]);

    if (error) {
        return <>
            <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <button onClick={() => {navigate('/events')}} style={{ backgroundColor: 'red', color: 'white', marginTop: "1rem", padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>Go back</button>
            </div>
        </> 
    }

    if (!event) {
        return <div>Loading...</div>;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/events/${id}`, formData);
            navigate('/events');
        } catch (err) {
            console.error('Error updating event:', err);
        }
    };

    return (
        // { ? () : ()}
        <div className='edit-container'>
            <h1>Edit Event</h1>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input name="title" value={formData.title} style={{ width: "100%" }} onChange={handleChange} required />

                <label>Description:</label>
                <textarea name="description" value={formData.description} style={{ width: "100%" }} onChange={handleChange} />

                <label>Date:</label>
                <input type="date" name="date" value={formData.date} style={{ width: "100%" }} onChange={handleChange} />

                <label>Location:</label>
                <input name="location" value={formData.location} style={{ width: "100%" }} onChange={handleChange} />

                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditEvent;
