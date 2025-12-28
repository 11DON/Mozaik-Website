import transporter from "../config/mail.js";
import { db } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const applyJob = async (req, res) => {
  const { name, email, message, jobId } = req.body;

  if (!name || !email || !jobId) {
    return res.status(400).json({ message: "Name, email, and jobId are required" });
  }

  try {
    // Check if job exists and is active
    const [jobs] = await db.query(
      "SELECT * FROM jobs WHERE id = ? AND isActive = true",
      [jobId]
    );

    if (jobs.length === 0) {
      return res.status(404).json({ message: "Job not found or inactive" });
    }

    const job = jobs[0];

    // Save application to database
    const applicationId = uuidv4();
    await db.query(
      "INSERT INTO applications (id, job_id, name, email, message, status, createdAt) VALUES (?, ?, ?, ?, ?, 'pending', ?)",
      [applicationId, jobId, name, email, message || "", new Date()]
    );

    // Send email notification
    console.log("Preparing to send email for job:", job.title);
    console.log("Sending from:", process.env.EMAIL_USER);
    console.log("Sending to:", process.env.EMAIL_TO);

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
        <hr>
        <p><small>تم الإرسال في: ${new Date().toLocaleString('ar-EG')}</small></p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully! MessageId:", info.messageId);
    console.log("Response:", info.response);

    res.json({ message: "Application sent successfully" });
  } catch (err) {
    console.error("Error in applyJob:", err);
    res.status(500).json({ message: "Failed to process application", error: err.message });
  }
};

// Get all applications (for HR admin)
export const getAllApplications = async (req, res) => {
  try {
    const [applications] = await db.query(`
      SELECT 
        a.id,
        a.name,
        a.email,
        a.message,
        a.status,
        a.createdAt,
        j.title as jobTitle,
        j.jobType
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      ORDER BY a.createdAt DESC
    `);

    res.json(applications);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Failed to fetch applications", error: err.message });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'reviewed', 'accepted', 'rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const [result] = await db.query(
      "UPDATE applications SET status = ? WHERE id = ?",
      [status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application status updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};