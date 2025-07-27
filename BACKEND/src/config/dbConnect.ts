import mongoose from "mongoose";

import { DB_URL } from "./env";

const Connect = async () => {
	try {
		await mongoose.connect(DB_URL);
		console.log("Database Connected.");
	} catch (error) {
		console.error("Error Occure To Connecting To Database ", error);
		process.exit(1);
	}
};

export default Connect;