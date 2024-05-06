const express = require("express");
const app = express();
const userRouter = require("../routes/userRoutes");
const globalError = require("../controllers/errorController");
const AppError = require("../utils/appError");
const morgan = require("morgan");
//middle
app.use(morgan("dev"));
app.use(express.json());

//routes
app.use("/api/v1/users", userRouter);
app.all("*", (req, res, next) => {
	console.log(req.originalUrl);
	next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

//error handling
app.use(globalError);

module.exports = app;
