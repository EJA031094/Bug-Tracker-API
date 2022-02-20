import { ProjectModel } from '../models/project.model';
import mongoose from 'mongoose';
import { getUser } from './user.service';

export async function createProject(owner: string, name: string, description: string, isPublic: boolean) {
    try {
        const ownerName = (await getUser({_id: owner}))?.username;
        const project = await ProjectModel.create({ owner, ownerName, name, description, isPublic });
    
        return project;
    } catch (err: any) {
        throw new Error(err);
    }
}

export async function getProjectById(projectId: string) {
    try {
        const projectObjId = new mongoose.Types.ObjectId(projectId);
    
        const project = await ProjectModel.findById(projectObjId);
    
        return project;
    } catch (err: any) {
        throw new Error(err);
    }
}

export async function getPublicProjects() {
    try {
        const projects = await ProjectModel.find({ isPublic: true });
    
        return projects;
    } catch (err: any) {
        throw new Error(err);
    }
}