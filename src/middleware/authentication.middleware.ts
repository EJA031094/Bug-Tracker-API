import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import SessionModel from '../models/session.model';
import { getUser } from '../services/user.service';
import { signJwt, verifyJwt } from '../utilities/jwtutil';

export async function deserializeCookie(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = req.cookies['access-token-header-payload'] + '.' + req.cookies['access-token-signature'];
        const refreshToken = req.cookies['refresh-token'];

        req.headers['authorization'] = accessToken;
        req.headers['x-refresh'] = refreshToken;

        return next();
    } catch(err: any) {
        console.log(err)
        
        return next();
    }
}

//app-wide middleware for checking access and refresh tokens
export async function deserializeAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
        const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

        //guard clause for missing access token
        if(!accessToken) { 
            return next();
        }
    
        const { decoded, expired } = verifyJwt(accessToken);
        const refreshToken = get(req, 'headers.x-refresh');

        //user found, set info and call next
        if(decoded) {
            res.locals.user = decoded;
            return next();
        }
    
        //expired token, check refresh
        if(expired && refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken);
    
            if(newAccessToken) {
                res.setHeader('x-access-token', newAccessToken);
            }
    
            const result = verifyJwt(newAccessToken || '');
            res.locals.user = result.decoded;
        }
    
        return next();
    } catch (err: any) {
        console.log(err);

        return next();
    }
}

//add to route to forbid resource unless logged in
export function requireUser(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;

    if (user) {   
        return next();
    }

    return res.sendStatus(403);
};

async function refreshAccessToken({ refreshToken }: { refreshToken: string }) {
    try {
        const { decoded } = verifyJwt(refreshToken);

        //verify token was decoded and has a valid id, else return false
        if(!decoded || !get(decoded, 'session')) {
            return false;
        }
    
        const session = await SessionModel.findById(get(decoded, 'session'));
    
        if(!session || !session.valid) {
            return false;
        }
    
        const user = await getUser({_id: session.user});
    
        if(!user) {
            return false;
        }
    
        const accessExpires = { expiresIn: config.get<string>("accessTokenDuration")};
        const accessToken = signJwt({...user, session: session._id}, accessExpires);
    
        return accessToken;
    } catch (err: any) {
        console.log(err);

        return false;
    }
}