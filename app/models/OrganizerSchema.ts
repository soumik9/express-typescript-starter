import { Schema, Types, model } from "mongoose";
import validator from "validator";
import { IOrganizer, IOrganizerDocument, IOrganizerModel } from "../interfaces/IOrganizer";
import { covertTimestamp } from "../../utils/helpers/transforms";

const OrganizerSchema = new Schema<IOrganizerDocument>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    surname: {
        type: String,
        required: [true, 'Manager surname is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
    },
    password: {
        type: String,
        // required: [true, 'Password is required'],
    },
    confirmPassword: {
        type: String,
    },
    role: {
        type: Types.ObjectId,
        ref: "OrganizerRole",
        required: [true, 'Organizer role id field is required']
    },
    business: {
        type: Types.ObjectId,
        ref: "Business",
        required: [true, 'Business id field is required']
    },
    isEmailVerified: {
        type: Boolean, // check email is verified or not
        default: false,
    },
    twoFactor: {
        isTextActive: {
            type: Boolean, // two-factor auth text messageing 
            default: false,
        },
        isEmailActive: {
            type: Boolean, // two-factor auth email messageing
            default: false,
        },
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

OrganizerSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate() as any;
    update.$set.updatedAt = covertTimestamp.currentTimeToUnix();
    next();
});

// checking is organizer found with the id
OrganizerSchema.statics.isOrganizerExistsById = async function (organizerId: string, select: string): Promise<IOrganizer | null> {
    const organizer = await this.findById(organizerId).select(select).populate("role", "name").lean();
    return organizer;
}

// checking is organizer found with the email
OrganizerSchema.statics.isOrganizerExistsByEmail = async function (email: string, select: string): Promise<IOrganizer | null> {
    const organizer = await this.findOne({ email }).select(select).lean();
    return organizer;
}

const Organizer = model<IOrganizerDocument, IOrganizerModel>("Organizer", OrganizerSchema);
export default Organizer;