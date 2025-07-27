import app from "./app";
import { PORT } from "./config/env";
import dbConnect from "./config/dbConnect";

const Initalize = async () => {
	await dbConnect();
	app.listen(PORT, () => {
		console.log(`> Server is initalize At http://localhost:${PORT}`);
	});
};

Initalize();