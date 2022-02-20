import { Request, Response} from 'express';
import { CreateUserInput } from '../models/user.model';
import { createUser } from '../services/user.service';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUser(req.body);

        return res.status(200).send(user);
    } catch(err: any) {
        console.log(err);

        return res.status(400).send(err);
    }
}

export async function logoutUserHandler(req: Request, res: Response) {
    try {
        res.clearCookie('access-token-header-payload');
        res.clearCookie('access-token-signature');
        res.clearCookie('refresh-token');

        console.log('removed cookies');

        return res.status(200).send();
    } catch(err: any) {
        console.log(err);

        return res.status(500).send(err);
    }
}

export async function getUserProfileHandler(req: Request, res: Response) {
    try {
        return res.status(200).send();
    } catch(err: any) {
        console.log(err);

        return res.status(500).send(err);
    }
}