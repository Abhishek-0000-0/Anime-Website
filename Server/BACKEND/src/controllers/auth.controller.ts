import { Request, Response } from "express";

import catchError from "../utils/catchError";
import { setRefreshTokenCookie, clearRefreshTokenCookie } from "../utils/cookie";
import { Register, Login } from "../services/auth.service";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

export const Sign_Up = catchError(async (req: Request, res: Response) => {
	const data = registerSchema.parse(req.body);

	const { user, tokens } = await Register(data);

	setRefreshTokenCookie(res, tokens.refreshToken);

	res.status(201).json({
		success: true,
		message: "User registered successfully",
		user,
	});
});

export const Sign_In = catchError(async (req: Request, res: Response) => {
	const data = loginSchema.parse(req.body);

	const { user, tokens } = await Login(data);

	setRefreshTokenCookie(res, tokens.refreshToken);

	res.status(200).json({
		success: true,
		message: "Logged in successfully",
		user,
		accessToken: tokens.accessToken,
	});
});

export const Logout = catchError(async (req: Request, res: Response) => {
	clearRefreshTokenCookie(res);
	res.status(200).json({ success: true, message: "Logged out successfully" });
});
