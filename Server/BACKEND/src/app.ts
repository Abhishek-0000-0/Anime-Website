// ./Server/BACKEND/src/app.ts
import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.send("<h1>Yoo Hello;</h1>");
});

export default app;