import { Request, Response } from 'express';
import { createProject } from '../services/project.service';
import { CreateProjectInput } from '../validation/project.validations';

export async function createProjectHandler(req: Request<{}, {}, CreateProjectInput['body']>, res: Response) {
    const owner: string = res.locals.user.user;
    const { name, description, isPublic } = req.body;

    const project = await createProject(owner, name, description, isPublic);

    return res.send(project);
}