import config from "config";
import { FilterQuery } from "mongoose";
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

export async function getSessions(query: FilterQuery<Session>) {
    return SessionModel.find(query).lean();
}