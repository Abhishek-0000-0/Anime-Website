import bcrypt from "bcrypt";

export const hashPassword = async (value: string, salt?: number) => 
	bcrypt.hash(value, number || 10);


export const comparePassword = async (value: string, hashValue: string) => {
	bcrypt.compare(value, hashValue).catch(() => false);