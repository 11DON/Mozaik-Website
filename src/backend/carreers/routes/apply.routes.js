import express from "express";
import { applyJob, getAllApplications, updateApplicationStatus } from "../controllers/apply.controller.js";
import multer from "multer";
import authMiddleware from "../middleware/auth.middleware.js";
import { deleteApplication } from "../controllers/apply.controller.js";
const router = express.Router();

// Configure multer
const storage = multer.memoryStorage(); // keeps file in memory
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// Public route
router.post("/apply", upload.single("cv"), applyJob);

// Protected routes (HR only)
router.get("/applications", authMiddleware, getAllApplications);
router.patch("/applications/:id/status", authMiddleware, updateApplicationStatus);
// Delet application
router.delete("/applications/:id", authMiddleware, deleteApplication);

export default router;
