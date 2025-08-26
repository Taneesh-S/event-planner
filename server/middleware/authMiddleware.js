const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "";

const authMiddleware = async (req, res, next) => {
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