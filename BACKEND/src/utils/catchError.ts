import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncFunction = (
	res: Response,
	req: Request,
	next: NextFunction
) => Promise<any>;

const catchError = (handler: AsyncFunction): RequestHandler => {
	return (res, req, next) => {
		return handler(res, req, next).catch(next)
	};
};

export default catchError;