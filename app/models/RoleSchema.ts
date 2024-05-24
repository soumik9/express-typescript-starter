import { Schema, model } from "mongoose";
import { ENUM_PERMISSION_NAMES, RoleEnumValues } from "../../utils/enums/rolePermissionEnum";
import { covertTimestamp } from "../../utils/helpers/transforms";
import { IRole, IRoleDocument, IRoleModel } from "../interfaces/IRole";

const RoleSchema = new Schema<IRoleDocument>({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Organizer Role name is required'],
        enum: {
            values: RoleEnumValues,
            message: `Role name value can not be {VALUE}, must be ${RoleEnumValues}`
        },
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

// checking is organizer found with the id
RoleSchema.statics.isRoleExists = async function (roleId: string): Promise<IRole | null> {
    const role = await this.findOne({ _id: roleId }).lean();
    return role;
}

const Role = model<IRoleDocument, IRoleModel>("Role", RoleSchema);
export default Role;