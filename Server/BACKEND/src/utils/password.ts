import bcrypt from "bcrypt";

export const hashPassword = async (password: string, salt: number = 10): Promise<string> => {
	const hashed = await bcrypt.hash(password, salt);
	return hashed;
};

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
	return bcrypt.compare(password, hashPassword)
};