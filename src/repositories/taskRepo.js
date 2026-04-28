import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function createTask(data) {
  try {
    return await prisma.task.create({ data });
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function findAllTasks(projectId) {
  return prisma.task.findMany({ where: { projectId } });
}

export async function findTaskById(id) {
  return prisma.task.findUnique({ where: { id } });
}

export async function updateTaskById(id, data) {
  try {
    return await prisma.task.update({ where: { id }, data });
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function deleteTaskById(id) {
  try {
    return await prisma.task.delete({ where: { id } });
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("Task not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}