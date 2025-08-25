const Event = require('../models/Event');

// Create new event
exports.createEvent = async (req, res) => {
	try {
		// const event = new Event(req.body);
		// await event.save();
		const event = await Event.create(req.body);
		console.log(event);
		res.status(201).json(event);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get all events
exports.getEvents = async (req, res) => {
	try {
		const events = await Event.find();
		res.json(events);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get event by ID
exports.getEventById = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (event == null) {
			return res.status(404).json({ message: 'Event not found' });
		}
		res.json(event);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Update event by ID
exports.updateEvent = async (req, res) => {
	try {
		const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (event == null) {
			return res.status(404).json({ message: 'Event not found' });
		}
		res.json(event);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Delete event by ID
exports.deleteEvent = async (req, res) => {
	try {
		const event = await Event.findByIdAndDelete(req.params.id);
		if (event == null) {
			return res.status(404).json({ message: 'Event not found' });
		}
		res.json({ message: 'Event deleted' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
