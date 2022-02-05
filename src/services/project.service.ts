import ProjectModel from "../models/project.model";

export async function createProject(owner: string, name: string, description: string, isPublic: boolean) {
    const project = await ProjectModel.create({ owner, name, description, isPublic });

    return project;
}