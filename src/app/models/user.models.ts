import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethod, UserStaticMethod } from "../interfaces/user.interface";
import validator from 'validator';
import bcrypt from 'bcryptjs';

const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
},
    { _id: false }
);

const userSchema = new Schema<IUser, UserStaticMethod, UserInstanceMethod>({
    email: {
        type: String,
        required: [true, 'Email became common. Necessary to make unique email'],
        lowercase: true,
        trim: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email sent, got {VALUE}']
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
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
    },
    address: addressSchema
},
    {
        versionKey: false,
        timestamps: true
    }
);

userSchema.method('hashPassword', async function (plainPassword: any) {
    return await bcrypt.hash(plainPassword, 10);
});

userSchema.static('hashPassword', async function (plainPassword: any) {
    return await bcrypt.hash(plainPassword, 10);
});

userSchema.pre('save', async function () {
    return this.password = await bcrypt.hash(this.password, 10);
});

userSchema.post('save', function (doc) {
    console.log(`${doc.email} has been saved`);
});

export const User = model<IUser, UserStaticMethod>('User', userSchema);
