import config from "config";
import { Response } from 'express';
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { Session } from "../models/session.model";
import { signJwt } from "../utilities/jwtutil";

export async function createSession(user: string, userAgent: string) {
    const session = await SessionModel.create({user, valid: true, userAgent});

    // create an access token
    const accessToken = signJwt({ user, session: session._id}, {expiresIn: config.get<string>('accessTokenDuration')});
    // create a refresh token
    const refreshToken = signJwt({ user, session: session._id}, {expiresIn: config.get<string>('refreshTokenDuration')});

    return { accessToken, refreshToken };
}

export async function updateSession(query: FilterQuery<Session>, update: UpdateQuery<Session>){
    return SessionModel.updateOne(query, update);
}

export async function getSessions(query: FilterQuery<Session>) {
    return SessionModel.find(query).lean();
}

export function setSessionCookies(res: Response, session: { accessToken: string, refreshToken: string }) {
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
        maxAge: 6120 * 1000 //2 hours
    });
}