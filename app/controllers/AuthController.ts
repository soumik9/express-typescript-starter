import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import ApiError from "../../utils/errors/ApiError";
import { Organizer } from "../models";
import { catchAsync, sendResponse } from "../../utils/helpers/global";
import { compareString } from "../../utils/helpers/bcrypt";
import { generateToken } from "../../utils/helpers/jwt";
import { IOrganizer } from "../interfaces/IOrganizer";

// sass signin controller
const Signin: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // parsing data
        const body = JSON.parse(req.body.data);
        const { email, password: reqPassword } = body;

        // checking email and password given
        if (!email || !reqPassword)
            throw new ApiError(httpStatus.BAD_REQUEST, 'Data not found!');

        // finding user
        const findOrgnizer = await Organizer.isOrganizerExistsByEmail(email);
        if (!findOrgnizer)
            throw new ApiError(httpStatus.NOT_FOUND, 'You are not a registered user!');

        // checking is organizer accepted invitation
        if (!findOrgnizer.isEmailVerified)
            throw new ApiError(httpStatus.NOT_FOUND, 'Accept your invitaion & try again!');

        // checking is valid password
        const isValidPassword = await compareString(reqPassword, findOrgnizer.password);
        if (!isValidPassword)
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Credential mismatch!');

        // generating token
        const token = generateToken(findOrgnizer);

        // user data to send with response
        const { password, ...pwd } = findOrgnizer;

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Login Success!',
            data: {
                accessToken: token as string,
                _id: pwd._id,
                name: pwd.name,
                surname: pwd.surname,
            },
        });
    }
)

// profile of logged User
const Profile: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // finding profile data
        const data = await Organizer.findById(req.user?._id).select("-password").populate("business", "name");

        sendResponse<IOrganizer>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Profile retrieved successfully!',
            data,
        });
    }
)

export default {
    Signin,
    Profile,
};