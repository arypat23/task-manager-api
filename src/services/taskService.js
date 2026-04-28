import { createTask, findAllTasks, findTaskById, updateTaskById, deleteTaskById } from "../repositories/taskRepo.js";
import { findProjectById } from "../repositories/projectRepo.js";

export async function getAllTasks(projectId, userId) {
  const project = await findProjectById(projectId);
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
  return findAllTasks(projectId);
}

export async function getTaskById(id, userId) {
  const task = await findTaskById(id);
  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }
  const project = await findProjectById(task.projectId);
  if (project.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return task;
}

export async function createNewTask(userId, data) {
  if (!data.title || !data.projectId) {
    const err = new Error("Title and projectId are required");
    err.status = 400;
    throw err;
  }
  const project = await findProjectById(data.projectId);
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
  return createTask(data);
}

export async function updateTask(id, userId, data) {
  const task = await findTaskById(id);
  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }
  const project = await findProjectById(task.projectId);
  if (project.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return updateTaskById(id, data);
}

export async function deleteTask(id, userId) {
  const task = await findTaskById(id);
  if (!task) {
    const err = new Error("Task not found");
    err.status = 404;
    throw err;
  }
  const project = await findProjectById(task.projectId);
  if (project.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return deleteTaskById(id);
}