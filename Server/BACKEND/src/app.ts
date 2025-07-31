// ./Server/BACKEND/src/app.ts
import cors from "cors";
import express from "express";

import { ORIGIN } from "./config/env";
import errorHandler from "./middleware/error";

import authRoutes from "./routes/auth.route";

const app = express();

app.use(express.json());


app.use(
	cors({
		origin: ORIGIN, 
		credentials: true,
	})
);

app.get("/", (req, res) => {
	res.send("<h1>Hello from backend 👋</h1>");
});

app.use(authRoutes, "/api/v17/auth");

app.use(errorHandler);

export default app;
