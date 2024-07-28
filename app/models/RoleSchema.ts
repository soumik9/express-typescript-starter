import { Schema, model } from "mongoose";
import { IRole, IRoleDocument, IRoleModel } from "../interfaces/IRole";
import moment from "moment";

const RoleSchema = new Schema<IRoleDocument>({
    name: {
        type: String,
        lowercase: true,
        required: [true, 'Organizer Role name is required'],
        // enum: {
        //     values: RoleEnumValues,
        //     message: `Role name value can not be {VALUE}, must be ${RoleEnumValues}`
        // },
    },
    permissions: {
        type: [String],
        validate: {
            validator: function (permissions: string[]) {
                // Check if all permissions are included in the ENUM_PERMISSION_NAMES enum
                // return permissions.every((permission: any) => Object.values(ENUM_PERMISSION_NAMES).includes(permission));
            },
            message: ({ value }) => `${value} is not a valid permission.`
        }
    },
    createdAt: {
        type: Number,
        default: () => moment().unix(),
    },
    updatedAt: {
        type: Number,
        default: () => moment().unix(),
    },
});

// checking is organizer found with the id
RoleSchema.statics.isRoleExists = async function (roleId: string): Promise<IRole | null> {
    const role = await this.findOne({ _id: roleId }).lean();
    return role;
}

const Role = model<IRoleDocument, IRoleModel>("Role", RoleSchema);
export default Role;