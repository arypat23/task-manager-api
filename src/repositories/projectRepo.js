import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function createProject(data) {
  try {
    return await prisma.project.create({ data });
  } catch (error) {
    if (error.code === "P2002") {
      const err = new Error("Project already exists");
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function findAllProjects(userId) {
  return prisma.project.findMany({ where: { userId } });
}

export async function findProjectById(id) {
  return prisma.project.findUnique({ where: { id } });
}

export async function updateProjectById(id, data) {
  try {
    return await prisma.project.update({ where: { id }, data });
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function deleteProjectById(id) {
  try {
    return await prisma.project.delete({ where: { id } });
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("Project not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}