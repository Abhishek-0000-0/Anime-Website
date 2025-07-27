import { Request, Response } from "express";
import catchError from "../utils/catchError";
import * as AuthService from "../services/auth.service";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

export const register = catchError(async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const user = await AuthService.registerUser(data);
  res.status(201).json({ success: true, user });
});

export const login = catchError(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);
  const tokens = await AuthService.loginUser(data);
  res.status(200).json({ success: true, ...tokens });
});
