import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
	statusCode?: number;
}

const errorHandler = (
	err: CustomError,
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	console.error(`[Error]: ${message}`);

	res.status(statusCode).json({
		success: false,
		message,
	});
};

export default errorHandler;
