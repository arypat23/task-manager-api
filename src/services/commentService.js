import { createComment, findAllComments, findCommentById, updateCommentById, deleteCommentById } from "../repositories/commentRepo.js";
import { findTaskById } from "../repositories/taskRepo.js";
import { findProjectById } from "../repositories/projectRepo.js";

export async function getAllComments(taskId, userId) {
  const task = await findTaskById(taskId);
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
  return findAllComments(taskId);
}

export async function getCommentById(id, userId) {
  const comment = await findCommentById(id);
  if (!comment) {
    const err = new Error("Comment not found");
    err.status = 404;
    throw err;
  }
  const task = await findTaskById(comment.taskId);
  const project = await findProjectById(task.projectId);
  if (project.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return comment;
}

export async function createNewComment(userId, data) {
  if (!data.content || !data.taskId) {
    const err = new Error("Content and taskId are required");
    err.status = 400;
    throw err;
  }
  const task = await findTaskById(data.taskId);
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
  return createComment({ ...data, userId });
}

export async function updateComment(id, userId, data) {
  const comment = await findCommentById(id);
  if (!comment) {
    const err = new Error("Comment not found");
    err.status = 404;
    throw err;
  }
  if (comment.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return updateCommentById(id, data);
}

export async function deleteComment(id, userId) {
  const comment = await findCommentById(id);
  if (!comment) {
    const err = new Error("Comment not found");
    err.status = 404;
    throw err;
  }
  if (comment.userId !== userId) {
    const err = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
  return deleteCommentById(id);
}