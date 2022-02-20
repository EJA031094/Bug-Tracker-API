import mongoose from 'mongoose';

export interface Profile {
    user: mongoose.Types.ObjectId;
    blurb: string;
    createdAt: Date;
    updatedAt: Date;
}

const profileSchema = new mongoose.Schema<Profile> (
    {
        user: { type: String, required: true, unique: true }
    },
    {
        timestamps: true
    }
);

export const ProfileModel = mongoose.model<Profile>('Profile', profileSchema);