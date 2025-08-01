import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export interface CustomError extends Error {
  statusCode?: number;
}

const formatZodError = (error: ZodError) => {
  return error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
};

const errorHandler = (
  err: CustomError | ZodError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    const formattedErrors = formatZodError(err);
    console.error("[Zod Validation Error]:", formattedErrors);

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  const statusCode = (err as CustomError).statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error("[Error]:", message);

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
