import express from 'express';
import config from 'config';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { routes } from './routes';
import { deserializeAccessToken, deserializeCookie } from './middleware/authentication.middleware';
import { logger } from './utilities/logger';

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
};
//cors setup
app.use(cors(corsOptions));

//parsers for json/cookies
app.use(express.json());
app.use(cookieParser());

//jwt access token management
app.use(deserializeCookie)
app.use(deserializeAccessToken);

app.listen(config.get<string>('portNumber'), async () => {
    await connect();
    routes(app);

    logger.info(`Server listening at: ${ config.get<string>('hostName') }:${ config.get<string>('portNumber') }`);
}); 

//connects to database
async function connect() {
    try {
        await mongoose.connect(config.get<string>('connString'));
        logger.info('Connected to DB.');
    } catch {
        logger.info('Failed to connect to DB.');
    }
}