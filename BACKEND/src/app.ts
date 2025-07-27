import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { ORIGIN } from "./config/env";
import ErrorMiddleware from "./middleware/error";
import catchError from "./utils/catchError";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "",
		credentials: true
	})
);

//Auth Routes
import authRoutes from "./routes/auth.route";
app.use("/api/v13/auth", authRoutes);

app.use(ErrorMiddleware)

export default app;