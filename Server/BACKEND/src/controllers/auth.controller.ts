import { Request, Response } from "express";
import catchError from "../utils/catchError";
import { Register } from "../services/auth.service";
import { registerSchema } from "../schemas/auth.schema";

export const Sign_Up = catchError(async (req: Request, res: Response) => {
	const data = registerSchema.parse(req.body);

	const user = await Register(data);

	res.status(201).json({
		success: true,
		message: "User registered successfully",
		user,
	});
});
