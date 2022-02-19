import IssueModel, { Issue } from '../models/issue.model';
import mongoose from 'mongoose';
import { getUser } from './user.service';

export async function createIssue(poster: string, project: string, name: string, description: string, active: boolean) {
    const issue = await IssueModel.create({ poster, project, name, description, active });

    return issue;
}

export async function getProjectIssues(projectId: string) {
    const projectObjId = new mongoose.Types.ObjectId(projectId);

    const issues = await IssueModel.find({project: projectObjId});

    return issues;
}

export async function getIssueById(issueId: string) {
    try {
        const issueObjId = new mongoose.Types.ObjectId(issueId);

        const issue: any = await IssueModel.findById(issueObjId);
    
        return {...issue._doc, posterName: (await getUser(issue?.poster))?.username};       
    } catch (err) {
        console.log(err);
        return null;
    }

}

export async function addUsernames(issues: Issue[]) {
    const result = await Promise.all(
        issues.map(async (i: any) => ({
            ...i._doc,
            posterName: (await getUser(i.poster))?.username
        })
    ));

    return result;
}