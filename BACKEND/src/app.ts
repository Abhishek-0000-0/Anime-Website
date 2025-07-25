// app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true
  })
);

app.get("/", (req, res, next) => {
  return res.status(200).json({ 
          success: true,
          message: "Server is Running.", 
        });
  }
);

//Auth Routes
import Auth from "./routes/auth.route";

app.use("/api/v9/auth", Auth);

app.use(errorHandler);

export default app;
 