import { signUp, logIn } from "../services/authService.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required" });
    }

    const user = await signUp(username, email, password);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const token = await logIn(email, password);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
}