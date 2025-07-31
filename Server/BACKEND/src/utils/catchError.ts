import { Request, Response, NextFunction } from "express";

const catchError =
	(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
		(req: Request, res: Response, next: NextFunction) => {
			fn(req, res, next).catch(next);
		};

export default catchError;
