// src/services/auth.service.ts
import User from "../models/user.model";
import { comparePassword } from "../utils/password";

interface RegisterInput {
	name: string;
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

	return {
		id: newUser._id,
		name: newUser.name,
		email: newUser.email,
	};
};
