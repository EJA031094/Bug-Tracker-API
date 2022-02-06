import ProjectModel from '../models/project.model';
import mongoose from 'mongoose';

export async function createProject(owner: string, name: string, description: string, isPublic: boolean) {
    const project = await ProjectModel.create({ owner, name, description, isPublic });

    return project;
}

export async function getProjectById(projectId: string) {
    const projectObjId = new mongoose.Types.ObjectId(projectId);

    const project = await ProjectModel.findById(projectObjId);

    return project;
}

export async function getPublicProjects() {
    const projects = await ProjectModel.find({ isPublic: true });

    return projects;
}