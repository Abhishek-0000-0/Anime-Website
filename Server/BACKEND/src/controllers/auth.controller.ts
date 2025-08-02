import { Request, Response } from "express";

import catchError from "../utils/catchError";
import { setRefreshTokenCookie, clearRefreshTokenCookie } from "../utils/cookie";
import { Register, Login, Logout } from "../services/auth.service";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

export const Sign_Up = catchError(async (req: Request, res: Response) => {
	const data = registerSchema.parse(req.body);
		const device = req.headers["x-device-id"] as string;

	if (!device) {
		throw new Error("Device ID is required");
	}

	const { user, tokens } = await Register(data, req.headers["user-agent"], req.ip, device);

	setRefreshTokenCookie(res, tokens.refreshToken);

	res.status(201).json({
		success: true,
		message: "User registered successfully",
		user,
	});
});

export const Sign_In = catchError(async (req: Request, res: Response) => {
	const data = loginSchema.parse(req.body);
	const device = req.headers["x-device-id"] as string;

	if (!device) {
		throw new Error("Device ID is required");
	}

	const { user, tokens } = await Login(data, req.headers["user-agent"], req.ip, device);

	setRefreshTokenCookie(res, tokens.refreshToken);

	res.status(200).json({
		success: true,
		message: "Logged in successfully",
		user,
		accessToken: tokens.accessToken,
	});
});

export const Logout = catchError(async (req: Request, res: Response) => {
	const token = req.cookies["refreshToken"];

	const result = await Logout(token); // <-- use your service here
	
	clearRefreshTokenCookie(res);

	res.status(200).json({
	success: true,
	message: result.alreadyLoggedOut
		? "Already logged out before"
		: "Logged out successfully"
	});
});