// dbConnect.ts
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

const Connect = async () => {
	try {
		console.log("> Connecting To The Database...");
		await mongoose.connect(MONGO_URL);
		console.log("> Database is successfully Connected.");
	} catch (e) {
		console.error(`Error : ${e}`);
		process.exit(1);
	}
}

export default Connect;