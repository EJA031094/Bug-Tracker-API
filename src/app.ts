import express from 'express';
import config from 'config';
import { connect } from './utilities/connect';
import { routes } from './routes';
import { deserializeAccessToken } from './middleware/authentication.middleware';

const app = express();

//request body parser
app.use(express.json());
app.use(deserializeAccessToken);

app.listen(config.get<string>('portNumber'), async () => {
    await connect();
    routes(app);

    console.log(`Server listening at: ${ config.get<string>('hostName') }:${ config.get<string>('portNumber') }`);
});