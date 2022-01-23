import mongoose from 'mongoose';
import { User } from './user.model';

export interface Project extends mongoose.Document {
    owner: User['_id'];
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const projectSchema = new mongoose.Schema<Project> (
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const ProjectModel = mongoose.model<Project>('Project', projectSchema);

export default ProjectModel;