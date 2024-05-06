const User = require("../models/userModel");
const catchAync = require("../utils/catchAysnc");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signUp = async (req, res, next) => {
	try {
		console.log("posted");
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		const savedUser = await newUser.save();
		console.log(savedUser);
		res.status(200).json({ status: "sucess", data: savedUser });
	} catch (error) {
		next(error);
	}
};

const signIn = catchAync(async (req, res, next) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return next(new appError("User not found", 404));
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return next(new appError("Invalid email or password", 404));
	}
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
	res.status(200).json({
		status: "sucess",
		token: token,
	});
});

module.exports = {
	signUp,
	signIn,
};
