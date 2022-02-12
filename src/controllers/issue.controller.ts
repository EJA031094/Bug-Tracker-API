import { Request, Response } from 'express';
import { CreateIssueInput } from '../validation/issue.validation';

export async function createIssueHandler(req: Request<{}, {}, CreateIssueInput['body']>, res: Response) {
    try {
        const poster: string = res.locals.user.user;

        if(!poster) {
            return res.status(400).send('Unauthorized access.');
        }

        const { project, name, description, active } = req.body;
        
        

        return res.send(project);
    } catch (err: any) {
        console.log(err);
        return res.status(500).send();
    }

}