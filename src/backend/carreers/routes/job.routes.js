import express from "express";
import { getJobs, createJob, deactivateJob, deleteJob } from "../controllers/job.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route: list jobs
router.get("/", getJobs);

// HR-only routes (require JWT)
router.post("/", authMiddleware, createJob);
router.patch("/:id/deactivate", authMiddleware, deactivateJob);
router.delete("/:id", authMiddleware, deleteJob);

export default router;