const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "";

// Middleware for authenticating the user before accessing private routes
const authMiddleware = async (req, res, next) => {
	// Extracting Payload from JWT token
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'Authorization token required' });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(decoded.userId);
		if (!user) {
			return res.status(401).json({ message: 'User not found' })
		}
		req.user = {
			userId: user._id.toString(),
			email: user.email
		};
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};

module.exports = authMiddleware;