import { Express, NextFunction, Request, Response } from 'express';
import { createUserHandler } from './controllers/user.controller';

export function routes(app: Express) {
    userRoutes(app);
}

function userRoutes(app: Express){
    app.post('/api/user/create', createUserHandler);
}
