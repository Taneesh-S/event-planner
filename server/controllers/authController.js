const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Initializing secret code from .env file
const JWT_SECRET = process.env.JWT_SECRET || "";

exports.register = async (req, res) => {
	// Extracting data from request
	const { username, email, password } = req.body;
	try {
		// Finding user by email or username as they are unique
		const existingUser = await User.findOne({ $or: [{ email }, { username }] });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		// Create user if not present in DB
		const user = await User.create({ username, email, password });
		console.log(user);

		return res.status(201).json({ message: 'User registered successfully' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.login = async (req, res) => {
	// Extracting data from request
	const { email, password } = req.body;
	try {
		// Finding user by email
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// Verifying input password with DB 
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// Assigning JWT Token
		const token = jwt.sign({ userId: user._id, userEmail: user.email }, JWT_SECRET, { expiresIn: '1d' });
		res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Method to create Admin user on first initialization
async function createAdminUser() {
	// Check if admin creadentials are present in DB
	const existingAdmin = await User.findOne({ email: 'admin@admin.com' });

	if (!existingAdmin) {
		await User.create({
			username: 'Admin',
			email: 'admin@admin.com',
			password: 'Admin.00'
		});
		console.log('Admin user created securely.');
	}
}
createAdminUser();