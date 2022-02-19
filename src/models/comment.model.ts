import mongoose from 'mongoose';
import { Issue } from './issue.model';
import { User } from './user.model';

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

const CommentModel = mongoose.model<CommentInterface >('Comment', commentSchema);

export default CommentModel;