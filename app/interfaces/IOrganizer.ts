import { Model, Types } from "mongoose";
import { ICommonSchema } from "./Common";
import { IRole } from "./IRole";

// organizer interface
export interface IOrganizer extends ICommonSchema {
    name: string;
    surname: string;
    email: string;
    phone: number;
    password: string;
    confirmPassword: string | undefined;
    isEmailVerified: boolean;
    role: string | Types.ObjectId | Partial<IRole>;
}

// organizer schema methods
export interface IOrganizerModel extends Model<IOrganizer> {
    isOrganizerExistsById(organizerId: string, select?: string): Promise<IOrganizer | null>;
    isOrganizerExistsByEmail(email: string, select?: string): Promise<IOrganizer | null>;
}

export interface IOrganizerDocument extends IOrganizer, Document { }