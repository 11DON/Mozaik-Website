import transporter from "../config/mail.js";
import { db } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

// ==================== APPLY FOR JOB ====================
export const applyJob = async (req, res) => {
  console.log("=== Application Request Started ===");
  console.log("Req body:", req.body);
  console.log("Req file:", req.file);
  
  const { name, email, message, jobId } = req.body;
  const cvFile = req.file;

  // Validation
  if (!name || !email || !jobId || !cvFile) {
    console.error("Validation failed:", { name, email, jobId, hasFile: !!cvFile });
    return res.status(400).json({ 
      message: "Name, email, jobId, and CV file are required",
      missing: {
        name: !name,
        email: !email,
        jobId: !jobId,
        cvFile: !cvFile
      }
    });
  }

  try {
    // Check if job exists and is active
    console.log("Checking job with ID:", jobId);
    const [jobs] = await db.query(
      "SELECT * FROM jobs WHERE id = ? AND is_active = true",
      [jobId]
    );

    if (jobs.length === 0) {
      console.error("Job not found or inactive:", jobId);
      return res.status(404).json({ message: "Job not found or inactive" });
    }

    const job = jobs[0];
    console.log("Job found:", job.title);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadsDir)) {
      console.log("Creating uploads directory...");
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Save CV file
    const cvFilename = `${uuidv4()}-${cvFile.originalname}`;
    const cvPath = path.join(uploadsDir, cvFilename);
    console.log("Saving CV to:", cvPath);
    
    fs.writeFileSync(cvPath, cvFile.buffer);
    console.log("CV saved successfully");

    // Generate application ID
    const applicationId = uuidv4();
    console.log("Generated application ID:", applicationId);

    // Save application to database
    console.log("Saving application to database...");
    await db.query(
      "INSERT INTO applications (id, job_id, name, email, message, cv_path, status, created_at) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)",
      [applicationId, jobId, name, email, message || "", cvPath, new Date()]
    );
    console.log("Application saved to database");

    // Send email notification
    console.log("Sending email notification...");
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `طلب توظيف جديد - ${job.title}`,
      html: `
        <h2>طلب توظيف جديد</h2>
        <p><strong>الوظيفة:</strong> ${job.title}</p>
        <p><strong>الاسم:</strong> ${name}</p>
        <p><strong>البريد الإلكتروني:</strong> ${email}</p>
        <p><strong>الرسالة:</strong> ${message || "لا توجد رسالة"}</p>
        <p><strong>السيرة الذاتية:</strong> ${cvFile.originalname}</p>
        <hr>
        <p><small>تم الإرسال في: ${new Date().toLocaleString('ar-EG')}</small></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    console.log("=== Application Request Completed Successfully ===");
    res.json({ message: "Application sent successfully" });
    
  } catch (err) {
    console.error("=== ERROR in applyJob ===");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
    console.error("=========================");
    
    res.status(500).json({ 
      message: "Failed to process application", 
      error: err.message,
      // Remove the error details in production
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
};

// ==================== GET ALL APPLICATIONS (HR ONLY) ====================
export const getAllApplications = async (req, res) => {
  try {
    console.log("Fetching all applications...");
    const [rows] = await db.query(`
      SELECT a.*, j.title as job_title 
      FROM applications a 
      LEFT JOIN jobs j ON a.job_id = j.id 
      ORDER BY a.created_at DESC
    `);
    console.log(`Found ${rows.length} applications`);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ message: "Failed to fetch applications", error: err.message });
  }
};
// ==================== DELETE APPLICATION (HR ONLY) ====================
export const deleteApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM applications WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    console.error("Error deleting application:", err);
    res.status(500).json({ message: "Failed to delete application", error: err.message });
  }
};
// ==================== UPDATE APPLICATION STATUS (HR ONLY) ====================
export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ 
      message: "Invalid status", 
      validStatuses 
    });
  }
  
  try {
    console.log(`Updating application ${id} status to ${status}`);
    const [result] = await db.query(
      "UPDATE applications SET status = ? WHERE id = ?", 
      [status, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Application not found" });
    }
    
    console.log("Status updated successfully");
    res.json({ message: "Status updated successfully" });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};