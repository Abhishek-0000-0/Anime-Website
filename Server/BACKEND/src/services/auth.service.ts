// src/services/auth.service.ts
import dayjs from "dayjs";

import User from "../models/user.model";
import Session from "../models/session.model";
import { comparePassword } from "../utils/password";
import { createToken, createRefreshToken } from "../utils/jwt"; 

interface RegisterInput {
	name: string;
	email: string;
	password: string;
}

interface LoginInput {
	email: string;
	password: string;
}

export const Register = async (data: RegisterInput, userAgent?: string, ip?: string, device?: string) => {
	const { name, email, password } = data;

	const existingSession = await Session.findOne({ device });
	if (existingSession) {
		const error = new Error("This device is already registered to an account.");
		(error as any).statusCode = 409;
		throw error;
	}

	const exists = await User.findOne({ email });
	if (exists) {
		const error = new Error("User already exists");
		error.statusCode = 409;
		throw error;
	}

	const newUser = await User.create({
		name,
		email,
		password,
	});

	const accessToken = createToken(newUser._id.toString());
	const refreshToken = createRefreshToken(newUser._id.toString());

	await Session.create({
		user: newUser._id,
		refreshToken,
		userAgent,
		ip,
		device,
		expiresAt: dayjs().add(7, "days").toDate(), 
	});

	return {
		user: {
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
		},
		tokens: {
			accessToken,
			refreshToken
		}
	};
};

export const Login = async (data: LoginInput, userAgent?: string, ip?: string, device?: string) => {
	const { email, password } = data;

	const user = await User.findOne({ email });
	if(!user || (await !comparePassword(password, user.password))) {
		const error = new Error("Invalid credentials");
		(error as any).statusCode = 401;
		throw error;
	}

	const existingSession = await Session.findOne({ device });
	if (existingSession && existingSession.user.toString() !== user._id.toString()) {
		const error = new Error("This device is already registered to another user.");
		(error as any).statusCode = 403;
		throw error;
	}

	await Session.updateMany({ user: user._id, device }, { $set: { valid: false } });

	const activeSessions = await Session.find({
		user: user._id,
		valid: true
	}).sort({ createdAt: 1 });

	const MAX_SESSIONS = 5;
	
	if (activeSessions.length >= MAX_SESSIONS) {
		const sessionsToInvalidate = activeSessions.slice(0, activeSessions.length - MAX_SESSIONS + 1);
		await Session.updateMany(
			{ _id: { $in: sessionsToInvalidate.map(s => s._id) } },
			{ $set: { valid: false } }
		);
	}

	const accessToken = createToken(user._id.toString());
	const refreshToken = createRefreshToken(user._id.toString());

	await Session.create({
		user: user._id,
		refreshToken,
		userAgent,
		ip,
		device,
		expiresAt: dayjs().add(7, "days").toDate(), // 7-day session expiry
	});

	return {
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
		},
		tokens: {
			accessToken,
			refreshToken,
		}
	};
};

export const Logout = async (token: string) => {
	const session = await Session.findOne({ refreshToken: token });

	if (!session) {
		const error = new Error("Session not found");
		(error as any).statusCode = 400;
		throw error;
	}

	if (!session.valid) {
		const error = new Error("Session already logged out");
		(error as any).statusCode = 400;
		throw error;
	}

	session.valid = false;
	await session.save();
};
