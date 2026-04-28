import bcrypt from "bcrypt";
import { findAllUsers, findUserById, updateUserById, deleteUserById } from "../repositories/userRepo.js";

export async function getAllUsers() {
  return findAllUsers();
}

export async function getUser(id) {
  return findUserById(id);
}

export async function updateUser(id, { username, email, password }) {
  if (!username && !email && !password) {
    const err = new Error("No fields provided");
    err.status = 400;
    throw err;
  }
  const data = {};
  if (username) data.username = username;
  if (email) data.email = email;
  if (password) data.password = await bcrypt.hash(password, 10);
  return updateUserById(id, data);
}

export async function deleteUser(id) {
  return deleteUserById(id);
}