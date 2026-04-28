import { getUser, updateUser, deleteUser } from "../services/userService.js";

export async function getUserByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    if (req.user.id !== id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const user = await getUser(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUserByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    if (req.user.id !== id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const user = await updateUser(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }
    if (req.user.id !== id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const user = await deleteUser(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}