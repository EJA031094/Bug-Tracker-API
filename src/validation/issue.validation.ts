import { object, string, TypeOf } from 'zod';

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