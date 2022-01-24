import mongoose from 'mongoose';

export interface UserInput {
    email: string;
    username: string;
    password: string;
}

export interface User extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<User> (
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model<User>('User', userSchema);