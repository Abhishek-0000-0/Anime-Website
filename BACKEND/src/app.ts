import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "",
		credentials: true
	})
);

export default app;