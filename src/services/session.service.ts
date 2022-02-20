import config from 'config';
import { Response } from 'express';
import { FilterQuery } from 'mongoose';
import { Session, SessionModel } from '../models/session.model';
import { signJwt } from '../utilities/jwtutil';

export async function createSession(user: string, userAgent: string) {
    try {
        const session = await SessionModel.create({user, valid: true, userAgent});
    
        // create an access token
        const accessToken = signJwt({ user, session: session._id}, {expiresIn: config.get<string>('accessTokenDuration')});
        // create a refresh token
        const refreshToken = signJwt({ user, session: session._id}, {expiresIn: config.get<string>('refreshTokenDuration')});
    
        return { accessToken, refreshToken };    
    } catch (err: any) {
        throw new Error(err);
    }
}

export async function getSessions(query: FilterQuery<Session>) {
    try {
        return SessionModel.find(query).lean();
    } catch (err: any) {
        throw new Error(err);
    }    
}

export function setSessionCookies(res: Response, session: { accessToken: string, refreshToken: string }) {
    try {  
        //splits the jwt into header, payload, and signature strings
        const parsedToken = session.accessToken.split('.');
    
        res.cookie('access-token-header-payload', parsedToken[0] + '.' + parsedToken[1], { 
            sameSite: true,
            secure: true,
            maxAge: 600 * 1000 //10 minutes
        });
    
        res.cookie('access-token-signature', parsedToken[2], { 
            sameSite: true,
            secure: true,
            httpOnly: true,
            maxAge: 600 * 1000 //10 minutes
        });
    
        res.cookie('refresh-token', session.refreshToken, { 
            httpOnly: true,
            maxAge: 7200 * 1000 //2 hours
        });
    } catch (err: any) {
        throw new Error(err);
    }
}