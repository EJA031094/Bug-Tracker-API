import { Issue, IssueModel } from '../models/issue.model';
import mongoose from 'mongoose';
import { getUser } from './user.service';

export async function createIssue(poster: string, project: string, name: string, description: string, active: boolean) {
    try { 
        const issue = await IssueModel.create({ poster, project, name, description, active });

        return issue;
    } catch (err: any) {
        throw new Error(err);
    }
}

export async function getProjectIssues(projectId: string) {
    try { 
        const projectObjId = new mongoose.Types.ObjectId(projectId);
    
        const issues = await IssueModel.find({project: projectObjId});
    
        return issues;
    } catch (err: any) {
        throw new Error(err);
    }
}

export async function getIssueById(issueId: string) {
    try {
        const issueObjId = new mongoose.Types.ObjectId(issueId);

        const issue: any = await IssueModel.findById(issueObjId);
    
        return {...issue._doc, posterName: (await getUser(issue?.poster))?.username};       
    } catch (err: any) {
        throw new Error(err);
    }
}

export async function addUsernames(issues: Issue[]) {
    try { 
        const result = await Promise.all(
            issues.map(async (i: any) => ({
                ...i._doc,
                posterName: (await getUser(i.poster))?.username
            })
        ));
    
        return result;
    } catch (err: any) {
        throw new Error(err);
    }
}