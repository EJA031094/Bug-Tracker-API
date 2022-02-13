import { Request, Response } from 'express';
import { createProject, getProjectById, getPublicProjects } from '../services/project.service';
import { CreateProjectInput } from '../validation/project.validation';

export async function createProjectHandler(req: Request<{}, {}, CreateProjectInput['body']>, res: Response) {
    try {
        const owner: string = res.locals.user.user;
        const { name, description, isPublic } = req.body;
    
        const project = await createProject(owner, name, description, isPublic);
    
        return res.send(project);
    } catch (err: any) {
        console.log(err);
        
        return res.status(500).send();
    }

}

export async function getProjectByIdHandler(req: Request<{}, {}, {}, { projectId: string }>, res: Response) {
    try {
        const projectId = req.query.projectId;

        //no project id, return bad request
        if(projectId === '') {
            return res.status(400).send('Error, no projectId supplied.');
        }
    
        const project = await getProjectById(projectId);
    
        //project id supplied has no match
        if(!project) {
            return res.status(404).send('Error, projectId invalid.');
        }

        return res.send(project);
    } catch(err: any) {
        console.log(err);

        return res.status(500).send();
    }
}


export async function getPublicProjectsHandler(req: Request, res: Response) {
    try {
        const projects = await getPublicProjects();

        return res.send(projects);
    } catch(err: any) {
        console.log(err);

        return res.status(500).send();
    }
}