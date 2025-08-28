const PORT = process.env.PORT || 8080;
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initializing routes for navigating throughout the website
const eventRoutes = require('./routes/eventRoutes');

// Initializing middleware for authenticating the user
const authMiddleware = require('./middleware/authMiddleware');

app.use('/api/events', authMiddleware, eventRoutes);

// Initializing routes for Login & Register pages
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(`${process.env.MONGO_URI}/gather&go`, {})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST']
	}
});

// List of users who are connected by Socket.io
let users = [];

// When connection is established
io.on('connection', (socket) => {

	// When user joins the chat
	socket.on('join', (username) => {
		if (!users.find(u => u.socketId === socket.id)) {
			users.push({ socketId: socket.id, username });
		}
		io.emit('users', users);
		socket.broadcast.emit('notify', `${username} has joined the chat`);
	});

	// When user leaves the chat
	socket.on('leave', () => {
		const user = users.find(u => u.socketId === socket.id);
		if (user) {
			users = users.filter(u => u.socketId !== socket.id);
			io.emit('users', users);
			socket.broadcast.emit('notify', `${user.username} has left the chat`);
		}
		socket.disconnect();
	});

	// When user sends a message
	socket.on('sendMessage', ({ username, message }) => {
		io.emit('message', { username, message });
	});

	// When user disconnectes from Socket.io
	socket.on('disconnect', () => {
		const user = users.find(u => u.socketId === socket.id);
		if (user) {
			users = users.filter(u => u.socketId !== socket.id);
			io.emit('users', users);
			socket.broadcast.emit('notify', `${user.username} has disconnected`);
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});