import { Request, RequestHandler, Response } from "express";
import { Organizer, Business, OrganizerRole } from "../models";
import ApiError from "../../utils/errors/ApiError";
import httpStatus from "http-status";
import { ENUM_ROLE } from "../../utils/enums/rolePermissionEnum";
import { catchAsync, sendResponse } from "../../utils/helpers/global";
import { mailTeamplates, sendMail } from "../../utils/helpers/email";
import { pick } from "../../utils/helpers/transforms";
import { config } from "../../utils/server";
import { IOrganizerRole } from "../interfaces/IOrganizerRole";

// filering and searhing constant
export const organizerFilterableFields = ['isEmailVerified'];

// create new organizer to a business controller
const CreateNewOrganizerToSentInviteToAddUnderBusiness: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        // geting business id from token
        const businessId = req.user?.business;

        // parsing data
        const organizerData = req.body && req.body.data ? JSON.parse(req.body.data) : {};

        // check organizer profile exists with any business by email
        const findOrgnizer = await Organizer.isOrganizerExistsByEmail(organizerData.email);
        if (findOrgnizer)
            throw new ApiError(httpStatus.NOT_FOUND, 'Already an employee of a business profile!');

        // check the role is under requester business
        const findOrganizerRoleUnderBusiness = await OrganizerRole.isRoleUnderABusinessExists(organizerData.role, businessId);
        if (!findOrganizerRoleUnderBusiness)
            throw new ApiError(httpStatus.NOT_FOUND, 'Invalid role under your business!');

        // saving role info
        const data = await Organizer.create({ ...organizerData, business: businessId });

        if (data._id) {
            // push new organizer id to business orgaizers
            await Business.pushOrganizerIdToBusinessOrganizers(businessId, String(data._id));

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

        const businessId = req?.user?.business;

        // filter data pick
        const andConditions = [];
        andConditions.push({ business: businessId }); // Add the business condition
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
        const total = await Organizer.find({ business: businessId }).countDocuments();

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

        const businessId = req.user?.business;
        const organizerId = req.params.organizerId;
        const data = await Organizer.findOne({ _id: organizerId, business: businessId }).select("-twoFactor -password");

        // check requester business id is organizer business profile
        if (String(data?.business) !== String(businessId))
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not in authorized get organizer profile.');

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
        const businessId = req.user?.business;
        const organizerId = req.params.organizerId;
        const parsedData = req.body && req.body.data ? JSON.parse(req.body.data) : {};
        const { isEmailVerified, password, confirmPassword, ...body } = parsedData;

        // Check if a organizer exists or not
        const existsOrganizer = await Organizer.isOrganizerExistsById(organizerId, "_id business");
        if (!existsOrganizer)
            throw new ApiError(httpStatus.BAD_REQUEST, 'Organizer not found.');

        // check requester business id is organizer business profile
        if (String(existsOrganizer.business) !== String(businessId))
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not in authorized business profile.');

        // updating role info
        const data = await Organizer.findOneAndUpdate({ _id: organizerId, business: businessId }, {
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

        const businessId = req.user?.business;
        const organizerId = req.params.organizerId;

        // Check if a organizer exists or not
        const existsOrganizer = await Organizer.isOrganizerExistsById(organizerId, "_id business");
        if (!existsOrganizer)
            throw new ApiError(httpStatus.BAD_REQUEST, 'Organizer not found.');

        // check requester business id is organizer business profile
        if (String(existsOrganizer.business) !== String(businessId))
            throw new ApiError(httpStatus.BAD_REQUEST, 'You are not in authorized business profile.');

        // checking is requester can't delete super owner
        if (existsOrganizer.role && typeof existsOrganizer.role === 'object') {
            const role = existsOrganizer.role as Partial<IOrganizerRole>;
            if (role.name === ENUM_ROLE.SUPER_OWNER)
                throw new ApiError(httpStatus.BAD_REQUEST, 'You are not allowed to delete business super-owner.');
        }

        // checking is requester super-owner to delete
        if (existsOrganizer.role && typeof existsOrganizer.role === 'object') {
            const role = existsOrganizer.role as Partial<IOrganizerRole>;
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