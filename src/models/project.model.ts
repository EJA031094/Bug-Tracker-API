import mongoose from 'mongoose';
import { User } from './user.model';
import { boolean, object, string, TypeOf } from 'zod';

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

export const ProjectModel = mongoose.model<Project>('Project', projectSchema);

//validation for creating a project
export const createProjectValidator = object({
    body: object({
        name: string({
            required_error: 'Project name is required.'
        }).min(6, 'Project name should be a minimum of 6 characters.'),
        description: string({
            required_error: 'A description of your project is required.'
        }).max(250, 'Please limit your description to 250 characters.'),
        isPublic: boolean({
            invalid_type_error: 'isPublic must be a boolean value.'
        })
    })
});

export type CreateProjectInput = TypeOf<typeof createProjectValidator>;