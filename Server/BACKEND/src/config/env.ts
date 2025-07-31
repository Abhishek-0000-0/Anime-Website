// ./Server/BACKEND/src/config/db.ts
import "dotenv/config";

export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable "${key}" is not set in .env file.`);
  }
  return value;
};

export const PORT = getEnv("PORT");
export const DB_URI = getEnv("DB_URI");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const ORIGIN = getEnv("ORIGIN");