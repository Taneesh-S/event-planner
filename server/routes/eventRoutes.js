const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Declaring which API will be called for the routes
router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;