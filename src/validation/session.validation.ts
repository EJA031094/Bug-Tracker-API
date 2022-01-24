import { object, string, TypeOf } from 'zod';

export const createUserSessionValidator = object({
    body: object({
        username: string({
            required_error: 'Username is required.',
        }),
        password: string({
            required_error: 'Password is required.',
        }).min(6, 'Password should be a minimum of 6 characters.')
    })
});

export type CreateUserSessionInput = TypeOf<typeof createUserSessionValidator>;