import { Router } from "express";
import { Sign_Up, Sign_In, Logout } from "../controllers/auth.controller";

const auth = Router();

auth.post("/signup", Sign_Up);
auth.post("/signin", Sign_In);
auth.post("/logout", Logout)

export default auth;