import mongoose from 'mongoose';

export interface User extends mongoose.Document {
    email: string;
    username: string;
    password: string;
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

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;