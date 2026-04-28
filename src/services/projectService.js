import { createProject, findAllProjects, findProjectById, updateProjectById, deleteProjectById } from "../repositories/projectRepo.js";

export async function getAllProjects(userId) {
  return findAllProjects(userId);
}

export async function getProjectById(id) {
  const project = await findProjectById(id);
  if (!project) {
    const err = new Error("Project not found");
    err.status = 404;
    throw err;
  }
  return project;
}

export async function createNewProject(userId, data) {
  if (!data.name) {
    const err = new Error("Project name is required");
    err.status = 400;
    throw err;
  }
  return createProject({ ...data, userId });
}

export async function updateProject(id, userId, data) {
  const project = await findProjectById(id);
  if (!project) {
    const err = new Error("Project not found");
    err.status = 404;
    throw err;
  }
  if (project.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return updateProjectById(id, data);
}

export async function deleteProject(id, userId) {
  const project = await findProjectById(id);
  if (!project) {
    const err = new Error("Project not found");
    err.status = 404;
    throw err;
  }
  if (project.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return deleteProjectById(id);
}