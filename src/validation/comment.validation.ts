import { object, string, TypeOf } from 'zod';

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