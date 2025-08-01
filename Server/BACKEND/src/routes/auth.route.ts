import { Router } from "express";
import { Sign_Up } from "../controllers/auth.controller";

const auth = Router();

auth.post("/signup", Sign_Up);

export default auth;