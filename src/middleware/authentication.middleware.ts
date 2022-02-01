import config from 'config';
import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import SessionModel from '../models/session.model';
import { getUser } from '../services/user.service';
import { signJwt, verifyJwt } from '../utilities/jwtutil';

export async function deserializeCookie(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(req.cookies);
        const accessToken = req.cookies['access-token-header-payload'] + '.' + req.cookies['access-token-signature'];
        const refreshToken = req.cookies['refresh-token'];
    
        console.log('deserialized atoken: ', accessToken,'\ndeserialized ftoken: ', refreshToken);
    
        if(accessToken) {
            req.headers['authorization'] = accessToken;
        }
    
        if(refreshToken) {
            req.headers['x-refresh'] = refreshToken;
        }
        next();
    } catch(err: any) {
        console.log(err.message)
        next();
    }
}

//app-wide middleware for checking access and refresh tokens
export async function deserializeAccessToken(req: Request, res: Response, next: NextFunction) {
    const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

    //no access token, set no user info
    if(!accessToken) { 
        return next();
    }

    const { decoded, expired } = verifyJwt(accessToken);
    const refreshToken = get(req, 'headers.x-refresh');

    //set user on the response if found and call next
    if(decoded) {
        res.locals.user = decoded;
        return next();
    }

    //found expired token, check refresh
    if(expired && refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);

        if(newAccessToken) {
            res.setHeader('x-access-token', newAccessToken);
        }

        const result = verifyJwt(newAccessToken || '');
        res.locals.user = result.decoded;
    }

    return next();
}


//add to route to forbid resource unless logged in
export function requireUser(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;

    if (!user) {
        return res.sendStatus(403);
    }

    return next();
};

async function refreshAccessToken({ refreshToken }: { refreshToken: string }) {
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
}