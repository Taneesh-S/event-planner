const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Creating the schema (Structure) for creating users
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
});

// Hashing Password before saving in DB
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next()
	};
	this.password = await bcrypt.hash(this.password, 10);
	this.email = this.email.toLowerCase();
	next();
});

// Password verification method
userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);