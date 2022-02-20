import mongoose from 'mongoose';
import { Issue } from './issue.model';
import { User } from './user.model';
import { object, string, TypeOf } from 'zod';

export interface CommentInterface extends mongoose.Document {
    issue: Issue['_id'];
    poster: User['_id'];
    body: string;
    //reply: boolean;
    //repliedTo?: Comment['_id'];
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new mongoose.Schema<CommentInterface > (
    {
        issue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true },
        poster: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        //reply: { type: Boolean, default: false },
        //repliedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
        body: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export const CommentModel = mongoose.model<CommentInterface >('Comment', commentSchema);

//validator for comment posts
export const createCommentValidator = object({
    body: object({
        issueId: string({
            required_error: 'An error occured, no issue was set as the root of this comment.'
        }),
        body: string({
            required_error: 'Comment body is required.'
        }).max(500, 'Comment body should not exceed 500 characters.')
    })
});

export type CreateCommentInput = TypeOf<typeof createCommentValidator>;