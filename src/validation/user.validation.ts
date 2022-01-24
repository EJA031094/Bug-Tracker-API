import { object, string, TypeOf } from 'zod';

//create user validation
export const createUserValidator = object({
    body: object({
        username: string({
            required_error: 'Username is required.',
        }),
        password: string({
            required_error: 'Password is required.',
        }).min(6, 'Password should be a minimum of 6 characters.'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required.',
        }).min(6, 'Password should be a minimum of 6 characters.'),
        email: string({
            required_error: 'Email address is required.',
        }).email('Please enter a valid email.'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match.',
        path: ['passwordConfirmation'],
    })
});

export type CreateUserInput = TypeOf<typeof createUserValidator>;