import mongoose from 'mongoose';
import { Project } from './project.model';
import { User } from './user.model';
import { object, string, TypeOf } from 'zod';

export interface Issue extends mongoose.Document {
    project: Project['_id'];
    poster: User['_id'];
    active: boolean;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const issueSchema = new mongoose.Schema<Issue> (
    {
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
        poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        active: { type: Boolean, default: true},
        name: { type: String, required: true },
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const IssueModel = mongoose.model<Issue>('Issue', issueSchema);

//validatior for creating an issue
export const createIssueValidator = object({
    body: object({
        projectId: string({
            required_error: 'An error occured, no project was set as the root of this issue.'
        }),
        name: string({
            required_error: 'Issue name is required.'
        }).min(6, 'Issue name should be a minimum of 6 characters.'),
        description: string({
            required_error: 'Password is required.'
        }).max(250, 'Please limit your description to 250 characters.')
    })
});

export type CreateIssueInput = TypeOf<typeof createIssueValidator>;