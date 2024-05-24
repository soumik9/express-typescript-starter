import express, { Application } from "express";
import cors from 'cors'
import helmet from "helmet";
// import xss from 'xss-clean' // types missing
import sanitize from 'express-mongo-sanitize'
import upload from "../multer/configMulter";

const globalMiddleware = (app: Application) => {

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(sanitize());
    // app.use(xss());
    app.use(helmet());

    // multer configure
    app.use(
        upload.fields([
            { name: "single", maxCount: 1 },
            { name: "multiple", maxCount: 10 },
        ])
    );
}

export default globalMiddleware;