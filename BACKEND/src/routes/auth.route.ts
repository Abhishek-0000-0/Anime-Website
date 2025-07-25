//auth.route.ts
import { Router } from "express";
import { register } from "../controllers/auth.controller";

const auth = Router();

auth.post("/register", register);

export default auth;