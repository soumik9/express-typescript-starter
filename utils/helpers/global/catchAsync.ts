import { NextFunction, Request, RequestHandler, Response } from 'express';
import { errorLogger } from '../logger/logger';

const catchAsync =
    (fn: RequestHandler) =>
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                await fn(req, res, next);
            } catch (error) {
                next(error);
                errorLogger.error(error);
            }
        };

export default catchAsync;