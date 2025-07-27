import User from "../models/user.model";
import { comparePassword } from "../utils/password";
import jwt from "jsonwebtoken";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";

export const registerUser = async (data: RegisterInput) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new Error("User already exists");
  }

  const user = await User.create(data);
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
};

export const loginUser = async (data: LoginInput) => {
  const user = await User.findOne({ email: data.email });
  if (!user || !(await comparePassword(data.password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};
