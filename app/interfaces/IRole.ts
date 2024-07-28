import { Model } from "mongoose";
import { ICommonSchema } from "./Common";


// role schema interface
export interface IRole extends ICommonSchema {
    name: string;
    permissions: string[];
}

// role schema methods
export interface IRoleModel extends Model<IRole> {
    isRoleExists(roleId: string): Promise<IRole | null>;
}

export interface IRoleDocument extends IRole, Document { }