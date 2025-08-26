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

const eventRoutes = require('./routes/eventRoutes');
const authMiddleware = require('./middleware/authMiddleware');

app.use('/api/events', authMiddleware, eventRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

mongoose.connect(`${process.env.MONGO_URI}/eventplanner`, {})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST']
	}
});

let users = [];

io.on('connection', (socket) => {

	socket.on('join', (username) => {
		if (!users.find(u => u.socketId === socket.id)) {
			users.push({ socketId: socket.id, username });
		}
		io.emit('users', users);
		socket.broadcast.emit('notify', `${username} has joined the chat`);
	});

	socket.on('leave', () => {
		const user = users.find(u => u.socketId === socket.id);
		if (user) {
			users = users.filter(u => u.socketId !== socket.id);
			io.emit('users', users);
			socket.broadcast.emit('notify', `${user.username} has left the chat`);
		}
		socket.disconnect();
	});

	socket.on('sendMessage', ({ username, message }) => {
		io.emit('message', { username, message });
	});

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