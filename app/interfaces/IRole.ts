import { Model } from "mongoose";
import { ENUM_ROLE } from "../../utils/enums/rolePermissionEnum";
import { ICommonSchema } from "./Common";

// role type
type IRoleName = ENUM_ROLE.SUPER_OWNER | ENUM_ROLE.OWNER | ENUM_ROLE.ACCOUNTANT | ENUM_ROLE.MARKETING | ENUM_ROLE.CUSTOMER_SUPPORT;

// role schema interface
export interface IRole extends ICommonSchema {
    name: IRoleName;
    permissions: string[];
}

// role schema methods
export interface IRoleModel extends Model<IRole> {
    isRoleExists(roleId: string): Promise<IRole | null>;
}

export interface IRoleDocument extends IRole, Document { }