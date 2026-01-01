import { db } from "../config/db.js";

// ==================== GET ALL JOBS ====================
export const getJobs = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM jobs ORDER BY created_at DESC"
    );

    // Safely parse qualifications
    const jobs = rows.map((job) => {
      try {
        // Try parsing as JSON
        job.qualifications = JSON.parse(job.qualifications);
        if (!Array.isArray(job.qualifications)) job.qualifications = [];
      } catch (err) {
        // If invalid JSON, fallback to splitting comma
        console.warn("Invalid JSON in DB, converting to array:", job.qualifications);
        job.qualifications = String(job.qualifications)
          .split(",")
          .map(q => q.trim())
          .filter(Boolean);
      }
      return job;
    });

    res.json(jobs);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "فشل في جلب الوظائف", error: error.message });
  }
};

// ==================== CREATE JOB ====================
export const createJob = async (req, res) => {
  let { title, job_type, job_type_category, qualifications, description } = req.body;

  if (!title || !job_type || !job_type_category || !description) {
    return res.status(400).json({ message: "جميع الحقول مطلوبة" });
  }

  const allowedCategories = ["join", "contractor", "supplier"];
  if (!allowedCategories.includes(job_type_category)) {
    return res.status(400).json({ message: "Invalid job category" });
  }

  // Ensure qualifications is always an array
  if (!Array.isArray(qualifications)) {
    qualifications = String(qualifications)
      .split(",")
      .map(q => q.trim())
      .filter(Boolean);
  }

  try {
    const [result] = await db.query(
      `INSERT INTO jobs (
        title,
        job_type,
        job_type_category,
        qualifications,
        description,
        is_active,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        job_type,
        job_type_category,
        JSON.stringify(qualifications), // ✅ always valid JSON
        description,
        true,
        new Date(),
      ]
    );

    const [rows] = await db.query("SELECT * FROM jobs WHERE id = ?", [result.insertId]);
    const job = rows[0];

    try {
      job.qualifications = JSON.parse(job.qualifications || "[]");
    } catch {
      job.qualifications = [];
    }

    res.status(201).json(job);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "فشل في إنشاء الوظيفة", error: error.message });
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
    res.status(500).json({ message: "فشل في إيقاف الوظيفة", error: error.message });
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
    res.status(500).json({ message: "فشل في حذف الوظيفة", error: error.message });
  }
};
