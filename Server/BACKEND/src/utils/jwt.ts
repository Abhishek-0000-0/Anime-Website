import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../config/env";

export const createToken = (user_id: string): string => {
	return jwt.sign({ user_id }, JWT_SECRET, {
		expiresIn: "15m",
	});
};

export const verifyToken = (token: string): {user_id: string} => {
	try {
		return jwt.verify(token, JWT_SECRET) as { user_id: string};
	} catch (error) {
		throw new Error("Invalid or Expire Token.");
	}
}

export const createRefreshToken = (user_id: string): string => {
	return jwt.sign({ user_id }, JWT_REFRESH_SECRET, {
		expiresIn: "15m",
	});
};

export const verifyRefreshToken = (token: string): {user_id: string} => {
	try {
		return jwt.verify(token, JWT_REFRESH_SECRET) as { user_id: string};
	} catch (error) {
		throw new Error("Invalid or Expire Refresh Token.");
	}
}