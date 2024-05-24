import { Schema, Types, model } from "mongoose";
import { ENUM_PERMISSION_NAMES, ENUM_ROLE, RoleEnumValues } from "../../utils/enums/rolePermissionEnum";
import { IOrganizerRole, IOrganizerRoleDocument, IOrganizerRoleModel } from "../interfaces/IOrganizerRole";
import { covertTimestamp } from "../../utils/helpers/transforms";

const RoleSchema = new Schema<IOrganizerRoleDocument>({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Organizer Role name is required'],
        enum: {
            values: RoleEnumValues,
            message: `Role name value can not be {VALUE}, must be ${RoleEnumValues}`
        },
    },
    business: {
        type: Types.ObjectId,
        ref: "Business",
        required: [true, 'Bussiness Id is required'],
    },
    permissions: {
        type: [String],
        validate: {
            validator: function (permissions: string[]) {
                // Check if all permissions are included in the ENUM_PERMISSION_NAMES enum
                return permissions.every((permission: any) => Object.values(ENUM_PERMISSION_NAMES).includes(permission));
            },
            message: ({ value }) => `${value} is not a valid permission.`
        }
    },
    createdAt: {
        type: Number,
        default: covertTimestamp.currentTimeToUnix()
    },
    updatedAt: {
        type: Number,
        default: covertTimestamp.currentTimeToUnix()
    },
});

RoleSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate() as any;
    update.$set.updatedAt = covertTimestamp.currentTimeToUnix();
    next();
});

// checking is super-owner found under a business
RoleSchema.statics.findSuperOwnerUnderABusiness = async function (businessId: string): Promise<IOrganizerRole | null> {
    const findSuperOwnerUnderABusiness = await this.findOne({ name: ENUM_ROLE.SUPER_OWNER, business: businessId }).lean();
    return findSuperOwnerUnderABusiness;
}

// checking is organizer found with the id
RoleSchema.statics.isRoleUnderABusinessExists = async function (roleId: string, businessId: string): Promise<IOrganizerRole | null> {
    const role = await this.findOne({ _id: roleId, business: businessId }).lean();
    return role;
}

const Role = model<IOrganizerRoleDocument, IOrganizerRoleModel>("Role", RoleSchema);
export default Role;