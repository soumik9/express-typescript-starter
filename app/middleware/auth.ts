import { NextFunction, Request, Response } from "express";
import { Secret } from 'jsonwebtoken'
import ApiError from "../../utils/errors/ApiError";
import httpStatus from "http-status";
import verifyToken from "../../utils/helpers/jwt/verifyToken";
import config from "../../utils/server/config";

export default (...requiredPermissions: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');

        // getting token
        const token = authHeader.split(' ')[1];

        // verify token
        let verifiedUser = null;
        verifiedUser = verifyToken(token, config.TOKEN_SECRET as Secret);
        req.user = verifiedUser; // email, _id, business

        // role diye guard korar jnno
        // if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        //     throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        // }   

        // If any of the required permissions are missing, throw Forbidden error
        if (requiredPermissions.length && !requiredPermissions.every(permission => verifiedUser.permissions.includes(permission))) {
            throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        }

        next();
    } catch (error) {
        next(error);
    }
}