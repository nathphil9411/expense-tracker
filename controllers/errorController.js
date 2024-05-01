const AppError = require("../utils/appError");
const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}:${err.value}`;
	return new AppError(message, 400);
};
// error from mongodb duplicate title
const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*\1/);
	const message = `duplicate value, ${value}please use another value`;
	return new AppError(message, 400);
};

//validation error handling

const handleJsonWebTokenError = (err) => {
	const message = `Sorry provide a valid token`;
	return new AppError(message, 400);
};
const handleTokenExpiredError = (err) => {
	const message = `oops token expired`;
	return new AppError(message, 401);
};
const devError = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		err: err,
		stack: err.stack,
	});
};
const prodError = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		res.status(err.statusCode).json({
			status: err.status,
			message: "Whoop! something is not right",
		});
	}
};
module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";
	if (process.env.NODE_ENV === "development") {
		devError(err, res);
	} else if (process.env.NODE_ENV === "production") {
		let error = { ...err };
		if (err.name === "CastError") error = handleCastErrorDB(error);
		if (err.code === 11100) error = handleDuplicateFieldsDB(error);
		//if (err.errors.title.name === "ValidatorError")
		//error = handleValidationDB(error);
		if (err.name === "JsonWebTokenError")
			error = handleJsonWebTokenError(error);
		if (err.name === "TokenExpiredError")
			error = handleTokenExpiredError(error);
		prodError(error, res);
	}
};
