//Index.ts
import "dotenv/config";

import app from "./app";
import Connect from "./config/dbConnect";


const PORT = process.env.PORT;

const Initialize = async () => {
	await Connect();
	app.listen(PORT, () => {
		console.log(`> Server is running on http://localhost:${PORT}/...`);
	});
}

Initialize();