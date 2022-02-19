import CommentModel, { CommentInterface } from '../models/comment.model';
import mongoose from 'mongoose';
import { getUser } from './user.service';

export async function getCommentsByIssue(issueId: string) {
    const issueObjId = new mongoose.Types.ObjectId(issueId);

    const comments = await CommentModel.find({ issue: issueObjId });

    return comments;
}

export async function createComment(issueId: string, userId: string, body: string) {
    const issueObjId = new mongoose.Types.ObjectId(issueId);
    const userObjId = new mongoose.Types.ObjectId(userId);

    const comment = await CommentModel.create({issue: issueObjId, poster: userObjId, body});

    return comment;
}

export async function getCommentUsernames(comments: CommentInterface[]) {
    const result: CommentInterface[] = await Promise.all(
        comments.map(async (i: any) => ({
            ...i._doc,
            posterName: (await getUser(i.poster))?.username
        })
    ));

    console.log(result);

    return result;
}