import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'First name must be at least 3 characters, got {VALUE}'],
        maxlength: 10
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Last name must be at least 3 characters, got {VALUE}'],
        maxlength: 10
    },
    age: {
        type: Number,
        required: true,
        min: [18, 'Age must be at least 18, got {VALUE}'],
        max: 60
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['USER', 'ADMIN', 'SUPERADMIN'],
        default: 'USER'
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);

export const User = model('User', userSchema);