import { Router } from "express";

import { createtask, getTasks, updateTaskStatus } from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createtask);
router.patch("/:taskId/status", updateTaskStatus);

export default router;