import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function createComment(data) {
  try {
    return await prisma.comment.create({ data });
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function findAllComments(taskId) {
  return prisma.comment.findMany({ where: { taskId } });
}

export async function findCommentById(id) {
  return prisma.comment.findUnique({ where: { id } });
}

export async function updateCommentById(id, data) {
  try {
    return await prisma.comment.update({ where: { id }, data });
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("Comment not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function deleteCommentById(id) {
  try {
    return await prisma.comment.delete({ where: { id } });
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("Comment not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}