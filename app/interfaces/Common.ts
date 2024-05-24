import { Types } from "mongoose";

// common schema
export interface ICommonSchema {
    _id?: string | Types.ObjectId;
    createdAt?: number;
    updatedAt?: number;
    __v?: number;
}