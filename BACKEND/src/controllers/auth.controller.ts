import catchError from "../utils/catchError";
import { registerSchema } from "../schema/auth.types";

export const register = catchError(async (req, res) => {
	const result = registerSchema.safeParse({
		...req.body,
		userAgent: req.headers["user-agent"],
	});

	if (!result.success) {
		throw result.error; // Let the global error handler (ZodError) handle it
	}

	const userData = result.data;

	// Proceed with registration logic here...
	res.status(201).json({ message: "User registered successfully", userData });
});
