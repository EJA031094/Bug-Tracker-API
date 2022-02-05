import { boolean, object, string, TypeOf } from 'zod';

export const createProjectValidator = object({
    body: object({
        name: string({
            required_error: 'Project name is required.'
        }).min(6, 'Project name should be a minimum of 6 characters.'),
        description: string({
            required_error: 'Password is required.'
        }).max(250, 'Please limit your description to 250 characters.'),
        isPublic: boolean({
            invalid_type_error: 'isPublic must be a boolean value.'
        })
    })
});

export type CreateProjectInput = TypeOf<typeof createProjectValidator>;