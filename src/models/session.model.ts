import mongoose from 'mongoose';
import { User } from './user.model';
import { object, string, TypeOf } from 'zod';

export interface Session extends mongoose.Document {
    user: User['_id'];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<Session> (
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        userAgent: { type: String },
        valid: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

export const SessionModel = mongoose.model<Session>('Session', sessionSchema);

//validation for user login request
export const createUserSessionValidator = object({
    body: object({
        username: string({
            required_error: 'Username is required.',
        }),
        password: string({
            required_error: 'Password is required.',
        }).min(6, 'Password should be a minimum of 6 characters.')
    })
});

export type CreateUserSessionInput = TypeOf<typeof createUserSessionValidator>;