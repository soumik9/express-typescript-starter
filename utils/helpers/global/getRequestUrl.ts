import { Request } from "express";

const getRequestFulllUrl = (req: Request) => {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
}

const getRequestBaseUrl = (req: Request) => {
    return req.protocol + '://' + req.get('host');
}

export default {
    getRequestFulllUrl,
    getRequestBaseUrl,
};