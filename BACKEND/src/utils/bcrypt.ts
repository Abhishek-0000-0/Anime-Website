import bcrypt from "bcrypt";

export const hashings = async (value: string, salt?: number) => 
	bcrypt.hash(value, number || 10);


export const compare = async (value: string, hashValue: string) => {
	bcrypt.compare(value, hashValue).catch(() => false);