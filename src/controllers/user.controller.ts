import { Request, Response} from 'express';
import { createUser } from '../services/user.service';
import { CreateUserInput } from '../validation/user.validation';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUser(req.body);

        return res.status(200).send(user);
    } catch(err: any) {
        console.log(err);
        
        return res.status(400).send(err.message);
    }
}