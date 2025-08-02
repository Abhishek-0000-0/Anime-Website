// src/services/auth.service.ts
import User from "../models/user.model";
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

export const Register = async (data: RegisterInput) => {
	const { name, email, password } = data;

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

export const Login = async (data: LoginInput) => {
	const { email, password } = data;

	const user = await User.findOne({ email });
	if(!user || (await !comparePassword(password, user.password))) {
		const error = new Error("Invalid credentials");
		(error as any).statusCode = 401;
		throw error;
	}

	const accessToken = createToken(user._id.toString());
	const refreshToken = createRefreshToken(user._id.toString());

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