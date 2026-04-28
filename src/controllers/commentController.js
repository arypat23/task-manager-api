import { getAllComments, getCommentById, createNewComment, updateComment, deleteComment } from "../services/commentService.js";

export async function getAllCommentsHandler(req, res, next) {
  try {
    const taskId = parseInt(req.query.taskId);
    if (isNaN(taskId) || taskId <= 0) {
      return res.status(400).json({ error: "taskId query param must be a positive integer" });
    }
    const comments = await getAllComments(taskId, req.user.id);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

export async function getCommentByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const comment = await getCommentById(id, req.user.id);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function createCommentHandler(req, res, next) {
  try {
    const comment = await createNewComment(req.user.id, req.body);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function updateCommentHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const comment = await updateComment(id, req.user.id, req.body);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function deleteCommentHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    const comment = await deleteComment(id, req.user.id);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}