import mongoose from 'mongoose';
import { object, string, TypeOf } from 'zod';

export interface UserInput {
    email: string;
    username: string;
    password: string;
}

export interface User extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    role: String;
}

const userSchema = new mongoose.Schema<User> (
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: {type: String, default: 'User'}
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model<User>('User', userSchema);

//validation for creating a new user
export const createUserValidator = object({
    body: object({
        username: string({
            required_error: 'Username is required.',
        }),
        password: string({
            required_error: 'Password is required.',
        }).min(6, 'Password should be a minimum of 6 characters.'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required.',
        }).min(6, 'Password should be a minimum of 6 characters.'),
        email: string({
            required_error: 'Email address is required.',
        }).email('Please enter a valid email.'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match.',
        path: ['passwordConfirmation'],
    })
});

export type CreateUserInput = TypeOf<typeof createUserValidator>;