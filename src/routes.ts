import { Express } from 'express';
import { createUserSessionHandler, getUserSessionsHandler } from './controllers/session.controller';
import { createUserHandler } from './controllers/user.controller';
import { requireUser } from './middleware/authentication.middleware';
import { validateResource } from './middleware/validation.middleware';
import { createUserSessionValidator } from './validation/session.validation';
import { createUserValidator} from './validation/user.validation';

export function routes(app: Express) {
    userRoutes(app);
    sessionRoutes(app);
}

function userRoutes(app: Express) {
    app.post('/api/users/create', validateResource(createUserValidator), createUserHandler);
}

function sessionRoutes(app: Express) { 
    app.post('/api/sessions/create', validateResource(createUserSessionValidator), createUserSessionHandler);
    app.get('/api/sessions/get', requireUser, getUserSessionsHandler)
}
