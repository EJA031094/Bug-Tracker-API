import IssueModel from '../models/issue.model';
import mongoose from 'mongoose'

export async function createIssue(poster: string, project: string, name: string, description: string, active: boolean) {
    const issue = await IssueModel.create({ poster, project, name, description, active });

    return issue;
}

export async function getProjectIssues(projectId: string) {
    const projectObjId = new mongoose.Types.ObjectId(projectId);

    const issues = await IssueModel.find({project: projectObjId});

    return issues;
}