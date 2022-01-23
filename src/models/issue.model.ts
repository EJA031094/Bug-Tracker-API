import mongoose from 'mongoose';
import { Project } from './project.model';
import { User } from './user.model';

export interface Issue extends mongoose.Document {
    project: Project['_id'];
    poster: User['_id'];
    active: boolean;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const issueSchema = new mongoose.Schema<Issue> (
    {
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
        poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        active: { type: Boolean, default: true},
        title: { type: String, required: true },
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const IssueModel = mongoose.model<Issue>('Issue', issueSchema);

export default IssueModel;