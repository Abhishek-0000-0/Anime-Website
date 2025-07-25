import { ZodError } from "zod";
import { Response } from "express";
import { ErrorRequestHandler } from "express";

const zodErrorHandler = (res: Response, error: ZodError) => {
	const errors = error.issues.map((err) => ({
		path: err.path.join("."),
		message: err.message,
	}));
	return res.status(400).json({
		message: "Validation failed",
		errors,
	});
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
	console.error(`PATH : ${req.path} \nMETHOD : ${req.method} \nERROR : ${error.message}`);

	if (error instanceof ZodError) {
		return zodErrorHandler(res, error);
	}

	return res.status(500).json({ message: "Internal Server Error." });
};

export default errorHandler;
