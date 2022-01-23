import mongoose from 'mongoose';
import { User } from './user.model';

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

const SessionModel = mongoose.model<Session>('Session', sessionSchema);

export default SessionModel;