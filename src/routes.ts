import { Express } from 'express';
import { createProjectHandler, getProjectByIdHandler, getPublicProjectsHandler } from './controllers/project.controller';
import { createUserSessionHandler, getUserSessionsHandler } from './controllers/session.controller';
import { createUserHandler } from './controllers/user.controller';
import { requireUser } from './middleware/authentication.middleware';
import { validateResource } from './middleware/validation.middleware';
import { createProjectValidator } from './validation/project.validation';
import { createUserSessionValidator } from './validation/session.validation';
import { createUserValidator} from './validation/user.validation';

export function routes(app: Express) {
    //session routes
    app.post('/api/sessions/create', validateResource(createUserSessionValidator), createUserSessionHandler);
    app.get('/api/sessions/get', requireUser, getUserSessionsHandler);

    //user routes
    app.post('/api/users/create', validateResource(createUserValidator), createUserHandler);
    
    //project routes
    app.get('/api/projects/getById', getProjectByIdHandler);
    app.get('/api/projects/getPublic', getPublicProjectsHandler);
    app.post('/api/projects/create', validateResource(createProjectValidator), requireUser, createProjectHandler);
}
