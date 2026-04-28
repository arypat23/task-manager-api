import { getAllProjects, getProjectById, createNewProject, updateProject, deleteProject } from "../services/projectService.js";

export async function getAllProjectsHandler(req, res, next) {
  try {
    const projects = await getAllProjects(req.user.id);
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
}

export async function getProjectByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const project = await getProjectById(id);
    if (project.userId !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
}

export async function createProjectHandler(req, res, next) {
  try {
    const project = await createNewProject(req.user.id, req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
}

export async function updateProjectHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const project = await updateProject(id, req.user.id, req.body);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
}

export async function deleteProjectHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const project = await deleteProject(id, req.user.id);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
}