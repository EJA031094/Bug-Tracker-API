import { Request, Response} from 'express';
import { CreateUserSessionInput } from '../models/session.model';
import { createSession, getSessions, setSessionCookies } from '../services/session.service';
import { validateUserPassword } from '../services/user.service';
import { logger } from '../utilities/logger';

export async function createUserSessionHandler(req: Request<{}, {}, CreateUserSessionInput['body']>, res: Response) {
    try {
        //test password
        const user = await validateUserPassword(req.body);

        if (!user) {
            return res.status(401).send('Invalid email or password.');
        }

        const session = await createSession(user._id, req.get('user-agent') || '');

        setSessionCookies(res, session);

        return res.send(user);
    } catch (err: any) {
        logger.log(err);

        return res.status(500).send();
    }
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    try {
        const userId: string | undefined = res.locals.user.user;

        //no userId
        if(userId === undefined) {
            return res.status(404).send();
        }

        const sessions = await getSessions({ user: userId, valid: true });
        
        return res.send(sessions);
    } catch(err: any) {
        logger.log(err);
        
        return res.status(500).send();
    }
}