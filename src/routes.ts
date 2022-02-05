import { Express } from 'express';
import { createProjectHandler } from './controllers/project.controller';
import { createUserSessionHandler, getUserSessionsHandler } from './controllers/session.controller';
import { createUserHandler } from './controllers/user.controller';
import { requireUser } from './middleware/authentication.middleware';
import { validateResource } from './middleware/validation.middleware';
import { createProjectValidator } from './validation/project.validations';
import { createUserSessionValidator } from './validation/session.validation';
import { createUserValidator} from './validation/user.validation';

export function routes(app: Express) {
    userRoutes(app);
    sessionRoutes(app);
    projectRoutes(app);
}

function userRoutes(app: Express) {
    app.post('/api/users/create', validateResource(createUserValidator), createUserHandler);
}

function sessionRoutes(app: Express) { 
    app.post('/api/sessions/create', 
    validateResource(createUserSessionValidator), 
    createUserSessionHandler);
    
    app.get('/api/sessions/get', requireUser, getUserSessionsHandler)
}

function projectRoutes(app: Express) {
    app.post('/api/projects/create', 
    validateResource(createProjectValidator), 
    requireUser, 
    createProjectHandler);
}
