const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DATABASE.replace(
	"<PASSWORD>",
	process.env.DATABASE_PASSWORD
);
const dbConnect = async () => {
	try {
		await mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("connected to db");
	} catch (err) {
		console.log("Sorry you are offline");
	}
};
module.exports = dbConnect;
