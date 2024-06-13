import { NextFunction, Request, Response } from "express";
import logger from "./logger";
import getRequestUrl from "../global/getRequestUrl";
import moment from "moment";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req;
    const startTime = moment();

    res.on('finish', () => {
        const endTime = moment();
        const duration = endTime.diff(startTime);
        const formattedDuration = moment.duration(duration).asMilliseconds();
        const message = `${method} ${getRequestUrl.getRequestFulllUrl(req) + url} ${res.statusCode} - ${formattedDuration}ms`;
        logger.log("http", message);
    });

    next();
};

export default requestLogger;