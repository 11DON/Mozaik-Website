import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct path relative to this file
const JOBS_FILE = path.join(__dirname, "../../data/jobs.json");

// Get all jobs
export const getJobs = (req, res) => {
  try {
    const jobs = JSON.parse(fs.readFileSync(JOBS_FILE));
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to read jobs", error: err });
  }
};

// Create a new job
export const createJob = (req, res) => {
  try {
    const jobs = JSON.parse(fs.readFileSync(JOBS_FILE));
    const { title, jobType, qualifications, description } = req.body;

    if (!title || !jobType || !qualifications) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newJob = {
      id: uuidv4(),
      title,
      jobType,
      qualifications, // array of strings
      description: description || "",
      isActive: true,
      createdAt: new Date().toISOString()
    };

    jobs.push(newJob);
    fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));

    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: "Failed to create job", error: err });
  }
};

// Soft-delete / deactivate a job
export const deactivateJob = (req, res) => {
  try {
    const jobs = JSON.parse(fs.readFileSync(JOBS_FILE));
    const job = jobs.find(j => j.id === req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    job.isActive = false;
    fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));

    res.json({ message: `Job "${job.title}" deactivated successfully` });
  } catch (err) {
    res.status(500).json({ message: "Failed to deactivate job", error: err });
  }
};