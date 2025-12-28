import express from "express";
import { applyJob, getAllApplications, updateApplicationStatus } from "../controllers/apply.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route
router.post("/", applyJob);

// Protected routes (HR only)
router.get("/applications", authMiddleware, getAllApplications);
router.patch("/applications/:id/status", authMiddleware, updateApplicationStatus);

export default router;