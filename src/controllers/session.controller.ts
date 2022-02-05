import { Request, Response} from 'express';
import { createSession, getSessions, setSessionCookies } from '../services/session.service';
import { validateUserPassword } from '../services/user.service';
import { CreateUserSessionInput } from '../validation/session.validation';

export async function createUserSessionHandler(req: Request<{}, {}, CreateUserSessionInput['body']>, res: Response) {
    //test password
    const user = await validateUserPassword(req.body);

    if (!user) {
        return res.status(401).send('Invalid email or password.');
    }

    const session = await createSession(user._id, req.get('user-agent') || '');

    setSessionCookies(res, session);

    //cookies set, return success
    return res.send();
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = res.locals.user.user;

    const sessions = await getSessions({ user: userId, valid: true });
    
    return res.send(sessions);
}