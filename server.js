require("dotenv").config();
const app = require("./config/app");
const dbConnect = require("./config/database");
const PORT = process.env.PORT || 5000;

dbConnect();
app.listen(PORT, () => {
	console.log("connected " + PORT);
});
