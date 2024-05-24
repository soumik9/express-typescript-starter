import { Application } from "express";
import { Server } from 'http';
import connectToDatabase from "./connectToDatabase";
import config from "./config";
import { logger } from "../helpers/logger";

// server related works
process.on('uncaughtException', (error) => {
    logger.log("error", `Error uncaught exception server: ${error.message}`);
    process.exit(1);
});

// server listener
const bootstrap = async (app: Application) => {
    let server: Server;

    try {
        // server listen
        server = app.listen(process.env.PORT, () => {
            logger.log("info", `Listening on port http://localhost:${config.PORT}/api/sass/v1`);

            // connect database after server started
            connectToDatabase()
        });
    } catch (error) {
        logger.log("error", `Error creating server: ${error instanceof Error ? error.message : 'unknown'}`);
        process.exit(1);
    }
}

export default bootstrap;