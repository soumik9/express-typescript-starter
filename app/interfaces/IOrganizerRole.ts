import { Model, Types } from "mongoose";
import { ENUM_ROLE } from "../../utils/enums/rolePermissionEnum";
import { ICommonSchema } from "./Common";
import { IBusiness } from "./IBusiness";

// role organizer type
type IOrganizerRoleName = ENUM_ROLE.SUPER_OWNER | ENUM_ROLE.OWNER | ENUM_ROLE.ACCOUNTANT | ENUM_ROLE.MARKETING | ENUM_ROLE.CUSTOMER_SUPPORT;

// role schema interface
export interface IOrganizerRole extends ICommonSchema {
    name: IOrganizerRoleName;
    business: string | Types.ObjectId | IBusiness;
    permissions: string[];
}

// organizer schema methods
export interface IOrganizerRoleModel extends Model<IOrganizerRole> {
    findSuperOwnerUnderABusiness(businessId: string): Promise<IOrganizerRole | null>;
    isRoleUnderABusinessExists(roleId: string, businessId: string): Promise<IOrganizerRole | null>;
}

export interface IOrganizerRoleDocument extends IOrganizerRole, Document { }