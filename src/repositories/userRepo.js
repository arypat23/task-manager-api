import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function createUser(data) {
  try {
    return await prisma.user.create({
      data,
      omit: { password: true },
    });
  } catch (error) {
    if (error.code === "P2002") {
      const err = new Error("Email or username already exists");
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function findAllUsers() {
  return prisma.user.findMany({ omit: { password: true } });
}

export async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });
}

export async function updateUserById(id, data) {
  try {
    return await prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });
  } catch (error) {
    if (error.code === "P2002") {
      const err = new Error("Email or username already exists");
      err.status = 409;
      throw err;
    }
    if (error.code === "P2025") {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function deleteUserById(id) {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch (error) {
    if (error.code === "P2025") {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}