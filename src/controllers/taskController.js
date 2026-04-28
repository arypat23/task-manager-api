import { getAllTasks, getTaskById, createNewTask, updateTask, deleteTask } from "../services/taskService.js";

export async function getAllTasksHandler(req, res, next) {
  try {
    const projectId = parseInt(req.query.projectId);
    if (isNaN(projectId) || projectId <= 0) {
      return res.status(400).json({ error: "projectId query param must be a positive integer" });
    }
    const tasks = await getAllTasks(projectId, req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function getTaskByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const task = await getTaskById(id, req.user.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

export async function createTaskHandler(req, res, next) {
  try {
    const task = await createNewTask(req.user.id, req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function updateTaskHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const task = await updateTask(id, req.user.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

export async function deleteTaskHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const task = await deleteTask(id, req.user.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}