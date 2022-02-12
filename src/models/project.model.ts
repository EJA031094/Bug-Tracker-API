import mongoose from 'mongoose';
import { User } from './user.model';

export interface Project extends mongoose.Document {
    owner: User['_id'];
    ownerName: string;
    name: string;
    description: string;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new mongoose.Schema<Project> (
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        ownerName: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        isPublic: {type: Boolean, default: true}
    },
    {
        timestamps: true
    }
);

const ProjectModel = mongoose.model<Project>('Project', projectSchema);

export default ProjectModel;