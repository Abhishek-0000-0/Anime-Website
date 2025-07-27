import bcrypt from "bcrypt";

export const hashPassword = async (password: string, salt: int = 10): Promise<string> => {
	const hased = await bcrypt.hash(password, salt);
	return hased;
};

export const comparePassword = async (password: string, hashPassword: string): Promise<boolean> => {
	return await bcrypt.compare(password, hashPassword);
};