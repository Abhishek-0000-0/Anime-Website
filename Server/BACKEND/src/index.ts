import "dotenv/config";
import app from "./app";
import connectDB from "./config/dbConnect";
import { PORT } from "./config/env";

const Initialize_Server = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};

Initialize_Server();