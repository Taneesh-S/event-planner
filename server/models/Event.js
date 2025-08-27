const mongoose = require('mongoose');

// Creating the schema (Structure) for creating events
const eventSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		maxLength: 50
	},
	date: {
		type: Date,
		required: true
	},
	location: String,
	createdBy: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Event', eventSchema);