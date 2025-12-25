import transporter from "../config/mail.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const JOBS_FILE = path.join(__dirname, "../../data/jobs.json");

export const applyJob = async (req, res) => {
  const { name, email, message, jobId } = req.body;

  if (!name || !email || !jobId) {
    return res.status(400).json({ message: "Name, email, and jobId are required" });
  }

  try {
    console.log("Reading jobs file from:", JOBS_FILE);
    const jobsData = await fs.readFile(JOBS_FILE, "utf8");
    const jobs = JSON.parse(jobsData);

    const job = jobs.find(j => j.id === jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    console.log("Preparing to send email for job:", job.title);
    console.log("Sending from:", process.env.EMAIL_USER);
    console.log("Sending to:", process.env.EMAIL_TO);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New application for ${job.title}`,
      text: `Name: ${name}\nEmail: ${email}\nJob: ${job.title}\nMessage: ${message || "No message"}`,
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