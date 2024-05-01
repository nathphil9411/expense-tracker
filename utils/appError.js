class appErro extends Error {
	constructor(message, statusCode) {
		super(message);

		this.statusCode = statusCode;
		this.status = `${this.status}`.startsWith("4") ? "fail" : "error";
		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}
}
