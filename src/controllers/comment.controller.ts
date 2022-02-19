import { Response, Request } from 'express';
import { CommentInterface } from '../models/comment.model';
import { createComment, getCommentsByIssue, getCommentUsernames } from '../services/comment.service';
import { getIssueById } from '../services/issue.service';
import { CreateCommentInput } from '../validation/comment.validation';

export async function createCommentHandler(req: Request<{}, {}, CreateCommentInput['body']>, res: Response) {
    try {
        const poster: string = res.locals.user.user;

        const { issueId, body } = req.body;

        const confirmIssue = getIssueById(issueId);

        //issue not found using given id
        if(!confirmIssue) {
            return res.status(404).send('Issue not found.');
        }

        const comment = await createComment(issueId, poster, body);

        return res.send(comment);
    } catch (err: any) {
        console.log(err);
        return res.status(500).send();
    }

}

export async function getCommentsByIssueHandler(req: Request<{}, {}, {}, { issueId: string }>, res: Response) {
    try {
        const commentList: CommentInterface[] = await getCommentsByIssue(req.query.issueId);

        const comments = await getCommentUsernames(commentList);

        return res.send(comments);
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}