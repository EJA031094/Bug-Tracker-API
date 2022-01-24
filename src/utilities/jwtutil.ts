import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    const checkOptions = (options !== undefined ? options : null);

    return jwt.sign(object, privateKey, {...checkOptions, algorithm: 'RS256'});
}

export function verifyJwt(token: string) {
    try{
        const decoded = jwt.verify(token, publicKey);

        return {valid: true, expired: false, decoded}
    } catch(err: any) {
        const isExpired: boolean = err.message === 'jwt expired';

        return {valid: false, expired: isExpired, decoded: null}
    }
}