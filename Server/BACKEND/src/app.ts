import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to the Anime Website Backend!");
});

export default app;
