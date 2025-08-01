// src/schemas/auth.schema.ts
import { z } from "zod";

export const registerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters").max(20, "Name must be at most 20 characters"),
	email: z.string().email("Invalid email format"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.max(100, "Password is too long"),
});
