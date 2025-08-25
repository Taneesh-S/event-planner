const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "";

exports.register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const existingUser = await User.findOne({ $or: [{ email }, { username }] });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const user = await User.create({ username, email, password });
		console.log(user);

		return res.status(201).json({ message: 'User registered successfully' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ userId: user._id, userEmail: user.email }, JWT_SECRET, { expiresIn: '1d' });
		res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
