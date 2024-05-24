import { Request, RequestHandler, Response } from "express";
import { Organizer } from "../models";
import ApiError from "../../utils/errors/ApiError";
import httpStatus from "http-status";
import { ENUM_ROLE } from "../../utils/enums/rolePermissionEnum";
import { catchAsync, sendResponse } from "../../utils/helpers/global";
import { mailTeamplates, sendMail } from "../../utils/helpers/email";
import { pick } from "../../utils/helpers/transforms";
import { config } from "../../utils/server";
import { IRole } from "../interfaces/IRole";

// filering and searhing constant
export const organizerFilterableFields = ['isEmailVerified'];

// create new organizer to a business controller
const CreateNewOrganizerToSentInviteToAddUnderBusiness: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // parsing data
        const organizerData = req.body && req.body.data ? JSON.parse(req.body.data) : {};

        // check organizer profile exists with any business by email
        const findOrgnizer = await Organizer.isOrganizerExistsByEmail(organizerData.email);
        if (findOrgnizer)
            throw new ApiError(httpStatus.NOT_FOUND, 'Already an employee of a business profile!');

        // saving role info
        const data = await Organizer.create({ ...organizerData });

        if (data._id) {
            // email template with invitation link
            const mailTemp = await mailTeamplates.sassInvitationEmailTemp(String(data._id), req);

            // sending invitation
            await sendMail({
                email: organizerData.email,
                subject: String(config.SENDER_EMAIL_ID),
                content: mailTemp,
            })
        }

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Organizer invitation sent successfully!`,
            data,
        });
    }
)

// get all organizers under a business
const GetOrganizersUnderBusiness: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // filter data pick
        const andConditions = [];
        const filtersData = pick(req.query, organizerFilterableFields);

        // if any filterable query make it on object
        if (Object.keys(filtersData).length) {
            andConditions.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value,
                })),
            });
        }

        // finalizing condition & find data
        const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
        const data = await Organizer.find(whereConditions);
        const total = await Organizer.find().countDocuments();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Organizers retrived successfully!`,
            meta: {
                total,
                showingTotal: data.length,
            },
            data,
        });
    }
)

// get single organizer under business
const GetOrganizerById: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const organizerId = req.params.organizerId;
        const data = await Organizer.findOne({ _id: organizerId }).select("-password");

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Organizer retrived successfully!`,
            data,
        });
    }
)

// organizer update under business controller
const UpdateOrganizerUnderBusiness: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // parsing data and params
        const organizerId = req.params.organizerId;
        const parsedData = req.body && req.body.data ? JSON.parse(req.body.data) : {};
        const { isEmailVerified, password, confirmPassword, ...body } = parsedData;

        // Check if a organizer exists or not
        const existsOrganizer = await Organizer.isOrganizerExistsById(organizerId, "_id");
        if (!existsOrganizer)
            throw new ApiError(httpStatus.BAD_REQUEST, 'Organizer not found.');

        // updating role info
        const data = await Organizer.findOneAndUpdate({ _id: organizerId }, {
            $set: body
        }, { new: true, runValidators: true })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Organizer updated successfully!`,
            data,
        });
    }
)

// delete organizer
const DeleteOrganizer: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const organizerId = req.params.organizerId;

        // Check if a organizer exists or not
        const existsOrganizer = await Organizer.isOrganizerExistsById(organizerId, "_id");
        if (!existsOrganizer)
            throw new ApiError(httpStatus.BAD_REQUEST, 'Organizer not found.');

        // checking is requester super-owner to delete
        if (existsOrganizer.role && typeof existsOrganizer.role === 'object') {
            const role = existsOrganizer.role as Partial<IRole>;
            if (role.name !== ENUM_ROLE.SUPER_OWNER)
                throw new ApiError(httpStatus.BAD_REQUEST, 'You are not authorized to delete any organizer.');
        }

        await Organizer.deleteOne({ _id: organizerId })

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Organizer deleted successfully!`,
        });
    }
)

export default {
    CreateNewOrganizerToSentInviteToAddUnderBusiness,
    GetOrganizersUnderBusiness,
    GetOrganizerById,
    UpdateOrganizerUnderBusiness,
    DeleteOrganizer,
};