import User from "../models/user.model";
import { CreateAccountParmas } from "../types/auth.type";

export const createAccount = async (data: CreateAccountParmas) => {
	const existingUser = await User.exists({ email: data.email, });

	if (existingUser) {
		throw new Error("User Already Has Account");
	}

	const user = await User.create({
		name: data.name,
		email: data.email,
		password: data.password
	});
}
