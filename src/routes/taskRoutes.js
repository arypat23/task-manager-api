import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { getAllTasksHandler, getTaskByIdHandler, createTaskHandler, updateTaskHandler, deleteTaskHandler } from "../controllers/taskController.js";

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for a project
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks
 *       400:
 *         description: projectId must be a positive integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.get("/", authenticate, getAllTasksHandler);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found
 *       400:
 *         description: ID must be a positive integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 */
router.get("/:id", authenticate, getTaskByIdHandler);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               dueDate:
 *                 type: string
 *               projectId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Title and projectId are required
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.post("/", authenticate, createTaskHandler);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               status:
 *                 type: string
 *               dueDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: ID must be a positive integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 */
router.put("/:id", authenticate, updateTaskHandler);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: ID must be a positive integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Task not found
 */
router.delete("/:id", authenticate, deleteTaskHandler);

export default router;