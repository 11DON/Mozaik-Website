// src/backend/carreers/controllers/job.controller.js
import { db } from "../config/db.js";

// ==================== GET ALL JOBS ====================
export const getJobs = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM jobs ORDER BY created_at DESC"
    );

    // Parse qualifications safely
    const jobs = rows.map((job) => {
      if (typeof job.qualifications === "string") {
        try {
          job.qualifications = JSON.parse(job.qualifications);
        } catch (error) {
          console.error("Parse error: ", job.qualifications);
          job.qualifications = [];
        }
      }

      if (!Array.isArray(job.qualifications)) {
        job.qualifications = [];
      }
      return job;
    });

    res.json(jobs);
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ message: "فشل في جلب الوظائف", error: error.message });
  }
};

// ==================== CREATE JOB ====================
export const createJob = async (req, res) => {
  let { title, jobType, qualifications, description } = req.body;

  if (!title || !jobType || !qualifications || !description) {
    return res.status(400).json({ message: "جميع الحقول مطلوبة" });
  }

  // Ensure qualifications is an array
  if (!Array.isArray(qualifications)) {
    qualifications = String(qualifications)
      .split(",")
      .map((q) => q.trim())
      .filter((q) => q);
  }

  try {
    const [result] = await db.query(
      `INSERT INTO jobs (title, job_type, qualifications, description, is_active, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        jobType,
        JSON.stringify(qualifications),
        description,
        true,
        new Date(),
      ]
    );

    const [rows] = await db.query("SELECT * FROM jobs WHERE id = ?", [
      result.insertId,
    ]);
    const job = rows[0];

    try {
      job.qualifications = JSON.parse(job.qualifications);
    } catch {
      job.qualifications = [];
    }

    res.status(201).json(job);
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ message: "فشل في إنشاء الوظيفة", error: error.message });
  }
};

// ==================== DEACTIVATE JOB ====================
export const deactivateJob = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE jobs SET is_active = ? WHERE id = ?", [false, id]);
    res.json({ message: "تم إيقاف الوظيفة بنجاح" });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ message: "فشل في إيقاف الوظيفة", error: error.message });
  }
};

// ==================== DELETE JOB ====================
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM jobs WHERE id = ?", [id]);
    res.json({ message: "تم حذف الوظيفة بنجاح" });
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ message: "فشل في حذف الوظيفة", error: error.message });
  }
};
