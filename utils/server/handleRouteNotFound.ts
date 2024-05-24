import { Request, Response } from "express";
import httpStatus from "http-status";

const handleRouteNotFound = (req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
}

export default handleRouteNotFound;