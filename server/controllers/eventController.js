const Event = require('../models/Event');

const isAdmin = (user) => {
	return (user.email === 'admin@admin.com');
}

// Create new event
exports.createEvent = async (req, res) => {
	try {
		// const event = new Event(req.body);
		// await event.save();

		const { title, description, date, location } = req.body;
		const createdBy = req.user.userId;

		const event = await Event.create({ title, description, date, location, createdBy });
		console.log(event);
		res.status(201).json(event);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get all events
exports.getEvents = async (req, res) => {
	try {
		const events = await Event.find().populate('createdBy', 'username');
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
		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(404).json({ message: 'Event not found' });
		}
		if ((event.createdBy.toString() !== req.user.userId) && !isAdmin(req.user)) {
			return res.status(403).json({ message: 'Not authorized to edit this event' });
		}

		event.title = req.body.title;
		event.description = req.body.description;
		event.date = req.body.date;
		event.location = req.body.location;

		await event.save();
		res.json(event);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Delete event by ID
exports.deleteEvent = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(404).json({ message: 'Event not found' });
		}

		if ((event.createdBy.toString() !== req.user.userId) && !isAdmin(req.user)) {
			return res.status(403).json({ message: 'Not authorized to delete this event' });

		}

		await event.deleteOne();
		res.json({ message: 'Event deleted' });
	} catch (err) {
		console.error('Delete event error:', err)
		res.status(500).json({ message: err.message });
	}
};
