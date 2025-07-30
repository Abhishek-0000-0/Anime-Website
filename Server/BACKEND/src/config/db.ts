// ./Server/BACKEND/src/config/db.ts
import mongoose from "mongoose";
import { DB_URI } from "./env";

const connectDB = async () => {
	try {
		await mongoose.connect(DB_URI);
		console.log("> Database Successfully Connected.");
	} catch (error) {
		console.error("> Error Occured To Connecting To Database : " + error);
		process.exit(1);
	}
};

export default connectDB;