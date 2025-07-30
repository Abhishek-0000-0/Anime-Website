// ./Server/BACKEND/src/index.ts
import { PORT } from "./config/env";
import connectDB from "./config/db";
import app from "./app";


const initalizeServer = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log("> Server is Running On http://localhost:" + PORT);
		});
	} catch (error) {
		console.error("> Error Occured In Starting Server : " + error);
		process.exit(1);
	}
}

initalizeServer();