import { Request, Response} from 'express';
import { createSession } from '../services/session.service';
import { validateUserPassword } from '../services/user.service';

export async function createUserSessionHandler(req: Request, res: Response) {
    //test password
    const user = await validateUserPassword(req.body);

    if (!user) {
        return res.status(401).send('Invalid email or password.');
    }

    const session = await createSession(user._id, req.get('user-agent') || '');

    // return tokens
    return res.send(session);
}