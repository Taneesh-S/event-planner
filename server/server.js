const PORT = process.env.PORT || 8080;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const eventRoutes = require('./routes/eventRoutes');
const authMiddleware = require('./middleware/authMiddleware');
app.use('/api/events', authMiddleware, eventRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(`${process.env.MONGO_URI}/eventplanner`, {})
	.then(() => {
		console.log('MongoDB connected')
	}).catch((err) => {
		console.log(err)
	});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});