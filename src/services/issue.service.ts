import IssueModel from "../models/issue.model";

export async function createIssue(poster: string, project: string, name: string, description: string, isPublic: boolean) {
    const issue = await IssueModel.create({ poster, project, name, description, isPublic });

    return issue;
}