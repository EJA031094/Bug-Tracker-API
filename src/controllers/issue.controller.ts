import { Request, Response } from 'express';
import { createIssue, getProjectIssues } from '../services/issue.service';
import { getProjectById } from '../services/project.service';
import { CreateIssueInput } from '../validation/issue.validation';

export async function getProjectIssuesHandler(req: Request<{}, {}, {}, { projectId: string }>, res: Response) {
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

        const issues = await getProjectIssues(projectId);

        return res.send(issues);
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

export async function createIssueHandler(req: Request<{}, {}, CreateIssueInput['body']>, res: Response) {
    try {
        const poster: string = res.locals.user.user;

        if(!poster) {
            return res.status(400).send('Unauthorized access.');
        }

        const { projectId, name, description } = req.body;

        const confirmProject = getProjectById(projectId);

        //project not found using given id
        if(!confirmProject) {
            return res.status(404).send('Project not found.');
        }
        const issue = await createIssue(poster, projectId, name, description, true);

        return res.send(issue);
    } catch (err: any) {
        console.log(err);
        return res.status(500).send();
    }

}