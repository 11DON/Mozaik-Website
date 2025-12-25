import express from "express";
import { applyJob } from "../controllers/apply.controller.js";

const router = express.Router();
router.post("/", applyJob);

export default router;
