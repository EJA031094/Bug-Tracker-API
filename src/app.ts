import express from 'express';
import config from 'config';
import { connect } from './utilities/connect';
import { routes } from './routes';

const app = express();

//request body parser
app.use(express.json());

app.listen(config.get<string>('portNumber'), async () => {
    await connect();
    routes(app);

    console.log(`Server listening at: ${ config.get<string>('hostName') }:${ config.get<string>('portNumber') }`);
});