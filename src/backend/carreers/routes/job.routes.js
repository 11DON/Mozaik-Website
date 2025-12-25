import express from "express";
import {getJobs,createJob,deactivateJob} from "../controllers/job.controller.js"; // Fixed typo
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// public route : list jobs (users)
router.get("/",getJobs);


// HR-only routes (require JWT)
router.post("/",authMiddleware,createJob);
router.patch("/:id/deactivate",authMiddleware,deactivateJob);

export default router;