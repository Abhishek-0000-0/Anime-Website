import "dotenv/config";

const envVariable = (VARIABLE: string) =>
	return process.env[VARIABLE];


export const PORT = envVariable(PORT);
export const DB_URL = envVariable(DB_URL);
export const ORIGIN = envVariable(ORIGIN);