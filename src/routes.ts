import { Express } from 'express';
import { createCommentHandler, getCommentsByIssueHandler } from './controllers/comment.controller';
import { createIssueHandler, getIssueByIdHandler, getProjectIssuesHandler } from './controllers/issue.controller';
import { createProjectHandler, getProjectByIdHandler, getPublicProjectsHandler } from './controllers/project.controller';
import { createUserSessionHandler, getUserSessionsHandler } from './controllers/session.controller';
import { createUserHandler, getUserProfileHandler, logoutUserHandler } from './controllers/user.controller';
import { requireUser } from './middleware/authentication.middleware';
import { validateResource } from './middleware/validation.middleware';
import { createCommentValidator } from './models/comment.model';
import { createIssueValidator } from './models/issue.model';
import { createProjectValidator } from './models/project.model';
import { createUserSessionValidator } from './models/session.model';
import { createUserValidator } from './models/user.model';

export function routes(app: Express) {
    //session routes
    app.post('/api/sessions/create', validateResource(createUserSessionValidator), createUserSessionHandler);
    app.get('/api/sessions/get', requireUser, getUserSessionsHandler);

    //user routes
    app.post('/api/users/create', validateResource(createUserValidator), createUserHandler);
    app.post('/api/users/logout', logoutUserHandler);
    app.post('/api/users/getProfile', getUserProfileHandler);
    
    //project routes
    app.get('/api/projects/getById', getProjectByIdHandler);
    app.get('/api/projects/getPublic', getPublicProjectsHandler);
    app.post('/api/projects/create', validateResource(createProjectValidator), requireUser, createProjectHandler);

    //issue routes
    app.post('/api/issues/create', validateResource(createIssueValidator), requireUser, createIssueHandler);
    app.get('/api/issues/getProjectIssues', getProjectIssuesHandler);
    app.get('/api/issues/getById', getIssueByIdHandler);
    app.get('/api/issues/getIssueComments', getCommentsByIssueHandler);

    //comment routes
    app.post('/api/comments/create', validateResource(createCommentValidator), requireUser, createCommentHandler);
}
