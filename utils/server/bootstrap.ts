import { Application } from "express";
import { Server } from 'http';
import connectToDatabase from "./connectToDatabase";
import config from "./config";
import { errorLogger, infoLogger } from "../helpers/logger/logger";


// server related works
process.on('uncaughtException', (error) => {
    errorLogger.error(`Error uncaught exception server: ${error.message}`);
    process.exit(1);
});

// server listener
const bootstrap = async (app: Application) => {
    let server: Server;

    try {
        // server listen
        server = app.listen(process.env.PORT, () => {
            infoLogger.info(`Listening on port http://localhost:${config.PORT}/api/v1`);

            // connect database after server started
            connectToDatabase()
        });
    } catch (error) {
        errorLogger.error(`Error creating server: ${error instanceof Error ? error.message : 'unknown'}`);
        process.exit(1);
    }
}

export default bootstrap;