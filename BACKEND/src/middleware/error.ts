import { ZodError } from "zod";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`\nPATH: ${req.path}`);
  console.error(`METHOD: ${req.method}`);
  console.error(`ERROR: ${error.message}\n`);

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message || "Something went wrong.",
  });
};

export default errorHandler;
